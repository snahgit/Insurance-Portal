import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ColorScheme = 'light' | 'dark';

interface ThemeState {
  colorScheme: ColorScheme;
}

const getInitialColorScheme = (): ColorScheme => {
  const saved = localStorage.getItem('mantine-color-scheme');
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  return 'light';
};

const initialState: ThemeState = {
  colorScheme: getInitialColorScheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<ColorScheme>) => {
      state.colorScheme = action.payload;
      localStorage.setItem('mantine-color-scheme', action.payload);
    },
    toggleColorScheme: (state) => {
      const newScheme = state.colorScheme === 'light' ? 'dark' : 'light';
      state.colorScheme = newScheme;
      localStorage.setItem('mantine-color-scheme', newScheme);
    },
  },
});

export const { setColorScheme, toggleColorScheme } = themeSlice.actions;
export default themeSlice.reducer;
