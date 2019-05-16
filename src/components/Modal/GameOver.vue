<template>
  <form v-on:submit.prevent="restartGame">
    <h1>GAME OVER</h1>
    <p>Your Final Score:</p>
    <h2>{{ score }}</h2>

    <button @click="restartGame">
      Play Again?
    </button>
  </form>
</template>

<script>
export default {
  name: 'GameOver',

  computed: {
    difficulty () {
      return this.$store.state.difficulty
    },
    player () {
      return this.$store.state.player
    },
    score () {
      return this.$store.state.score
    }
  },

  methods: {
    restartGame () {
      this.$store.dispatch('RESTART_GAME')
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: auto;
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

