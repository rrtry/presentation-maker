import App from './App.tsx';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { addEditorChangeHandler, getEditor } from "./store/editor.ts";
import { STORAGE_KEY } from './store/editor.ts';
import { setEditor } from './store/editor.ts';

function restoreEditor() {
    const storageItem = localStorage.getItem(STORAGE_KEY);
    if (storageItem !== null) {
        setEditor(JSON.parse(storageItem), false);
    }
}

restoreEditor()
const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <App editor={getEditor()}/>
        </StrictMode>,
    )
}

addEditorChangeHandler(render)
render()
