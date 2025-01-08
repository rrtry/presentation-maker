import App from './App.tsx';
import './index.css';
import { Ajv } from "ajv";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { addEditorChangeHandler, getEditor } from "./store/editor.ts";
import { STORAGE_KEY } from './store/editor.ts';
import { setEditor } from './store/editor.ts';
import { EditorSchema } from './store/schemas/editorSchema.ts';
import { editor } from './store/data.ts';

function restoreEditor() {
    const storageItem = localStorage.getItem(STORAGE_KEY);
    if (storageItem !== null) {

        const ajv = new Ajv();
        const validateEditor = ajv.compile(EditorSchema);

        if (validateEditor(JSON.parse(storageItem))) {
            setEditor(editor, false);
        }
    } else {
        setEditor(editor, true);
    }
}

const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <App editor={getEditor()}/>
        </StrictMode>,
    )
}

addEditorChangeHandler(render)
restoreEditor()
render()
