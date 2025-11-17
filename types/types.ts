export interface IconArray {
  id: number;
  name: string;
  rows: number;
  cols: number;
  remainder: number;
  total: number;
  highlightCount: number;
  highlightPoints: Point[];
  zoom?: boolean;
  version?: number;
}

export interface Point {
  row: number;
  col: number;
}
