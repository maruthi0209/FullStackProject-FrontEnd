import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} style={{width : "50px"}}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}