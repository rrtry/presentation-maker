import { createStore } from 'redux';
import rootReducer from './rootreducer';

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);