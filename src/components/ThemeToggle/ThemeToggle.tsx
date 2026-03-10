import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { forwardRef, useMemo } from 'react';

export const ThemeToggle = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  (props, ref) => {
    const { theme, setTheme } = useTheme();

    const resolvedTheme = useMemo(() => {
      if (theme !== 'system') return theme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }, [theme]);

    const isDark = resolvedTheme === 'dark';

    const toggleTheme = () => {
      setTheme(isDark ? 'light' : 'dark');
    };

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="transition-transform hover:rotate-12 hover:scale-110"
        {...props}
      >
        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <span className="sr-only">Alternar tema</span>
      </Button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';