import styles from './App.module.css';
import { SlidesList } from "./view/SlidesList.tsx";
import { TopPanel } from "./view/topPanel/TopPanel.tsx";
import { Workspace } from "./view/Workspace.tsx";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <TopPanel></TopPanel>
            <main className={styles.container}>
                <SlidesList></SlidesList>
                <Workspace></Workspace>
            </main>
        </DndProvider>
    );
}

export default App;
