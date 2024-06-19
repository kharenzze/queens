<script setup lang="ts">
import { Queens, CellState, type Cell } from './src/Queens'
import { Colors } from './src/colors'

const DIM = 8

const q = new Queens({ dim: DIM, })
const board = reactive(q.board)

const CellToTextMapping: Record<CellState, string> = {
  [CellState.UNKNOWN]: '',
  [CellState.QUEEN]: 'Q',
  [CellState.FREE]: 'x',
}

const getNextState = (state: CellState): CellState => {
  let next = state + 1;
  if (next > 1) {
    next = -1;
  }
  return next
}

const onClick = (cell: Cell) => {
  cell.status = getNextState(cell.status)
}

const success = computed(() => {
  return board.every((row) => row.every((cell) => (cell.isQueen && cell.status === CellState.QUEEN) || (!cell.isQueen && cell.status !== CellState.QUEEN)))
})

const text = computed(() => success.value ? 'Success!' : '')



</script>

<template>
  <div class="main-container">
    <div v-for="(row, i) in board" :key="i" class="row">
      <div v-for="(cell, j) in row" :key="j" class="cell" :style="{ backgroundColor: Colors[cell.qid].value }"
        @click="onClick(cell)">
        {{ CellToTextMapping[cell.status] }}
      </div>
    </div>
    <h2>{{ text }}</h2>
  </div>
</template>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.cell {
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3em;
  height: 3em;
}

.row {
  display: flex;
  flex-direction: row;
}
</style>