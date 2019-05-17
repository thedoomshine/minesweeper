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
        :class="{ 'checked': cell.checked, 'exploded': (cell.checked || gameOver) && cell.bomb }"
        :key="`Cell-${y},${x}`"
        @click="cellClick({ y, x })"
      >
        <svg v-if="(cell.checked || gameOver || cheat) && cell.bomb" class="icon icon-bomb">
          <use xlink:href="#icon-bomb"></use>
        </svg>
        <template v-if="cell.checked && !cell.bomb && cell.count > 0">
          {{ cell.count }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Gameboard',

  computed: {
    ...mapState([
      'board',
      'cheat',
      'gameOver',
      'newGame'
    ])
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
    margin: 4rem auto auto;
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
