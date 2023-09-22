<template>
  <div class="old-tickets" id="old-tickets">
    <h2>Befintliga ärenden</h2>
    <div v-if="this.oldTickets">
      <div v-for="ticket in this.oldTickets" :key="ticket">
        {{ ticket._id }} - {{ ticket.code }} - {{ ticket.trainnumber }} - {{ ticket.traindate }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldTickets: null
    }
  },
  created() {
    fetch(`https://jsramverk-train-poak22-elmo22.azurewebsites.net/tickets`)
      .then((response) => response.json())
      .then((data) => {
        this.oldTickets = data.data
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }
}
</script>
