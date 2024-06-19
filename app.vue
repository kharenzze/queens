<script setup lang="ts">
import { Queens } from './src/Queens'
import { Colors } from './src/colors'

const q = new Queens({ dim: 8, })

</script>

<template>
  <div class="main-container">
    <div v-for="(row, i) in q.board" :key="i" class="row">
      <div v-for="(cell, j) in row" :key="j" class="cell" :style="{ backgroundColor: Colors[cell.qid].value }">
        <!-- {{ cell.isQueen ? 'Q' : '.' }} -->
        {{ cell.qid }}
      </div>
    </div>
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