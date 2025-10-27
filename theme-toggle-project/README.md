# Theme Toggle Project

This project implements a dark and light theme toggle button for a professional user interface using React and TypeScript.

## Features

- Toggle between dark and light themes
- Responsive design
- Context API for theme management

## Project Structure

```
theme-toggle-project
├── src
│   ├── components
│   │   ├── ThemeToggle.tsx
│   │   └── Layout.tsx
│   ├── styles
│   │   ├── globals.css
│   │   └── theme.css
│   ├── contexts
│   │   └── ThemeContext.tsx
│   ├── hooks
│   │   └── useTheme.ts
│   └── App.tsx
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd theme-toggle-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

- Use the `ThemeToggle` component to switch between themes.
- Wrap your application with the `ThemeProvider` from `ThemeContext` to provide theme context to your components.

## License

This project is licensed under the MIT License.