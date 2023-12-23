//== react, react-router-dom, Auth0 ==//
import { useState, useEffect, createContext, useContext } from 'react';

//== Icons ==//
import { MoonIcon, SunIcon } from './UI/icons';

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
interface ThemeContextType {
  // Create a context for the theme.
  theme: string;
  setTheme: (theme: string) => void;
}

//== Context Provider ==//
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light', // default value
  setTheme: () => {}, // empty implementation, but it's okay for default value
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  //   const [theme, setTheme] = useState('light');
  const [theme, setTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function ThemeToggle() {
  //== React State, Custom Hooks ==//
  let { theme, setTheme } = useTheme();
  let otherTheme = theme === 'dark' ? 'light' : 'dark';
  let [mounted, setMounted] = useState(false);

  //== Side Effects ==//
  useEffect(() => {
    setMounted(true);
  }, []);

  //== ***** ***** ***** Component Return ***** ***** ***** ==//
  return (
    <button
      type='button'
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className='group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20'
      onClick={() => setTheme(otherTheme)}
    >
      <SunIcon className='h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600' />
      <MoonIcon className='hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500' />
    </button>
  );
}
