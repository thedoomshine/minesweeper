<template>
  <div class="modal">
    <NameGame v-if="newGame"/>
    <GameOver v-else />
  </div>
</template>

<script>
import GameOver from './GameOver'
import NameGame from './NewGame'
export default {
  name: 'Modal',
  components: {
    GameOver,
    NameGame
  },
  computed: {
    newGame () {
      return this.$store.state.newGame
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  background-color: var(--white);
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  max-width: 32rem;
  padding: 2em;
  position: fixed;
  top: 20%;
  width: 100%;
}
</style>

