import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

const host_grotesk = Host_Grotesk({
    subsets: ["latin"],
});

export const metadata = {
    title: "LogoAI - AI Logo Creator",
    description: "LogoAI - Create Logos for Apps, Websites and Business",
    icons: {
        icon: "/vercel.svg",
    },
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={host_grotesk.className}>
                    <Provider>{children}</Provider>
                </body>
            </html>
        </ClerkProvider>
    );
}
