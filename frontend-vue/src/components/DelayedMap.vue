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
      showTrains: this.$store.showOnMap,
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

      // Having two layers for hidden and shown markers, based on what is located
      // in the store.showOnMap. If showOnMap.lenght = 0 show all delayed trains
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
            // Use hiddenLayer as default
            let layerToUse = this.hiddenLayer
            const index = this.showTrains.indexOf(data.trainnumber)

            // Change layer if array is (no train chosen) or if train is in showTrains
            if (this.showTrains.length === 0 || index !== -1) {
              layerToUse = this.visibleLayer 
            }

            // Create marker and add it to the layer to use
            const marker = L.marker(data.position, {icon: trainMarker})
              .bindPopup(data.trainnumber).addTo(layerToUse)

            this.delayedMarkers[data.trainnumber] = marker
          }
        }
      })
    }
  },
  mounted() {
    this.setupMap()
  },
  watch: {
    showTrains: {
      handler(newValue, oldValue) {
        // If length is 0 all trains should show 
        if (newValue.length === 0) {
          // Iterate over all the markers in the hiddenLayer and move
          // all trains to visible layer
          this.hiddenLayer.eachLayer((marker) => {
            this.hiddenLayer.removeLayer(marker);
            this.visibleLayer.addLayer(marker);
          });
        } else if (newValue.length < oldValue.length) {
          // Find the removed trainnumber from oldvalue
        } else if (newValue.length < oldValue.length) {
          // Last value is the new value, add it to the visible layer
        }
      },
      deep: true
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
