function mulberry32(seed_init: number) {
  let seed = seed_init
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export class RandomEngine {
  private rng: ReturnType<typeof mulberry32>

  constructor(seed: number) {
    this.rng = mulberry32(seed)
  }

  next() {
    return this.rng()
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(this.rng() * (max - min + 1)) + min
  }

  shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
}
