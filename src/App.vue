<template>
  <div id="app">
    <Scoreboard />

    <Modal v-if="newGame || gameOver" />

    <Gameboard />

    <Icons/>
  </div>
</template>

<script>
import Icons from '@/components/_global/Icons'
import Gameboard from '@/components/Gameboard'
import Scoreboard from '@/components/Scoreboard'
import Modal from '@/components/Modal'

export default {
  name: 'app',
  components: {
    Icons,
    Gameboard,
    Scoreboard,
    Modal
  },

  computed: {
    newGame () { return this.$store.state.newGame },
    gameOver() { return this.$store.state.gameOver },
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
    background-color: var(--black);
    color: var(--white);
    cursor: pointer;
    border: none;
    font: inherit;
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
