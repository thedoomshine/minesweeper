<template>
  <div class="scoreboard">
    <h2 class="player-name">{{ player }}</h2>
    <button class="cheat-button">
      <svg class="icon icon-pirate">
        <use xlink:href="#icon-pirate"></use>
      </svg>
    </button>
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
    & > * {
      min-width: 33%;
    }
  }

  .player-name {
    flex-basis: 1/3;
    flex-grow: 1;
    flex-shrink: 1;
    font-style: italic;
    font-weight: 700;
  }

  .player-score { 
    flex-basis: 1/3;
    flex-grow: 1;
    flex-shrink: 1;
    font-weight: 200;
    text-align: right;
  }

  .cheat-button {
    background-color: transparent;
    color: var(--black);
    flex-basis: 1/3;
    flex-grow: 1;
    flex-shrink: 1;
    font-size: 2rem;
    margin: 0;
    padding: 0;
  }
</style>
