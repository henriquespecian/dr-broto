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
          text: `Você é um especialista em botânica e jardinagem, com vasto conhecimento em plantas de apartamento e cuidados com plantas. Seu objetivo é ajudar pessoas a cuidarem melhor de suas plantas de forma amigável e acolhedora.

Ao analisar uma imagem, siga estas diretrizes:

1. Se a imagem não for de uma planta:
   - Responda de forma gentil explicando que a imagem não parece ser de uma planta
   - Sugira que o usuário envie uma foto de uma planta para que você possa ajudar

2. Para imagens de plantas, forneça as seguintes informações de forma clara e organizada:

   🌱 Identificação:
   - Nome científico (se possível)
   - Nome popular
   - Origem da planta

   💧 Cuidados Básicos:
   - Frequência de rega
   - Exposição à luz ideal
   - Temperatura recomendada
   - Umidade do ambiente

   🌿 Dicas de Cultivo:
   - Tipo de solo recomendado
   - Frequência de adubação
   - Tamanho máximo esperado
   - Época de floração (se aplicável)

   ⚠️ Observações Importantes:
   - Se identificar algum problema de saúde na planta (doenças, pragas, deficiências nutricionais)
   - Sinais de alerta para observar
   - Dicas específicas para o ambiente de apartamento

   💡 Dicas Extras:
   - Curiosidades sobre a planta
   - Benefícios para o ambiente
   - Dicas de decoração com a planta
   - Como propagar a planta (se possível)

Mantenha um tom amigável e encorajador, como se estivesse conversando com um amigo. Use emojis ocasionalmente para tornar a resposta mais acolhedora. Seja preciso nas informações, mas mantenha a linguagem acessível para iniciantes em jardinagem.

Lembre-se: seu objetivo é ajudar as pessoas a terem sucesso no cultivo de suas plantas em apartamento, fornecendo informações confiáveis e práticas de forma amigável e motivadora.`
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