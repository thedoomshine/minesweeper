<template>
  <div class="gameboard">
    <div
      class="row"
      v-for="(row, y) in board"
      :key="`row-${y}`"
    >
      <div
        class="cell"
        v-for="(cell, x) in row"
        :class="{ 'checked': cell.checked, 'exploded': cell.checked && cell.bomb }"
        :key="`Cell-${y},${x}`"
        @click="cellClick({ y, x })"
      >
        <svg v-if="cell.checked && cell.bomb" class="icon icon-bomb"><use xlink:href="#icon-bomb"></use></svg>
        <template v-if="cell.checked && !cell.bomb">
          {{ cell.count }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gameboard',

  computed: {
    board () { return this.$store.state.board },
    newGame () { return this.$store.state.newGame },
    gameOver() { return this.$store.state.gameOver },
  },

  methods: {
    cellClick (cell) {
      this.$store.dispatch('CELL_CLICKED', cell)
    }
  }
}
</script>

<style lang="scss" scoped>
  .gameboard {
    border: solid .5px var(--black);
    display: flex;
    flex-direction: column;
    margin: auto;
  }

  .row {
    display: flex;
  }

  .cell {
    align-items: center;
    background-color: var(--grey);
    border: solid .5px var(--black);
    cursor: pointer;
    display: flex;
    height: 2em;
    justify-content: center;
    width: 2em;
    &:hover {
      background-color: var(--ltgrey);
    }

    &.checked {
      background-color: transparent;
    }

    &.exploded {
      background-color: var(--red);
    }
  }
</style>
