/**
 * Theme initialization script that runs before the app renders
 * This prevents flash of wrong theme on page load
 */
export function initializeTheme(): void {
  const script = `
    (function() {
      try {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = storedTheme || (prefersDark ? 'dark' : 'light');
        
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        // If localStorage is not available, fallback to light theme
        console.error('Failed to initialize theme:', e);
      }
    })();
  `;

  // Create a script element to inject the initialization code
  const scriptElement = document.createElement('script');
  scriptElement.innerHTML = script;
  document.head.appendChild(scriptElement);
}
