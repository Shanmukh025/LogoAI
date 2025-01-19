import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Colors from "./Colors";

function LogoColorPalette({onHandleChange}) {
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoColorPaletteTitle}
        description={Lookup.LogoColorPaletteDesc}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {Colors.map((palette, index) => (
          <div
            key={index}
            className={`flex p-1 ${
              selectedOption == palette.name &&
              "border-2 cursor-pointer	rounded-md border-primary"
            }`}
          >
            {palette?.colors.map((color, index) => (
              <div
                index={index}
                onClick={() => {
                  setSelectedOption(palette.name);
                  onHandleChange(palette.name);
                }}
                className="h-24 w-full"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoColorPalette;
