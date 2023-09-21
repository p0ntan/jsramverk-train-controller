<template>
    <a href="" @click="renderTrainsView">&#8592; Tillbaka</a>
    <h1>Nytt ärende för tåg #<span>{{ trainObject.OperationalTrainNumber }}</span></h1>
    <h3 v-if="trainObject.FromLocation && trainObject.ToLocation">
        Tåg från {{ trainObject.FromLocation[0].LocationName }} till {{ trainObject.ToLocation[0].LocationName }}.
        Just nu i {{ trainObject.LocationSignature }}.
    </h3>
    <p><strong>Försenad:</strong> {{ trainObject.delayInMin }} minuter</p>
    <form @submit.prevent="addNewTicket">
        <label for="codes">Orsakskod</label><br>
        <select v-model="selectedOption" id="codes" v-if="trainObject && codes">
            <option v-for="code in codes" :key="code" :value="code.Code">
                {{ code.Code }} - {{ code.Level3Description }}
            </option>
        </select><br><br>
        <input type="submit" value="Skapa nytt ärende"/>
    </form>
</template>

<script>
// TODO add correct new ticket id (probably need to add 'id' to db or use _id?)
export default {
    data() {
        return {
            trainObject: null,
            codes: null,
            selectedOption: null,
        };
    },
    created() {
        const train = sessionStorage.getItem("train");
        this.trainObject = JSON.parse(train);

        fetch('http://localhost:1337/codes')
        .then(response => response.json())
        .then(data => {
            this.codes = data.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    },
    methods: {
        renderTrainsView() {
            sessionStorage.removeItem("train");
            this.$router.push('/');
        },
        addNewTicket() {
            const newTicket = {
                code: this.selectedOption,
                trainnumber: this.trainObject.OperationalTrainNumber,
                traindate: this.trainObject.EstimatedTimeAtLocation.substring(0, 10)
            }

            // console.log(newTicket);

            fetch("http://localhost:1337/tickets", {
                body: JSON.stringify(newTicket),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            })
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                if (result) {
                    window.location.reload();
                }
            });
        }
    }
}
</script>