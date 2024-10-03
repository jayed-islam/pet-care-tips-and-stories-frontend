import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

import authSlice from "./reducers/auth/authSlice";
import menuSlice from "./reducers/menu/menuSlice";
import deenbookSlice from "./reducers/deenbook/deenbookSlice";
import lectureSlice from "./reducers/lecture/lectureSlice";
import lecturerSlice from "./reducers/lecturer/lecturerSlice";

import authReducer from "./reducers/auth/authSlice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import postSlice from "./reducers/post/postSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    deenbook: deenbookSlice,
    lecture: lectureSlice,
    lecturer: lecturerSlice,
    post: postSlice,
    menu: menuSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
