export type Colour = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer;

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
  rotation?: number;
  fill?: Colour;
  textFill?: Colour;
  value?: string;
  fontSize?: number;
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  rotation?: number;
  fill?: Colour;
  textFill?: Colour;
  value?: string;
  fontSize?: number;
};

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  rotation?: number;
  fill?: Colour;
  textFill?: Colour;
  points: number[][];
  value?: string;
  fontSize?: number;
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  rotation?: number;
  fill?: Colour;
  textFill?: Colour;
  value?: string;
  fontSize?: number;
};

export type NoteLayer = {
  type: LayerType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  rotation?: number;
  fill?: Colour;
  textFill?: Colour;
  value?: string;
  fontSize?: number;
};
