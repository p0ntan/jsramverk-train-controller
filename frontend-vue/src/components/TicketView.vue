<template>
    <div class="ticket-container">
        <div class="ticket">
            <a href="" id="back">&#8592; Tillbaka</a>
            <h1>Nytt ärende #<span id="new-ticket-id"></span></h1>
            <p><strong>Försenad:</strong></p>
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
</script>