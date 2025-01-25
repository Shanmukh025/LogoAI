const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const AIDesignIdea = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: 'Based on Logo of type Vintage Logo Generate a text prompt to create Logo for Logo title/Brand name : Shanmukh with decription: Create a Logo for name Shanmukh and refering to prompt: Design a vintage-themed logo with classic typography and rustic elements, ideal for coffee shops or craft stores. Give me 5 Suggestions of logo ideas (each idea with 4-5 words), Result in JSON format like : { "ideas":["idea1","idea2",]} only.\n\n',
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n{\n"ideas": [\n    "Shanmukh vintage script emblem",\n    "Rustic Shanmukh coffee label",\n    "Classic Shanmukh craft stamp",\n     "Shanmukh old style typography",\n    "Distressed Shanmukh letterpress logo"\n  ]\n}\n```\n',
                },
            ],
        },
    ],
});
export const AILogoPrompt = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Generate a detailed text prompt to create a logo for Logo Title/Brand Name: Shanmukh, Description: S Logo, Color Combination: Ocean Breeze, Idea: Shanmukh sleek S monogram, Design: Luxury Fashion Logos, Referring to Prompt: Design a sophisticated and elegant single logo for a luxury fashion brand, incorporating sleek typography. The final image should only contain one, central logo with high resolution. Return the result in JSON format with only the 'prompt' field.\n",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n{\n  "prompt": "Create a luxurious and sophisticated logo for the brand \\"Shanmukh\\". The design should be a single, stylized \\"S\\" monogram representing the brand name. The overall aesthetic should evoke high-end fashion and exclusivity. The color palette should be an \\"Ocean Breeze\\" combination, suggesting tranquility and sophistication – consider shades of cool blues, teals, and perhaps a subtle hint of silver or light grey for depth. The \\"S\\" monogram itself should be sleek and modern, with clean lines and a fluid, elegant form. The typography should be incorporated in a subtle way, possibly within or near the monogram, and should complement the overall luxurious feel. Focus on high-resolution and sharp details suitable for a premium brand. The logo should aim for simplicity and recognizability, reflecting the style of luxury fashion logos. Emphasize a minimalist approach, using negative space and subtle gradients or effects to enhance the feeling of refinement. The final logo should project an image of timeless elegance and understated sophistication, suitable for a high-end fashion house. No additional elements or graphical symbols should be included, only the stylized \\"S\\" monogram and the subtle typography of the brand name. Ensure the design communicates quality, luxury, and modern style. Avoid overly complex or ornate designs. The focus is on the sleekness and elegance of the S monogram within the specified color palette."\n}\n```\n',
                },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
