import { Component } from '@/components/builder/BuilderContext';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  components: Component[];
}

export const templates: Template[] = [
  {
    id: 'startup-landing',
    name: 'Startup Landing',
    description: 'Modern landing page for tech startups',
    category: 'Business',
    preview: '/templates/startup-landing.png',
    components: [
      {
        id: 'hero',
        type: 'section',
        props: {
          py: '20',
          bg: 'blue.50',
        },
        children: [
          {
            id: 'hero-content',
            type: 'container',
            props: {
              maxW: 'container.xl',
              textAlign: 'center',
            },
            children: [
              {
                id: 'hero-heading',
                type: 'heading',
                props: {
                  size: '2xl',
                  mb: '4',
                  content: 'Transform Your Ideas into Reality',
                },
              },
              // Add more hero section components
            ],
          },
        ],
      },
      // Add more sections
    ],
  },
  {
    id: 'portfolio',
    name: 'Creative Portfolio',
    description: 'Showcase your work with style',
    category: 'Portfolio',
    preview: '/templates/portfolio.png',
    components: [
      // Portfolio template components
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Full-featured online store template',
    category: 'E-commerce',
    preview: '/templates/ecommerce.png',
    components: [
      // E-commerce template components
    ],
  },
  // Add more templates
];

export const sections: Template[] = [
  {
    id: 'hero-sections',
    name: 'Hero Sections',
    description: 'Impactful hero sections for any website',
    category: 'Sections',
    preview: '/sections/hero.png',
    components: [
      // Hero section variations
    ],
  },
  {
    id: 'feature-sections',
    name: 'Feature Sections',
    description: 'Showcase your features effectively',
    category: 'Sections',
    preview: '/sections/features.png',
    components: [
      // Feature section variations
    ],
  },
  // Add more sections
];

export const components: Template[] = [
  {
    id: 'cards',
    name: 'Cards',
    description: 'Various card designs for content display',
    category: 'Components',
    preview: '/components/cards.png',
    components: [
      // Card component variations
    ],
  },
  {
    id: 'forms',
    name: 'Forms',
    description: 'Pre-designed form layouts',
    category: 'Components',
    preview: '/components/forms.png',
    components: [
      // Form component variations
    ],
  },
  // Add more component collections
];

export function getTemplateById(id: string): Template | undefined {
  return [...templates, ...sections, ...components].find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  return [...templates, ...sections, ...components].filter(
    (t) => t.category === category
  );
}

export function searchTemplates(query: string): Template[] {
  const searchTerm = query.toLowerCase();
  return [...templates, ...sections, ...components].filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm) ||
      t.category.toLowerCase().includes(searchTerm)
  );
}
