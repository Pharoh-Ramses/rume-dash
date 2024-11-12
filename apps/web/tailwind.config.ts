import type { Config } from 'tailwindcss';

import baseConfig from '@kit/tailwind-config';

export default {
  content: [...baseConfig.content, './components/**/*.tsx', './app/**/*.tsx'],
  presets: [baseConfig],
  theme: {
    extend: {
      colors: {
        'custom-bright-coral': 'hsl(var(--custom-bright-coral) / <alpha-value>)',
        'custom-electric-blue': 'hsl(var(--custom-electric-blue) / <alpha-value>)'
      }
    }
  }
} satisfies Config;