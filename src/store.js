import Vue from 'vue'
import Vuex from 'vuex'
import { shuffle } from 'lodash'

Vue.use(Vuex)

const checkSiblings = (board, cell, coords) => {
  const siblings = [
    { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
    { x: 0, y: -1 }, { x: 0, y: 1 },
    { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }
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
      if (siblingCell.bomb) cell.count += 1
    }
  }
  if (cell.count < 1) {
    cell.checked = true
    for (let sibling of siblings) checkSiblings(board, sibling, coords)
  }
  board[coords.y][coords.x] = cell
}

export default new Vuex.Store({
  state: {
    board: new Array(8).fill(new Array(8).fill({})),
    cheat: false,
    difficulty: 0,
    gameOver: false,
    newGame: true,
    player: 'Player',
    score: 0,
  },
  mutations: {
    CHECK_CELL(state, coords) {
      const board = state.board
      const cell = board[coords.y][coords.x]
      if (cell.checked || state.gameOver || state.newGame) return
      cell.checked = true

      if (cell.bomb) state.gameOver = true
      if (!cell.bomb) state.score += 1
      checkSiblings(board, cell, coords)
    },
    SET_DIFFICULTY(state, {
      difficulty
    }) {
      state.difficulty = difficulty
    },
    SET_PLAYER(state, {
      player
    }) {
      state.player = player
    },
    SET_GAME_STATE(state, gameType) {
      if (gameType === 'start') {
        return state.newGame = false
      }
      if (gameType === 'end') {
        state.gameOver = false
        state.newGame = true
        state.score = 0
      }
    },
    RESET_GAME_BOARD(state) {
      const numberOfRows = 8 + (state.difficulty * 8)
      state.board = new Array(numberOfRows).fill(new Array(numberOfRows).fill({}))
    },
    GENERATE_GAME_BOARD(state) {
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
    }) {
      commit('GENERATE_GAME_BOARD')
      commit('SET_GAME_STATE', 'start')
    },
    RESTART_GAME({
      commit
    }) {
      commit('SET_GAME_STATE', 'end')
      commit('RESET_GAME_BOARD')
    },
    CHANGE_DIFFICULTY({
      commit,
      state
    }) {
      commit('SET_DIFFICULTY', state.difficulty)
      commit('RESET_GAME_BOARD')
    },
    CHANGE_PLAYER({
      commit
    }, { player }) {
      commit('SET_PLAYER', player)
    },
    CELL_CLICKED({
      commit
    }, cell) {
      commit('CHECK_CELL', cell)
    }
  }
})