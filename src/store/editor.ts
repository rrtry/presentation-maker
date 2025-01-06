import {editor} from './data.ts'

let _editor = editor
let _handler = null

const STORAGE_KEY = "editor"

function getEditor() {
    const savedEditor = localStorage.getItem(STORAGE_KEY);
    if (savedEditor !== null) {
        return JSON.parse(savedEditor);
    }
    return _editor;
}

function setEditor(newEditor) {
    _editor = newEditor
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEditor))
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
    dispatch,
    addEditorChangeHandler,
}
