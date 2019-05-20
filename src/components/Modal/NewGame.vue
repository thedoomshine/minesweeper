<template>
  <form v-on:submit.prevent="startGame">
    <div class="input input-text">
      <label>Your Name</label>
      <input
        type="text"
        placeholder="Player"
        v-model="player"
      />
    </div>

    <div class="input input-range">
      <label>Difficulty: {{ difficultyText }}</label>
      <input
        type="range"
        min="0"
        max="2"
        v-model="difficulty"
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

  computed: {
    difficulty: {
      get () {
        return this.$store.state.difficulty
      },
      set (value) {
        this.setDifficulty(value)
      }
    },
    difficultyText () {
      const difficulty = this.difficulty
      const choices = ['Beginner (8x8)', 'Intermediate (16x16)', 'Expert (24x24)']
      return choices[difficulty]
    },
    player: {
      get () {
        return this.$store.state.player
      },
      set (value) {
        this.setPlayer(value)
      }
    },
  },

  methods: {
    setDifficulty(value) {
      this.$store.commit('SET_DIFFICULTY', value)
      this.$store.commit('GENERATE_GAME_BOARD', this.$store.getters)
    },
    setPlayer(value) {
      this.$store.commit('SET_PLAYER', value)
    },
    startGame () {
      this.$store.dispatch('START_GAME')
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

