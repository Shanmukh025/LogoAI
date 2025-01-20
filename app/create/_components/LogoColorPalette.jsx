import Lookup from "@/app/_data/Lookup";
import { useState } from "react";
import Colors from "./Colors";
import HeadingDescription from "./HeadingDescription";

function LogoColorPalette({ onHandleChange, formData }) {
    const [selectedOption, setSelectedOption] = useState(formData?.palette);

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
                        className={`flex flex-col p-2 ${
                            selectedOption === palette.name &&
                            "border-2 cursor-pointer rounded-md border-primary"
                        }`}
                    >
                        {/* Palette Name */}
                        <div className="text-center font-bold mb-2">
                            {palette.name}
                        </div>

                        {/* Color Swatches */}
                        <div className="flex">
                            {palette?.colors.map((color, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSelectedOption(palette.name);
                                        onHandleChange(palette.name);
                                    }}
                                    className="h-24 w-full"
                                    style={{ backgroundColor: color }}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LogoColorPalette;
