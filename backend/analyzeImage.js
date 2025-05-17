import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

export async function analyzeImage(imagePath) {
  try {    

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const config = {
      responseMimeType: 'text/plain',
      systemInstruction: [
        {
          text: `Tenha o conhecimento de um especialista em biologia.

Quando eu enviar uma imagem que você não identifique como planta, diga o que é e que não é uma planta

Seja sucinto, primeiramente dando as seguintes informações (caso não encontre as informações, não precisa dessa parte, apenas de uma lista de plantas que você acha que pode ser:

Nome da planta:
Quantidade de regas por dia:
Dicas adicionais:

Caso a planta possua alguma alteração, seja um tipo de doença ou você identifique alguma deficiencia ao analisar a planta, avise o usuário sobre`
        }
      ],
    };

    const model = 'gemini-2.0-flash';
    const imageBuffer = await readFileAsync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = 'image/jpeg';

    const contents = [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Descreva a imagem e identifique a planta, se houver."
          }
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullText = '';
    for await (const chunk of response) {
      fullText += chunk.text;
    }

    return fullText;
  } catch (error) {
    console.error("Erro ao analisar a imagem:", error);
    return "Erro ao analisar a imagem. Verifique o console para mais detalhes.";
  }
}