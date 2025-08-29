import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FlagProps } from "../../component/includes/Header";

interface LanguageState {
  language: FlagProps;
}

const getInitialLanguage = () => {
  try {
    const getLanguageData = localStorage.getItem("language");
    if (getLanguageData) {
      return JSON.parse(getLanguageData);
    }
  } catch (error) {
    console.warn("Failed to parse language data from localStorage:", error);
  }
  return {
    id: 1,
    title: "EN",
    code: "us",
  };
};

const initialState: LanguageState = {
  language: getInitialLanguage(),
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<FlagProps>) => {
      state.language = action.payload;
      localStorage.setItem("language", JSON.stringify(action.payload));
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
