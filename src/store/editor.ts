import {editor} from './data.ts'
import { EditorType } from './EditorType.ts';

let _editor  = editor
let _handler = null

export const STORAGE_KEY = "editor"

function getEditor() {
    return _editor;
}

function setEditor(newEditor: EditorType, saveToStorage: boolean = true) {
    _editor = newEditor;
    if (saveToStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newEditor));
    }
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)
    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Function): void {
    _handler = handler
}

export {
    getEditor,
    setEditor,
    dispatch,
    addEditorChangeHandler,
}
