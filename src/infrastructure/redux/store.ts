import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import { Api } from '../../services/api';

const enhancers =
  __DEV__
    ? (getDefaultEnhancers: any) => {
        const tron = require('../../../ReactotronConfig').default;
        const rtEnhancer = (tron as any)?.createEnhancer?.();
        return rtEnhancer
          ? getDefaultEnhancers().concat(rtEnhancer)
          : getDefaultEnhancers();
      }
    : undefined;

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    [Api.reducerPath]: Api.reducer,
  },
  devTools: __DEV__,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(Api.middleware),

  enhancers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
