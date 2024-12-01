import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import prettier from 'prettier';
import { Component } from '@/components/builder/BuilderContext';

interface ExportOptions {
  format: 'next' | 'react' | 'html';
  includeAnalytics?: boolean;
  minify?: boolean;
  includeDependencies?: boolean;
}

function generateComponentJSX(component: Component, indent = 0): string {
  const indentation = ' '.repeat(indent * 2);
  const props = Object.entries(component.props)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  switch (component.type) {
    case 'container':
      return `${indentation}<Box ${props}>\n${
        component.children
          ?.map((child) => generateComponentJSX(child, indent + 1))
          .join('\n') || ''
      }\n${indentation}</Box>`;

    case 'heading':
      return `${indentation}<Heading ${props}>${
        component.props.content || ''
      }</Heading>`;

    case 'text':
      return `${indentation}<Text ${props}>${component.props.content || ''}</Text>`;

    case 'image':
      return `${indentation}<Image ${props} />`;

    case 'button':
      return `${indentation}<Button ${props}>${
        component.props.content || ''
      }</Button>`;

    default:
      return `${indentation}<div>Unsupported component: ${component.type}</div>`;
  }
}

function generateNextJSProject(components: Component[], options: ExportOptions) {
  const zip = new JSZip();

  // Generate page component
  const pageContent = `
import { Box, Container } from '@chakra-ui/react';
${options.includeAnalytics ? "import { Analytics } from '@vercel/analytics/react';" : ''}

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      ${components.map((component) => generateComponentJSX(component, 3)).join('\n')}
      ${options.includeAnalytics ? '<Analytics />' : ''}
    </Container>
  );
}
  `;

  // Add files to zip
  zip.file('src/app/page.tsx', prettier.format(pageContent, { parser: 'typescript' }));
  zip.file('src/app/layout.tsx', generateLayoutFile(options));
  zip.file('package.json', generatePackageJson(options));
  zip.file('next.config.js', generateNextConfig());
  zip.file('README.md', generateReadme());

  return zip;
}

function generateReactProject(components: Component[], options: ExportOptions) {
  const zip = new JSZip();

  // Generate App component
  const appContent = `
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Container } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        ${components.map((component) => generateComponentJSX(component, 3)).join('\n')}
      </Container>
    </ChakraProvider>
  );
}

export default App;
  `;

  // Add files to zip
  zip.file('src/App.tsx', prettier.format(appContent, { parser: 'typescript' }));
  zip.file('src/index.tsx', generateReactIndex());
  zip.file('package.json', generatePackageJson({ ...options, format: 'react' }));
  zip.file('README.md', generateReadme());

  return zip;
}

function generateStaticHTML(components: Component[], options: ExportOptions) {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@chakra-ui/css@1/dist/chakra.min.css">
    ${options.includeAnalytics ? generateAnalyticsScript() : ''}
</head>
<body>
    <div id="root">
        <div class="container mx-auto py-8">
            ${components.map((component) => generateComponentHTML(component)).join('\n')}
        </div>
    </div>
</body>
</html>
  `;

  return prettier.format(htmlContent, { parser: 'html' });
}

export async function exportProject(
  components: Component[],
  options: ExportOptions
) {
  try {
    let result;

    switch (options.format) {
      case 'next':
        result = await generateNextJSProject(components, options);
        break;
      case 'react':
        result = await generateReactProject(components, options);
        break;
      case 'html':
        const html = generateStaticHTML(components, options);
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        saveAs(blob, 'index.html');
        return;
    }

    if (result) {
      const content = await result.generateAsync({ type: 'blob' });
      saveAs(content, `${options.format}-project.zip`);
    }
  } catch (error) {
    console.error('Error exporting project:', error);
    throw error;
  }
}

// Helper functions for generating various configuration files
function generateLayoutFile(options: ExportOptions): string {
  // Implementation
  return '';
}

function generatePackageJson(options: ExportOptions): string {
  // Implementation
  return '';
}

function generateNextConfig(): string {
  // Implementation
  return '';
}

function generateReadme(): string {
  // Implementation
  return '';
}

function generateReactIndex(): string {
  // Implementation
  return '';
}

function generateAnalyticsScript(): string {
  // Implementation
  return '';
}

function generateComponentHTML(component: Component): string {
  // Implementation
  return '';
}
