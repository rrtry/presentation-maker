import styles from './TopPanel.module.css'
import {Button} from "../../components/button/Button.tsx";
import {dispatch} from "../../store/editor.ts";
import {addSlide} from "../../store/addSlide.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import {renamePresentationTitle} from "../../store/renamePresentationTitle.ts";
import { addTextObject } from './addTextObject.ts';
import * as React from "react";

type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps) {
    function onAddSlide() {
        dispatch(addSlide)
    }
    function onRemoveSlide() {
        dispatch(removeSlide)
    }
    function onAddTextObject() {
        dispatch(addTextObject)
    }
    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }
    return (
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>
            <div>
                <Button className={styles.button} text={'Добавить слайд'} onClick={onAddSlide}></Button>
                <Button className={styles.button} text={'Удалить слайд'}  onClick={onRemoveSlide}></Button>
                <Button className={styles.button} text={'Добавить текст'} onClick={onAddTextObject}></Button>
            </div>
        </div>
    )
}

export {
    TopPanel,
}
