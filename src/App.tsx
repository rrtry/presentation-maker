import styles from './App.module.css';
import * as React from 'react';
import { SlidesList } from "./view/SlidesList.tsx";
import { TopPanel } from "./view/topPanel/TopPanel.tsx";
import { Workspace } from "./view/Workspace.tsx";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { HistoryType } from './history/history.ts';
import { HistoryContext } from './view/slide/historyContext.ts';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as action from './store/actions.ts';

type AppProps = {
    history: HistoryType,
}

const HotkeysHandler: React.FC = () => {

    const dispatch = useDispatch();
    const history  = React.useContext(HistoryContext);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {

            if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
                event.preventDefault();
                const newEditor = history.undo();
                if (newEditor) {
                    dispatch(action.setEditor(newEditor));
                }
            }

            if ((event.ctrlKey || event.metaKey) && event.key === 'z' && event.shiftKey) {
                event.preventDefault();
                const newEditor = history.redo();
                if (newEditor) {
                    dispatch(action.setEditor(newEditor));
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [dispatch]);

    return null;
};

function App({history}: AppProps) {
    return (
        <HistoryContext.Provider value={history}>
            <DndProvider backend={HTML5Backend}>
                <TopPanel></TopPanel>
                <HotkeysHandler/>
                <main className={styles.container}>
                    <SlidesList></SlidesList>
                    <Workspace></Workspace>
                </main>
            </DndProvider>
        </HistoryContext.Provider>
    );
}

export default App;
