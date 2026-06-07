import type { Preview } from '@storybook/react';
import '../src/styles/theme.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color mode',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'light', icon: 'sun', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
  },
  decorators: [
    (Story, context) => {
      // Same mechanism consumers use: `.light` on the root element.
      document.documentElement.classList.toggle(
        'light',
        context.globals.theme === 'light'
      );
      return Story();
    },
  ],
  parameters: {
    options: {
      storySort: {
        order: ['Introduction', 'Atoms', 'Molecules', 'Organisms'],
      },
    },
    // The themed body gradient (src/styles/theme.css) provides the canvas
    // background for both modes; the backgrounds addon would paint over it.
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
