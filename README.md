# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# React TypeScript Project Structure

## Project Overview
Modern React application built with TypeScript, featuring a scalable and maintainable architecture designed for team collaboration.

## Directory Structure

```
src/
├── assets/           # Static assets (images, styles, fonts)
├── config/           # App configuration files
├── constants/        # Application constants and enums
├── features/         # Feature-based modules
├── layouts/          # Layout components
├── pages/           # Page components
├── services/        # API services and other external services
├── shared/          # Shared utilities
│   ├── components/  # Reusable components
│   ├── hooks/       # Custom React hooks
│   └── utils/       # Utility functions
└── types/           # TypeScript type definitions
```

## Feature Module Structure
Each feature module should follow this structure:
```
feature-name/
├── api/            # API calls related to the feature
├── components/     # Feature-specific components
├── hooks/          # Feature-specific hooks
├── types.ts        # TypeScript types for the feature
├── utils.ts        # Feature-specific utilities
└── index.ts        # Public API of the feature
```

## Coding Standards

### Naming Conventions
- Files:
  - Components: PascalCase (e.g., `Button.tsx`)
  - Utilities: camelCase (e.g., `formatDate.ts`)
  - Types: PascalCase (e.g., `UserTypes.ts`)
- Variables/Functions: camelCase
- Interfaces/Types: PascalCase
- Constants: UPPER_SNAKE_CASE

### Component Structure
```typescript
// Imports
import { useState, useEffect } from 'react';
import type { ComponentProps } from './types';

// Component
export const MyComponent: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### API Calls
- Use the `api` service from `services/api.ts`
- Create feature-specific API functions in the feature's `api` directory
- Handle errors consistently using the error handling utilities

### State Management
- Use React hooks for local state
- Consider using Context API for shared state
- Keep state as close as possible to where it's used

### Type Safety
- Always define proper TypeScript interfaces/types
- Use strict type checking
- Avoid using `any` type

### Testing (To be implemented)
- Unit tests for utilities and hooks
- Component tests for UI components
- Integration tests for features
- E2E tests for critical user flows

## Development Workflow

### Starting a New Feature
1. Create a new feature directory in `src/features`
2. Define types in `types.ts`
3. Create necessary components
4. Implement API calls if needed
5. Export public API through `index.ts`

### Code Review Guidelines
- Ensure type safety
- Check for proper error handling
- Verify component composition
- Review test coverage
- Check for consistent styling
- Verify documentation

### Performance Considerations
- Use React.memo for expensive components
- Implement proper dependency arrays in hooks
- Consider code splitting for large features
- Optimize bundle size

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Environment Variables
Create a `.env` file with the following variables:
```env
VITE_API_URL=your_api_url
VITE_APP_NAME=your_app_name
```

## Contributing
1. Create a feature branch from `develop`
2. Follow the coding standards
3. Write necessary tests
4. Update documentation
5. Submit a pull request

## Resources
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev/guide)
