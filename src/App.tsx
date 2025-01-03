import styles from './App.module.css';
import { SlidesList } from "./view/SlidesList.tsx";
import { TopPanel } from "./view/topPanel/TopPanel.tsx";
import { Workspace } from "./view/Workspace.tsx";
import { EditorType } from "./store/EditorType.ts";
import { getSelection } from './store/selection.ts';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type AppProps = {
    editor: EditorType,
}

function App({ editor }: AppProps) {
    return (
        <DndProvider backend={HTML5Backend}>
            <TopPanel title={editor.presentation.title}></TopPanel>
            <main className={styles.container}>
                <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
                <Workspace slide={getSelection(editor) || editor.presentation.slides[0]}></Workspace>
            </main>
        </DndProvider>
    );
}

export default App;
