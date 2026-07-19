import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('The application root element was not found.');
}

createRoot(root).render(<App />);
