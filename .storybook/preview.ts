import type { Preview } from '@storybook/react';
import { allStyles } from '../src/index';

// Inject all component styles into the document
const styleSheet = document.createElement('style');
styleSheet.textContent = allStyles;
document.head.appendChild(styleSheet);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
