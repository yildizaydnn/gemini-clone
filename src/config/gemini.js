import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

async function runChat(prompt) {
  const modelName = "gemini-2.5-flash";

  const generationConfig = {
    temperature: 0.2,
    topK: 1,
    topP: 0.8,
    maxOutputTokens: 1024,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = ai.chats.create({
    model: modelName,
    config: {
      generationConfig: generationConfig,
      safetySettings: safetySettings,
    },
    history: [],
  });

  try {
    const response = await chat.sendMessage({ message: prompt });
    if (!response) {
      console.error("No response text received from Gemini API.");
      return "Üzgünüm, bu isteğiniz güvenlik filtreleri nedeniyle yanıtlanamadı.";
    }

    console.log(response);
    return response.text;
  } catch (error) {
    console.error("Error during Gemini API call:", error);

    if (error.message && error.message.includes("429")) {
      return "Çok hızlı gidiyorsun! Lütfen **bir dakika kadar bekle** ve tekrar dene. Ücretsiz kullanım limitine ulaştın. ⏳";
    }

    return "Üzgünüm, şu anda bir yanıt oluşturamıyorum.";
  }
}

export default runChat;
