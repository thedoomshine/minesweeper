<template>
  <div class="modal">
    <NameGame v-if="newGame"/>
    <Winner v-else-if="winner" />
    <GameOver v-else-if="gameOver" />
  </div>
</template>

<script>
import GameOver from './GameOver'
import NameGame from './NewGame'
import Winner from './Winner'

import { mapGetters, mapState } from 'vuex';
export default {
  name: 'Modal',
  components: {
    GameOver,
    NameGame,
    Winner
  },
  computed: {
    ...mapGetters([
      'winner'
    ]),
    ...mapState([
      'gameOver',
      'newGame'
    ])
  }
}
</script>

<style lang="scss" scoped>
.modal {
  background-color: var(--white);
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  max-width: 32rem;
  padding: 1em 2em;
  position: fixed;
  bottom: 4rem;
  width: 100%;
}
</style>

