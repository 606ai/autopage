import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface LayoutSuggestion {
  layout: string;
  components: string[];
  colorScheme: {
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
}

export async function generateLayoutSuggestion(
  businessType: string,
  preferences: {
    style?: string;
    colorPreference?: string;
    features?: string[];
  }
): Promise<LayoutSuggestion | null> {
  const prompt = `
    Generate a website layout suggestion for a ${businessType} website.
    Style preference: ${preferences.style || 'modern and professional'}
    Color preference: ${preferences.colorPreference || 'neutral and professional'}
    Required features: ${preferences.features?.join(', ') || 'standard business features'}
    
    Provide a JSON response with:
    1. Recommended layout structure
    2. List of necessary components
    3. Color scheme (with hex codes)
    4. Typography recommendations
    
    Make it modern, accessible, and optimized for conversion.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestion = JSON.parse(response.text());
    return suggestion as LayoutSuggestion;
  } catch (error) {
    console.error('Error generating layout suggestion:', error);
    return null;
  }
}

export async function generateAccessibilityTips(layout: LayoutSuggestion) {
  const prompt = `
    Analyze this website layout and provide accessibility recommendations:
    ${JSON.stringify(layout, null, 2)}
    
    Consider:
    1. Color contrast
    2. Typography readability
    3. Navigation structure
    4. Screen reader compatibility
    5. Keyboard navigation
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating accessibility tips:', error);
    return null;
  }
}
