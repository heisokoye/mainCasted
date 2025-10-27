import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import ThemeToggle from './components/ThemeToggle';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Layout>
        <ThemeToggle />
      </Layout>
    </ThemeProvider>
  );
};

export default App;