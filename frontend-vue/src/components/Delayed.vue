<template>
<header>
    <h1>Försenade Tåg</h1>
</header>
<div>
    <div v-if="delayedTrains">
        <div v-for="trains in delayedTrains">
            <div>{{ trains.AdvertisedTrainIdent }}</div>
            <div>
                <span>{{ trains.LocationSignature }}</span>
                <p v-if="trains.FromLocation && trains.ToLocation">{{ trains.FromLocation[0].LocationName }} -> {{ trains.ToLocation[0].LocationName }}</p>
                <p v-else>No departure location</p>
                <span>{{ trains.delayInMin }} minuter</span>
            </div>
            <div></div>
        </div>
    </div>
    <div v-else>
        Loading...
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            delayedTrains: null,
            delays: null,
        };
    },
    created() {
        fetch('http://localhost:1337/delayed')
        .then(response => response.json())
        .then(data => {
            this.delayedTrains = data.data;
            const numberOfDelays = Object.entries(this.delayedTrains).length;
            for (let i = 0; i < numberOfDelays; i++) {
                const date1 = new Date(this.delayedTrains[i].AdvertisedTimeAtLocation);
                const date2 = new Date(this.delayedTrains[i].EstimatedTimeAtLocation);
                // Calculate delay in minutes
                const differenceInMilliseconds = Math.abs(date1 - date2);
                const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
                // Add delay to object
                this.delayedTrains[i].delayInMin = differenceInMinutes;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    },
};
// TODO display AdvertisedTrainIdent, LocationSignature,
// FromLocation.LocationName, ToLocation.LocationName,
// EstimatedTimeAtLocation - AdvertisedTimeAtLocation
</script>