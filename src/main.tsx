import App from './App.tsx';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store.ts';
import { initHistory } from './history/history.ts';
import { useEffect } from 'react';
import * as action from './store/actions.ts';

export const STORAGE_KEY = 'editor';

function RestoreEditor() {

    const dispatch = useDispatch();
    const restoreEditor = () => {
        const storageItem = localStorage.getItem('editor');
        if (storageItem !== null) {
            console.log(`RestoreEditor: ${storageItem}`);
            dispatch(action.setEditor(JSON.parse(storageItem)));
        }
    };

    useEffect(() => {
        restoreEditor();
    }, [dispatch]);

    return null;
}

const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <RestoreEditor/>
                <App history={initHistory(store)}/>
            </Provider>
        </StrictMode>
    );
}
render()
