import Lookup from "@/app/_data/Lookup";
import HeadingDescription from "./HeadingDescription";

function LogoDescription({ onHandleChange, formData }) {
    return (
        <div className="my-10">
            <HeadingDescription
                title={Lookup.LogoDescTitle}
                description={Lookup.LogoDescDesc}
            />
            <input
                type="text"
                // placeholder={Lookup.InputTitlePlaceHolder}
                className="p-4 border rounded-lg mt-2 w-[100%]"
                value={formData?.desc || ""}
                onChange={(e) => onHandleChange(e.target.value)}
            />
        </div>
    );
}

export default LogoDescription;
