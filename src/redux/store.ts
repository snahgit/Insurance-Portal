import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./slices/userProfileSlice";
import authenticationSlice from "./slices/UserAuthenticationSlices";
import languageReducer from "./slices/languageSlice";
import pagePaginationReducer from "./slices/pagePaginationSlice";
import pageTopBarAndFilterReducer from "./slices/pageTopBarAndFilterSlice";
import modalDrawerReducer from "./slices/modalDrawerSlice";
import themeReducer from "./slices/themeSlice";
import securityModalReducer from "./slices/securityModalSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    language: languageReducer,
    userProfile: userProfileReducer,
    pagePagination: pagePaginationReducer,
    pageTopBarAndFilter: pageTopBarAndFilterReducer,
    modalDrawer: modalDrawerReducer,
    theme: themeReducer,
    securityModal: securityModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
