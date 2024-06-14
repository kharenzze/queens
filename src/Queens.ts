interface Cell {
  isQueen: boolean
  qid: number
}

type Board = Cell[][]

interface Config {
  dim?: number
  seed?: number
}

const getDefaultCell = (): Cell => ({
  isQueen: false,
  qid: 0,
})

export class Queens {
  board: Board
  config: Required<Config>

  constructor(config: Config) {
    this.config = {
      seed: config.seed ?? Math.floor(Math.random() * 1000),
      dim: config.dim ?? 8,
    }
    this.board = this.initializeBoard()
  }

  private initializeBoard(): Board {
    const d = this.config.dim
    const board: Board = new Array(d)
      .fill(null)
      .map(() => new Array(d).fill(null).map(getDefaultCell))

    for (let i = 0; i < d; i++) {
      board[i][i].isQueen = true
    }

    return board
  }

  private compute(): void {
    const d = this.config.dim
  }
}
