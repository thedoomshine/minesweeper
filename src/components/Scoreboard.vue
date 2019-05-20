<template>
  <div class="scoreboard">
    <h2 class="player-name">{{ player }}</h2>
    <button
      :class="['cheat-button', cheat ? 'cheat': null]"
      @mousedown="clickCheat(true)"
      @mouseup="clickCheat(false)"
    >
      <svg class="icon icon-pirate">
        <use xlink:href="#icon-pirate"></use>
      </svg>
    </button>
    <h2 class="player-score">{{ score }}</h2>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'Scoreboard',

  computed: {
    ...mapGetters([
      'score',
    ]),
    ...mapState([
      'cheat',
      'player',
    ])
  },

  methods: {
    clickCheat (bool) {
      this.$store.dispatch('CHEAT_CLICKED', bool)
    }
  }
}
</script>

<style lang="scss" scoped>
  .scoreboard {
    align-items: center;
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
    font-size: 3rem;
    margin: 0;
    padding: .25rem;

    &:hover {
      color: var(--grey);
    }

    &.cheat {
      color: var(--red);
    }
  }
</style>
