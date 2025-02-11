import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { airboxApi } from "./airboxApi"

export const store = configureStore({
  reducer: {
    [airboxApi.reducerPath]: airboxApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(airboxApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

