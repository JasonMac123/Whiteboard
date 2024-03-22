import { LayerType } from "./layer";

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type WhiteBoardState =
  | {
      mode: WhiteBoardMode.None;
    }
  | {
      mode: WhiteBoardMode.Pressing;
      origin: Point;
    }
  | {
      mode: WhiteBoardMode.SelectionNet;
      origin: Point;
      current?: Point;
    }
  | {
      mode: WhiteBoardMode.Translating;
      current: Point;
    }
  | {
      mode: WhiteBoardMode.Inserting;
      layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note;
    }
  | {
      mode: WhiteBoardMode.Resizing;
      initialBounds: XYWH;
      corner: Side;
    }
  | {
      mode: WhiteBoardMode.Pencil;
    };

export enum WhiteBoardMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}
