import Lookup from "@/app/_data/Lookup";
import HeadingDescription from "./HeadingDescription";

function PricingModel() {
    return (
        <div className="my-10">
            <HeadingDescription
                title={Lookup.LogoPricingModelTitle}
                description={Lookup.LogoPricingModelDesc}
            />
        </div>
    );
}

export default PricingModel;
