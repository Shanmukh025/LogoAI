import { AILogoPrompt } from "@/configs/Aimodel";
import { db } from "@/configs/firebase";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
    const { prompt, email, title, desc, type, userCredits } = await req.json();
    let base64ImagewithMime = ""; // Correctly declare the variable here
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    try {
        const AIPromptResult = await AILogoPrompt.sendMessage(prompt);
        const AIPrompt = JSON.parse(AIPromptResult.response.text()).prompt;

        if (type === "Basic") {
            const response = await axios.post(
                "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
                AIPrompt,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    responseType: "arraybuffer",
                }
            );
            const buffer = Buffer.from(response.data, "binary");
            const base64Image = buffer.toString("base64");
            base64ImagewithMime = `data:image/png;base64,${base64Image}`; // Assign correctly
        } else {
            const output = await replicate.run(
                "bytedance/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad",
                {
                    input: {
                        prompt: AIPrompt,
                        num_outputs: 1,
                        aspect_ratio: "1:1",
                        output_format: "png",
                        guidance_scale: 3.5,
                        output_quality: 80,
                        num_inference_steps: 8,
                    },
                }
            );
            base64ImagewithMime = await ConvertImageToBase64(output);

            // Update the user's credits
            const docRef = doc(db, "users", email);
            await updateDoc(docRef, {
                credits: Number(userCredits) - 1,
            });
        }

        // Store image details in Firestore
        const logoDocRef = doc(
            db,
            "users",
            email,
            "logos",
            Date.now().toString()
        );
        await setDoc(logoDocRef, {
            image: base64ImagewithMime,
            title: title,
            desc: desc,
            type: type,
        });

        return NextResponse.json({ image: base64ImagewithMime });
    } catch (e) {
        console.error("Error:", e);
        return NextResponse.json(
            { error: e.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

async function ConvertImageToBase64(image) {
    const resp = await axios.get(image, { responseType: "arraybuffer" });
    const base64ImageRaw = Buffer.from(resp.data).toString("base64");
    return `data:image/png;base64,${base64ImageRaw}`;
}
