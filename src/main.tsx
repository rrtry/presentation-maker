import App from './App.tsx';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

/*
function restoreEditor() {
    const storageItem = localStorage.getItem(STORAGE_KEY);
    if (storageItem !== null) {
        setEditor(JSON.parse(storageItem), false);
    }
} 

restoreEditor() */
const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </StrictMode>
    );
}
render()
