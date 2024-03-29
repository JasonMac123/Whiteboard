"use client";

import { Colour } from "@/types/layer";
import rgbHex from "rgb-hex";

interface LayerColourPickerProps {
  onChange: (colour: Colour) => void;
}

export const LayerColourPicker = ({ onChange }: LayerColourPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColourButton onClick={onChange} colour={{ r: 243, g: 72, b: 35 }} />
      <ColourButton onClick={onChange} colour={{ r: 255, g: 250, b: 170 }} />
      <ColourButton onClick={onChange} colour={{ r: 70, g: 202, b: 100 }} />
      <ColourButton onClick={onChange} colour={{ r: 41, g: 149, b: 239 }} />
      <ColourButton onClick={onChange} colour={{ r: 162, g: 109, b: 244 }} />
      <ColourButton onClick={onChange} colour={{ r: 250, g: 143, b: 41 }} />
      <ColourButton onClick={onChange} colour={{ r: 0, g: 0, b: 0 }} />
      <ColourButton onClick={onChange} colour={{ r: 255, g: 255, b: 255 }} />
    </div>
  );
};

interface ColourButtonProps {
  onClick: (colour: Colour) => void;
  colour: Colour;
}

const ColourButton = ({ onClick, colour }: ColourButtonProps) => {
  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(colour)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ background: `#${rgbHex(colour.r, colour.g, colour.b)}` }}
      />
    </button>
  );
};
