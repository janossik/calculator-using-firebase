import { createContext, ReactElement, useContext, useMemo, useState } from 'react';
import { localStorageUtils } from '@/helpers/localStorageUtils.ts';
import { createTheme, ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ColorModeProvider({ children }: { children: ReactElement }) {
  const [mode, setMode] = useState<'light' | 'dark'>(localStorageUtils.getMode());

  const colorMode = useMemo(() => ({ toggleColorMode: () => setMode((prevMode) => localStorageUtils.switchMode(prevMode)) }), []);
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useColorMode = () => {
  const User = useContext(ColorModeContext);
  if (!User) {
    throw Error('useUser needs to be inside inside UserProvider');
  }
  return User;
};
