import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  ...nextVitals,
  prettier,
  globalIgnores(['.next/**', 'out/**', 'dist/**', 'node_modules/**']),
  {
    rules: {
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'no-console': 'off',
      'import/prefer-default-export': 'off',
    },
  },
]);
