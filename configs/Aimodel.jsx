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

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
