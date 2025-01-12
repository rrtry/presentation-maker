import styles from './App.module.css';
import { SlidesList } from "./view/SlidesList.tsx";
import { TopPanel } from "./view/topPanel/TopPanel.tsx";
import { Workspace } from "./view/Workspace.tsx";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HistoryType } from './utils/history.ts';
import { HistoryContext } from './view/slide/historyContext.ts';

function App() {
    return (
        <HistoryContext.Provider value={history}>
            <DndProvider backend={HTML5Backend}>
                <TopPanel></TopPanel>
                <main className={styles.container}>
                    <SlidesList></SlidesList>
                    <Workspace></Workspace>
                </main>
            </DndProvider>
        </HistoryContext.Provider>
    );
}

export default App;
