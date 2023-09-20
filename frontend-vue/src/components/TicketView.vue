<template>
    <div class="ticket-container">
        <div class="ticket">
            <a href="" @click="renderTrainsView">&#8592; Tillbaka</a>
            <h1>Nytt ärende #<span id="new-ticket-id"></span></h1>
            <h3 v-if="trainObject.FromLocation && trainObject.ToLocation">
                Tåg från {{ trainObject.FromLocation[0].LocationName }} till {{ trainObject.ToLocation[0].LocationName }}.
                Just nu i {{ trainObject.LocationSignature }}.
            </h3>
            <p><strong>Försenad:</strong> {{ trainObject.delayInMin }} minuter</p>
            <form id="new-ticket-form">
                <label>Orsakskod</label><br>
                <select id="reason-code"></select><br><br>
                <input type="submit" value="Skapa nytt ärende" />
            </form>
        </div>
        <br>
        <div class="old-tickets" id="old-tickets">
            <h2>Befintliga ärenden</h2>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            trainObject: null,
        };
    },
    created() {
        const train = sessionStorage.getItem("train");
        console.log(JSON.parse(train));
        this.trainObject = JSON.parse(train);
    },
    methods: {
        renderTrainsView() {
            this.$router.push('/');
        }
    }
}
</script>