import { GoogleGenerativeAI } from '@google/generative-ai';
import { Configuration, OpenAIApi } from 'openai';
import { HfInference } from '@huggingface/inference';
import { generateImage } from './imageGeneration';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

interface StyleSuggestion {
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    scale: {
      h1: string;
      h2: string;
      h3: string;
      body: string;
    };
  };
  spacing: {
    containerPadding: string;
    elementSpacing: string;
    sectionSpacing: string;
  };
  effects: {
    shadows: string[];
    animations: string[];
    gradients: string[];
  };
}

interface ContentOptimization {
  seoScore: number;
  readabilityScore: number;
  suggestions: string[];
  keywords: string[];
  improvements: {
    category: string;
    suggestions: string[];
  }[];
}

export async function generateStyleSuggestions(
  businessType: string,
  preferences: {
    style?: string;
    mood?: string;
    target?: string;
  }
): Promise<StyleSuggestion> {
  const prompt = `
    Generate a comprehensive style guide for a ${businessType} website.
    Style preference: ${preferences.style || 'modern and professional'}
    Mood: ${preferences.mood || 'welcoming and trustworthy'}
    Target audience: ${preferences.target || 'general professional audience'}
    
    Include:
    1. Color palette (with hex codes)
    2. Typography recommendations
    3. Spacing guidelines
    4. Visual effects (shadows, animations, gradients)
    
    Format as JSON with clear structure and explanations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text()) as StyleSuggestion;
  } catch (error) {
    console.error('Error generating style suggestions:', error);
    throw error;
  }
}

export async function optimizeContent(
  content: string,
  target: 'conversion' | 'engagement' | 'seo' = 'engagement'
): Promise<ContentOptimization> {
  const prompt = `
    Analyze and optimize this content for ${target}:
    ${content}
    
    Provide:
    1. SEO score (0-100)
    2. Readability score (0-100)
    3. Key improvement suggestions
    4. Important keywords
    5. Specific improvements by category
    
    Format as JSON with detailed explanations.
  `;

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return JSON.parse(completion.data.choices[0]?.text || '{}') as ContentOptimization;
  } catch (error) {
    console.error('Error optimizing content:', error);
    throw error;
  }
}

export async function generateAnimations(
  element: string,
  mood: string
): Promise<string[]> {
  const prompt = `
    Generate CSS animations for a ${element} that convey a ${mood} mood.
    Include smooth, performant animations that enhance user experience.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text()) as string[];
  } catch (error) {
    console.error('Error generating animations:', error);
    throw error;
  }
}

export async function generateAccessibilityReport(html: string): Promise<{
  score: number;
  issues: { severity: string; message: string; fix: string }[];
  suggestions: string[];
}> {
  const prompt = `
    Analyze this HTML for accessibility issues:
    ${html}
    
    Provide:
    1. Accessibility score (0-100)
    2. List of issues with severity and fixes
    3. General improvement suggestions
    
    Focus on WCAG 2.1 compliance and best practices.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error generating accessibility report:', error);
    throw error;
  }
}

export async function generateSEOOptimizations(
  url: string,
  content: string
): Promise<{
  title: string;
  description: string;
  keywords: string[];
  suggestions: string[];
  schema: object;
}> {
  const prompt = `
    Generate SEO optimizations for:
    URL: ${url}
    Content: ${content}
    
    Provide:
    1. Optimized title and meta description
    2. Focus keywords
    3. Content improvement suggestions
    4. Schema.org JSON-LD markup
    
    Ensure all recommendations follow latest SEO best practices.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error generating SEO optimizations:', error);
    throw error;
  }
}

export async function generatePerformanceOptimizations(
  code: string
): Promise<{
  score: number;
  issues: { severity: string; message: string; fix: string }[];
  suggestions: string[];
}> {
  const prompt = `
    Analyze this code for performance optimizations:
    ${code}
    
    Provide:
    1. Performance score (0-100)
    2. List of performance issues with severity and fixes
    3. Optimization suggestions
    
    Focus on:
    - Code splitting
    - Bundle size
    - Render performance
    - Resource loading
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error generating performance optimizations:', error);
    throw error;
  }
}
