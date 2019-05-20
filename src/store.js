import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { flatten, shuffle } from 'lodash'

Vue.use(Vuex)

const getSiblings = (board, cell) => {
  const surrounding = [
    { y: -1, x: -1 }, { y: -1, x: 0 }, { y: -1, x: 1 },
    { y:  0, x: -1 },                  { y:  0, x: 1 },
    { y:  1, x: -1 }, { y:  1, x: 0 }, { y:  1, x: 1 },
  ]

  const siblings = []

  for (let sibling of surrounding) {
    const diff = {
      x: cell.x + sibling.x,
      y: cell.y + sibling.y,
    }
    if (
      board[diff.y] &&
      board[diff.y][diff.x]
    ) {
      siblings.push(board[diff.y][diff.x])
    }
  }

  return siblings
}

const checkSiblings = (board, cellCoords) => {
  const cell = board[cellCoords.y][cellCoords.x]
  const siblings = getSiblings(board, cell)
  const surroundingBombs = []

  for (let sibling of siblings) {
    const siblingCell = board[sibling.y][sibling.x]
    if (siblingCell.bomb) surroundingBombs.push(siblingCell)
  }
  cell.count = surroundingBombs.length

  if (!cell.bomb) {
    cell.checked = true
    if (cell.count === 0) siblings.map(sibling => !sibling.bomb && !sibling.checked ? checkSiblings(board, sibling) : null)
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: persistedState => {
      const state = {...persistedState}
      const blacklist = [
        'board',
        'cheat',
        'gameover',
        'newGame'
      ]
      for (let item of blacklist) {
        delete state[item]
      }
      return state
    }
  })],
  state: {
    board: null,
    cheat: false,
    difficulty: 0,
    gameOver: false,
    newGame: true,
    player: 'Player',
  },

  getters: {
    score: state => flatten(JSON.parse(
      JSON.stringify(state.board)
    )).filter(cell => cell.checked).length,
    size: state => {
      const rows = 8 + (state.difficulty * 8)
      const cells = rows * rows
      const bombs = cells / 4

      return { bombs, cells, rows }
    },
    winner: (_, getters) => getters.score === getters.size.cells - getters.size.bombs
  },

  mutations: {
    CHECK_CELL(state, cell) {
      const board = state.board
      if (state.newGame) state.newGame = false
      if (cell.checked || cell.flag || state.gameOver) return
      if (cell.bomb) state.gameOver = true

      cell.checked = true

      checkSiblings(board, cell)
    },
    SET_DIFFICULTY(state, difficulty) {
      state.difficulty = difficulty
    },
    SET_PLAYER(state, player) {
      state.player = player
    },
    SET_CHEAT(state, bool) {
      state.cheat = bool
    },
    SET_FLAG(state, cell) {
      if (cell.checked || state.gameOver) return
      if (state.newGame) state.newGame = false

      cell.flag = !cell.flag
    },
    SET_GAME_STATE(state, gameType) {
      if (gameType === 'start') {
        return state.newGame = false
      }
      if (gameType === 'end') {
        state.gameOver = false
        state.newGame = true
      }
    },
    GENERATE_GAME_BOARD(state, getters) {
      const numberOfBombs = getters.size.bombs
      const numberOfCells = getters.size.cells
      const numberOfRows = getters.size.rows

      const emptyCell = {
        bomb: false,
        checked: false,
        count: 0,
        flag: false,
        x: null,
        y: null
      }

      const emptyCells = new Array(numberOfCells - numberOfBombs).fill({
        ...emptyCell
      })
      const bombs = new Array(numberOfBombs).fill({
        ...emptyCell,
        bomb: true,
      })
      const cells = shuffle(emptyCells.concat(bombs))

      state.board = cells.reduce((rows, cell, index) => (
        index % numberOfRows === 0 ?
          rows.push([{...cell, x: 0, y: Math.floor(index / numberOfRows) }]) :
          rows[rows.length - 1].push({...cell, x: Math.floor(index % numberOfRows), y: Math.floor(index / numberOfRows) })
      ) && rows, [])
  },
},
  actions: {
    START_GAME({
      commit
    }) {
      commit('SET_GAME_STATE', 'start')
    },
    RESTART_GAME({
      commit,
      getters
    }) {
      commit('SET_GAME_STATE', 'end')
      commit('GENERATE_GAME_BOARD', getters)
    },
    CHANGE_DIFFICULTY({
      commit,
      getters,
      state
    }) {
      commit('SET_DIFFICULTY', state.difficulty)
      commit('GENERATE_GAME_BOARD', getters)
    },
    CHANGE_PLAYER({
      commit
    }, player) {
      commit('SET_PLAYER', player)
    },
    CHEAT_CLICKED({
      commit
    }, bool) {
      commit('SET_CHEAT', bool)
    },
    CELL_CLICKED({
      commit
    }, cell) {
      commit('CHECK_CELL', cell)
    },
    CELL_FLAGGED({
      commit
    }, cell) {
      commit('SET_FLAG', cell)
    }
  }
})