import {SlideType} from "../store/PresentationType.ts";
import {Slide} from "./slide/Slide.tsx";
import styles from './Workspace.module.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

function Workspace() {
    const editor = useSelector((state: RootState) => state.editor);
    return (
        <div className={styles.workspace}>
            <Slide slide={editor.presentation.slides.find((value: SlideType) => editor.selection?.selectedSlideId === value.id)}></Slide>
        </div>
    )
}

export {
    Workspace,
}
