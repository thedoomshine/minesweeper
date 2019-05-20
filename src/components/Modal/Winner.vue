<template>
  <form v-on:submit.prevent="restartGame">
    <h1>YOU WIN!</h1>
    <p>Your Final Score:</p>
    <h2>{{ score }}</h2>

    <button>
      Play Again?
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NewGame',
  computed: {
    ...mapGetters([
      'score'
    ])
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
}

button {
  margin-left: auto;
  margin-right: 0;
  margin-top: 2rem;
}
</style>

