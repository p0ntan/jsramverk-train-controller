<template>
    <div class="delayed">
        <h1>Försenade Tåg</h1>
        <div class="delayed-trains" v-if="delayedTrains">
            <div v-for="trains in delayedTrains" :key="trains" @click="renderViewTicket(trains)">
                <div class="train-number">
                    {{ trains.OperationalTrainNumber }}
                </div>
                <div class="current-station">
                    <div>{{ trains.LocationSignature }}</div>
                    <div v-if="trains.FromLocation && trains.ToLocation">{{ trains.FromLocation[0].LocationName }} -> {{ trains.ToLocation[0].LocationName }}</div>
                    <div v-else></div>
                </div>
                <div class="delay">
                    {{ trains.delayInMin }} minuter
                </div>
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
                const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
                // Add delay to object
                this.delayedTrains[i].delayInMin = differenceInMinutes;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    },
    methods: {
        renderViewTicket(trainObject) {
            sessionStorage.setItem("train", JSON.stringify(trainObject));
            this.$router.push('/ticket');
        }
    }
};
</script>