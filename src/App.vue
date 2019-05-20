<template>
  <div id="app">
    <Scoreboard />

    <Modal v-if="newGame || gameOver || winner" />

    <Gameboard />

    <Icons/>
  </div>
</template>

<script>
import Icons from '@/components/_global/Icons'
import Gameboard from '@/components/Gameboard'
import Scoreboard from '@/components/Scoreboard'
import Modal from '@/components/Modal'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    Icons,
    Gameboard,
    Scoreboard,
    Modal
  },

  mounted () {
    this.$store.dispatch('RESTART_GAME')
    window.addEventListener('keydown', this.handleKeydown, { once: true })
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown)
  },

  computed: {
    ...mapGetters([
      'winner'
    ]),
    ...mapState([
      'gameOver',
      'newGame'
    ])
  },

  methods: {
    handleKeydown(event) {
      window.addEventListener('keyup', this.handleKeyup, { once: true })
      this.handleKeypress(event, true)
    },
    handleKeyup(event) {
      window.addEventListener('keydown', this.handleKeydown, { once: true })
      this.handleKeypress(event, false)
    },
    handleKeypress(event, bool) {
      if (event.key === ' ' && this.cheat !== bool) this.clickCheat(bool)
    },
    clickCheat (bool) {
      this.$store.dispatch('CHEAT_CLICKED', bool)
    }
  }
}
</script>

<style lang="scss">
:root {
--black: #161616;
--grey:  #A9A9A9;
--ltgrey:#DCDCDC;
--red:   #DC143C;
--white: #FFFAF0;
}

*, *:after, *:before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  align-items: center;
  background-color: var(--white);
  color: var(--black);
  display: flex;
  flex-direction: column;
  font-family: 'IBM Plex Mono', monospace;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 1em;
  width: 100vw;
}

.input-text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  input[type=text] {
    background-color: transparent;
    border: solid 1px var(--black);
    color: inherit;
    font: inherit;
    padding: .25em .5em;
    margin-top: .5em;
  }

  .input-range {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }

  input[type=range] {
    color: inherit;
    font: inherit;
  }

  button {
    align-items: center;
    background-color: var(--black);
    border: none;
    color: var(--white);
    cursor: pointer;
    display: flex;
    font: inherit;
    justify-content: center;
    padding: .5em 1em;
    margin-left: auto;
    margin-right: 0;
    margin-top: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: var(--red);
      color: var(--black);
    }
  }
</style>
