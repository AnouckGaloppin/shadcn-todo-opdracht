// import ThemeProvider from "@/components/theme-provider";

import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    isDark: false,
  },
  reducers: {
    toggle: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export default layoutSlice;
