import { Point } from './Point'
import { RandomEngine } from './random'

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
  qid: -1,
})

const inRange = (min: number, max: number) => (n: number) => min <= n && n <= max
const take: <T>(array: T[], index: number) => T = (array, index) => array.splice(index, 1)[0]
const takeRandom =
  (rnd: RandomEngine) =>
  <T>(array: T[]) =>
    take(array, rnd.getRandomInt(array.length - 1))

export class Queens {
  board: Board
  config: Required<Config>

  constructor(config: Config) {
    this.config = {
      seed: config.seed ?? Math.floor((Math.random() * 10) ^ 9),
      dim: config.dim ?? 8,
    }
    this.board = this.initializeBoard()
  }

  private initializeBoard(): Board {
    const d = this.config.dim
    const board: Board = new Array(d)
      .fill(null)
      .map(() => new Array(d).fill(null).map(getDefaultCell))

    const rnd = new RandomEngine(this.config.seed)

    const allocQuenns = ({
      row,
      result,
    }: {
      row: number
      result: number[]
    }): boolean => {
      if (row === d) {
        return true
      }
      const prev = row - 1
      const contraints: number[] = []
      if (prev >= 0) {
        for (const i of [-1, 0, 1]) {
          const n = result[prev] + i
          if (inRange(0, d - 1)(n)) {
            contraints.push(n)
          }
        }
      }

      const available = new Array(d)
        .fill(0)
        .map((_, i) => i)
        .filter((i) => !result.includes(i) && !contraints.includes(i))

      rnd.shuffle(available)

      for (const next of available) {
        result.push(next)
        if (allocQuenns({ row: row + 1, result })) {
          return true
        }
        result.pop()
      }

      return false
    }

    const drawZones = (): void => {
      const box = new Point(d, d)
      const pending: Point[] = []
      for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
          if (!board[i][j].isQueen) continue
          const around = Point.from([i, j])
            .getAdjacentPoints()
            .filter((p) => p.insideBox(box))
          for (const p of around) {
            if (board[p.x][p.y].qid === -1) {
              pending.push(p)
            }
          }
        }
      }

      while (pending.length > 0) {
        const p = takeRandom(rnd)(pending)
        if (board[p.x][p.y].qid !== -1) continue
        const adjacent = p.getAdjacentPoints().filter((q) => q.insideBox(box))
        const possibleZones = adjacent.flatMap((q) => {
          const qid = board[q.x][q.y].qid
          return qid === -1 ? [] : [qid]
        })

        const selectedZone = takeRandom(rnd)(possibleZones)
        board[p.x][p.y].qid = selectedZone

        //open adjacent zones
        adjacent.forEach((q) => {
          if (board[q.x][q.y].qid === -1) {
            pending.push(q)
          }
        })
      }
    }

    const result: number[] = []
    allocQuenns({ row: 0, result })

    for (let i = 0; i < d; i++) {
      const j = result[i]
      board[i][j].isQueen = true
      board[i][j].qid = i
    }

    drawZones()

    return board
  }
}
