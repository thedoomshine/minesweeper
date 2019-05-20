<template>
  <div class="gameboard">
    <div
      class="row"
      v-for="(row, index) in board"
      :key="`row-${index}`"
    >
      <div
        class="cell"
        v-for="cell in row"
        :class="{ 'checked': cell.checked, 'exploded': gameOver && cell.bomb }"
        :key="`Cell-${cell.y},${cell.x}`"
        @click.left.prevent="clickCell(cell)"
        @click.right.prevent="flagCell(cell)"
      >
        <svg
          v-if="(cell.checked || gameOver || cheat) && cell.bomb" class="icon icon-bomb"
        >
          <use xlink:href="#icon-bomb"></use>
        </svg>
        <svg
          v-if="cell.flag" class="icon icon-flag"
        >
          <use xlink:href="#icon-flag"></use>
        </svg>
        <template v-if="cell.checked && !cell.bomb && cell.count > 0">
          {{ cell.count }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
    ...mapActions({
      clickCell: 'CELL_CLICKED',
      flagCell: 'CELL_FLAGGED'
    }),
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

    &:nth-child(even) .cell:nth-child(odd):not(.checked):not(.exploded),
    &:nth-child(odd) .cell:nth-child(even):not(.checked):not(.exploded) {
      background-color: var(--black);

      &:hover {
        background-color: var(--ltgrey);
      }
    }
  }

  .cell {
    align-items: center;
    background-color: var(--grey);
    border: solid .5px var(--black);
    color: var(--red);
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
      color: var(--black);
    }

    &.exploded {
      background-color: var(--red);
      color: var(--black);
    }
  }
</style>
