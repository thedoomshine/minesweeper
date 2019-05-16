<template>
  <form v-on:submit.prevent="startGame">
    <div class="input input-text">
      <label>Your Name</label>
      <input
        type="text"
        placeholder="Player"
        v-model="newPlayer"
      />
    </div>

    <div class="input input-range">
      <label>Difficulty: {{ difficultyText }}</label>
      <input
        type="range"
        min="0"
        max="2"
        v-model="newDifficulty"
      />
    </div>

    <button>
      Start Game
    </button>
  </form>
</template>

<script>
export default {
  name: 'NewGame',

  data () {
    return {
      newDifficulty: 0,
      newPlayer: 'Player'
    }
  },

  computed: {
    player () {
      return this.$store.state.player
    },
    difficultyText () {
      const difficulty = this.newDifficulty
      const choices = ['Easy', 'Medium', 'Hard']
      return choices[difficulty]
    },
    newGame () {
      return this.$store.state.newGame
    }
  },

  methods: {
    startGame () {
      this.$store.dispatch('START_GAME', {
        player: this.newPlayer,
        difficulty: this.newDifficulty
      })
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
}

.input-range {
  margin-top: 2rem;
}

button {
  margin-left: auto;
  margin-right: 0;
  margin-top: 2rem;
}
</style>

