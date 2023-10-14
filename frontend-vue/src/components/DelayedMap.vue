<template>
  <div id="map" class="map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import io from 'socket.io-client'
const baseURL = import.meta.env.VITE_BASE_URL

export default {
  data() {
    return {
      center: [62.173276, 14.942265],
      delayedMarkers: {},
      // showTrains: this.$store.showOnMap,
      visibleLayer: null,
      hiddenLayer: null
    }
  },
  methods: {
    setupMap: function () {
      const socket = io(`${baseURL}/`)

      this.map = L.map('map').setView(this.center, 5)

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map)

      let trainMarker = L.icon({
            iconUrl: "icons/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
      });

      // Having a layer with visable trains, and storing all markers in this.delayedMarkers.
      // If showOnMap.lenght = 0 show all delayed trains else only the ones in array
      this.visibleLayer = L.layerGroup().addTo(this.map);
      this.hiddenLayer = L.layerGroup();

      socket.on('message', (data) => {
        // First a control that the train is actually delayed, and if add it into this.delayedMarkers
        if (data.trainnumber in this.$store.delayedTrains) {
          if (data.trainnumber in this.delayedMarkers) {
            // If marker already exists, just update the marker location. Even if not shown on map
            const marker = this.delayedMarkers[data.trainnumber]

            marker.setLatLng(data.position)
          } else {
            // Create marker and find if train in showOnMap array
            const marker = L.marker(data.position, {
              icon: trainMarker,
              trainNumber: data.trainnumber // Trainnumber to use for filtering trains
            }).bindPopup(data.trainnumber)
            const inArray = this.$store.showOnMap.includes(data.trainnumber)

            // Add marker to map if array is empty or train is in in array
            if (this.$store.showOnMap.length === 0 || inArray) {
              marker.addTo(this.visibleLayer)
            }

            // Adds or remove train from showOnMap array
            marker.on('click', this.updateShownOnMap)

            // Add marker to object to keep track of position even if not showing on map
            this.delayedMarkers[data.trainnumber] = marker
          }
        }
      })
    },
    updateShownOnMap(e) {
      const trainNumber = e.target.options.trainNumber

      if (this.$store.showOnMap.includes(trainNumber)) {
        // Remove train, this can proably be changed but needed for reactivity
        this.$store.showOnMap = this.$store.showOnMap.filter(train => train !== trainNumber)
      } else {
        // Add marker to array, this way is needed because of reactivity
        this.$store.showOnMap = [...this.$store.showOnMap, trainNumber]
        // Open the marker's popup, for some reason it won't work without a timeout
        setTimeout(function () {
          e.target.openPopup();
        }, 10);      
      }
    }
  },
  mounted() {
    this.setupMap()
  },
  watch: {
    // Watch showOnMap and make changes on map according to what changes
    '$store.showOnMap': {
      handler(newValue, oldValue) {
        // If new length is 0 all trains should show 
        if (newValue.length === 0) {
          // Clear layer and add all markers to visibleLayer
          // Clearing the layer first will stop possibilty for double markers on same train
          this.visibleLayer.clearLayers()
          for (const trainNumber in this.delayedMarkers) {
            const marker = this.delayedMarkers[trainNumber]

            marker.addTo(this.visibleLayer)
          }
        } else if (newValue.length < oldValue.length) {
          // Find the removed trainnumber from oldvalue
          const trainNumber = oldValue.filter(item => !newValue.includes(item))
          
          this.visibleLayer.removeLayer(this.delayedMarkers[trainNumber])

        } else if (newValue.length > oldValue.length) {
          // Get trainnumber from last item in list
          const trainNumber = newValue[newValue.length - 1]

          // If oldValue was 0 remove all trains
          if (oldValue.length === 0) {
            this.visibleLayer.clearLayers();
          }
          
          // If data has been recived from socket, train will be in delayedMarkers and it
          // can be added to map. If not it will be added when data is recived through socket
          if (trainNumber in this.delayedMarkers) {
            this.delayedMarkers[trainNumber].addTo(this.visibleLayer)
          }
        }
      }
    }
  }
}

</script>

<style scoped>
.map {
  height: 100vh;
  width: 60vw;
}
</style>
