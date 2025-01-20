export default {
    DESIGN_IDEA_PROMPT:
        "Generate a detailed text prompt to create a logo based on the following details: 1. Logo Type: {logoType}, 2. Logo Title/Brand Name: {logoTitle}, 3. Logo Description: {logoDesc}, 4. Reference Prompt: {logoPrompt}. Provide 5 creative and unique logo ideas tailored to the given details. Each idea should be concise (4-5 words) and aligned with the specified logo type and description. Return the results in a JSON format.",
    LOGO_PROMPT:
        "Generate a detailed text prompt to create a logo for Logo Title/Brand Name: {logoTitle}, Description: {logoDesc}, Color Combination: {logoColor}, Idea: {logoIdea}, Design: {logoDesign}, Referring to Prompt: {logoPrompt}. Return the result in JSON format with only the 'prompt' field.",
};
