import React from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";

function LogoDescription({ onHandleChange }) {
  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoDescTitle}
        description={Lookup.LogoDescDesc}
      />
      <input
        type="text"
        // placeholder={Lookup.InputTitlePlaceHolder}
        className="p-4 border rounded-lg mt-2 w-full"
        onChange={(e) => onHandleChange(e.target.value)}
      />
    </div>
  );
}

export default LogoDescription;
