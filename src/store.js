import Vue from 'vue'
import Vuex from 'vuex'
import { shuffle } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: [],
    difficulty: 0,
    gameOver: false,
    newGame: true,
    player: 'Player',
    score: 0
  },
  mutations: {
    CHECK_CELL(state, coords) {
      const board = state.board
      const cell = board[coords.y][coords.x]
      cell.checked = true

      if (cell.bomb) state.gameOver = true
      if (!cell.bomb) state.score += 1
      const siblings = [
        { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
        { x: 0,  y: -1 },                  { x: 0,  y: 1 },
        { x: 1,  y: -1 }, { x: 1,  y: 0 }, { x: 1,  y: 1 }
      ]

      for (let sibling of siblings) {
        const xDiff = coords.x + sibling.x
        const yDiff = coords.y + sibling.y
        if (
          xDiff > -1 &&
          xDiff < board[0].length &&
          yDiff > -1 &&
          yDiff < board[1].length 
        ) {
          const siblingCell = board[yDiff][xDiff]
          if (!siblingCell.bomb) cell.count += 1
        }
      }
    },
    SET_GAME_STATE(state, {
      player,
      difficulty
    }) {
      state.newGame = false
      state.player = player
      state.difficulty = difficulty
    },
    RESET_GAME_STATE(state) {
      state.newGame = true
      state.gameOver = false
      state.score = 0
    },
    GENERATE_BOARD(state) {
      const numberOfRows = 8 + (state.difficulty * 8)
      const numberOfCells = numberOfRows * numberOfRows
      const numberOfBombs = 8 + (numberOfRows * .5)
      const emptyCells = new Array(numberOfCells - numberOfBombs).fill({
        bomb: false,
        checked: false,
        count: 0,
      })
      const bombs = new Array(numberOfBombs).fill({
        bomb: true,
        checked: false,
        count: 0,
      })
      const cells = shuffle(emptyCells.concat(bombs))

      state.board = cells.reduce((rows, key, index) => (
        index % numberOfRows == 0 ?
          rows.push([Object.assign({}, key, { x: index, y: 0})]) :
          rows[rows.length - 1].push(Object.assign({}, key, { x: index, y: rows.length - 1 }))
      ) && rows, [])
    }
  },
  actions: {
    START_GAME({
      commit
    }, {
      player,
      difficulty
    }) {
      commit('SET_GAME_STATE', {
        player,
        difficulty
      })
      commit('GENERATE_BOARD', difficulty)
    },
    RESTART_GAME({
      commit
    }) {
      commit('RESET_GAME_STATE')
    },
    CELL_CLICKED({
      commit
    }, cell) {
      commit('CHECK_CELL', cell)
    }
  }
})