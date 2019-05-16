<template>
  <div class="scoreboard">
    <h2 class="player-name">{{ player }}</h2>
    <h2 class="player-score">{{ score }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Scoreboard',

  computed: {
    player () {
      return this.$store.state.player
    },
    score () {
      return this.$store.state.score
    }
  }
}
</script>

<style lang="scss" scoped>
  .scoreboard {
    display: flex;
    justify-content: space-between;
    max-width: 24rem;
    width: 100%;
  }

  .player-name {
    font-style: italic;
    font-weight: 700;
  }

  .player-score { 
    font-weight: 200;
  }
</style>
