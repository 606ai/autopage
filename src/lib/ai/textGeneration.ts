import { HfInference } from '@huggingface/inference';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Configuration, OpenAIApi } from 'openai';

// Initialize AI services
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export async function generateWebsiteContent(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    // Fallback to Hugging Face
    try {
      const response = await hf.textGeneration({
        model: 'gpt2',
        inputs: prompt,
        parameters: {
          max_length: 100,
          temperature: 0.7,
        },
      });
      return response.generated_text;
    } catch (hfError) {
      console.error('Error generating content with Hugging Face:', hfError);
      return 'Error generating content. Please try again.';
    }
  }
}

export async function generateSEODescription(content: string) {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate an SEO-friendly meta description for the following content:\n${content}\nMake it compelling and under 160 characters.`,
      max_tokens: 100,
      temperature: 0.7,
    });
    return completion.data.choices[0]?.text || '';
  } catch (error) {
    console.error('Error generating SEO description:', error);
    return '';
  }
}

export async function improveContent(content: string) {
  try {
    const result = await model.generateContent(`
      Improve the following content to make it more engaging and professional:
      ${content}
      
      Make sure to:
      1. Use active voice
      2. Make it concise
      3. Add compelling calls-to-action
      4. Maintain professional tone
    `);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error improving content:', error);
    return content;
  }
}
