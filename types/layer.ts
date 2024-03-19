export type Colour = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | NoteLayer;

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Colour;
  value?: string;
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Colour;
  value?: string;
};

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Colour;
  points: number[][];
  value?: string;
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Colour;
  value?: string;
};

export type NoteLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Colour;
  value?: string;
};
