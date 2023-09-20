<template>
    <div id="map" class="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
    data() {
        return {
            center: [62.173276, 14.942265]
        };
    },
    methods: {
        setupMap: function () {
            this.map = L.map('map').setView(this.center, 5);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom:19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);

            L.marker([51.505, -0.09]).addTo(this.map)
            .bindPopup('A sample marker!');
        },
    },
    mounted() {
        this.setupMap()
    }
}
</script>

<style scoped>
.map {
    height: 100vh;
    width: 60vw;
}
</style>