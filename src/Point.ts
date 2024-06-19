export class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  static from([x, y]: [number, number]): Point {
    return new Point(x, y)
  }

  public insideBox(dim: Point): boolean {
    return this.x >= 0 && this.x < dim.x && this.y >= 0 && this.y < dim.y
  }

  public getAdjacentPoints(): Point[] {
    return [
      Point.from([this.x - 1, this.y]),
      Point.from([this.x + 1, this.y]),
      Point.from([this.x, this.y - 1]),
      Point.from([this.x, this.y + 1]),
    ]
  }
}
