import { AILogoPrompt } from "@/configs/Aimodel";
import axios from "axios";
import { setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
    const { prompt, email, title, desc, type } = await req.json();
    let base64ImagewithMime = "";
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    try {
        const AIPromptResult = await AILogoPrompt.sendMessage(prompt);
        console.log(JSON.parse(AIPromptResult.response.text()).prompt);
        const AIPrompt = JSON.parse(AIPromptResult.response.text()).prompt;

        if (type == "Basic") {
            const response = await axios.post(
                "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
                AIPrompt,
                {
                    headers: {
                        Authorization:
                            "Bearer " + process.env.HUGGING_FACE_API_KEY,
                        "Content-Type": "application/json",
                    },
                    responseType: "arraybuffer",
                }
            );
            const buffer = Buffer.from(response.data, "binary");
            const base64Image = buffer.toString("base64");
            const base64ImagewithMime = `data:image/png;base64,${base64Image}`;
            console.log(base64ImagewithMime);
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
            console.log(output);
            base64ImagewithMime = await ConvertImageToBase64(output);
        }

        try {
            await setDoc(
                doc(db, "users", email, "logos", Date.now().toString(), {
                    image: base64ImagewithMime,
                    title: title,
                    desc: desc,
                })
            );
        } catch (e) {
            console.log(e);
        }

        return NextResponse.json({ image: base64ImagewithMime });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}

async function ConvertImageToBase64(image) {
    const resp = await axios.get(image, { responseType: "arraybuffer" });
    const base64ImageRaw = Buffer.from(resp.data).toString("base64");
    return `data:image/png;base64,${base64ImageRaw}`;
}
