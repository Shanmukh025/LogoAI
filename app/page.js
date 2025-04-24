import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hero from "./_components/Hero";

export default function Home() {
    return (
        <div>
            <Hero />
            <div className="py-16 px-8 md:px-16 lg:px-32"></div>
            {/* Features */}
            <div className="py-16 px-8 md:px-16 lg:px-32 bg-gray-100">
                <h2 className="text-primary text-4xl font-bold text-center mb-12">
                    Why Choose LogoAI?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-4">
                            Instant Results
                        </h3>
                        <p>
                            Create a professional logo in seconds with our AI
                            tools.
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-4">
                            Endless Creativity
                        </h3>
                        <p>
                            Explore limitless design possibilities for your
                            brand.
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-4">
                            Professional Quality
                        </h3>
                        <p>
                            Generate logos that look like they were crafted by
                            experts.
                        </p>
                    </div>
                </div>
            </div>

            {/* Logo Gallery */}
            <div className="py-16 px-8 md:px-16 lg:px-32">
                <h2 className="text-primary text-4xl font-bold text-center mb-12">
                    Logo Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1">
                    <div className="rounded-lg shadow-md bg-white p-4">
                        <img
                            src="https://content-management-files.canva.com/cdn-cgi/image/f=auto,q=70/fd5fe9e4-bd76-402e-ab2c-05021fe65a5e/ai-logo-generator_hero2x.png"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 px-8 md:px-16 lg:px-32 bg-gray-100">
                <h2 className="text-primary text-4xl font-bold text-center mb-12">
                    Choose A.I Model
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 border rounded-lg shadow-md text-center bg-white">
                        <h3 className="text-2xl font-bold">Free</h3>
                        <p className="text-gray-500 mt-4">Unlimited</p>
                        <p className="mt-4">Basic Logo Designs</p>
                        <p className="mt-4">Limited Options and Quality</p>
                        <p className="mt-4">Longer wait times</p>
                        {/* <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">
                            Select
                        </button> */}
                    </div>
                    <div className="p-6 border rounded-lg shadow-md text-center bg-white">
                        <h3 className="text-2xl font-bold">Premium</h3>
                        <p className="text-gray-500 mt-4">5 Credits</p>
                        <p className="mt-4">Premium Logo Designs</p>
                        <p className="mt-4">Shorter wait times</p>
                        <p className="mt-4">Generates below 10 secs</p>
                        {/* <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">
                            Select
                        </button> */}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-16 text-center text-white">
                <h2 className="text-primary text-4xl font-bold">
                    Ready to Design Your Logo?
                </h2>
                <br />
                <Button
                    variant="outline"
                    className="text-black px-5 py-6 text-xl border-2 border-grey-500"
                >
                    <Link href="/create?logo">Get Started</Link>
                </Button>
            </div>
            <div className="text-center">
                <Button className="text-primary text-xl" variant="link">
                    <Link href="https://shanmukh25.vercel.app/" target="_blank">
                        Developed by Shanmukh.
                    </Link>
                </Button>
            </div>
        </div>
    );
}
