import styles from './TopPanel.module.css'
import {Button} from "../../components/button/Button.tsx";
import {dispatch} from "../../store/editor.ts";
import {addSlide} from "../../store/addSlide.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import {renamePresentationTitle} from "../../store/renamePresentationTitle.ts";
import { addTextObject } from './addTextObject.ts';
import { addImageObject } from './addImageObject.ts';

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

    function onAddImageObject() {
        dispatch(addImageObject)
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }
    return (
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>
            <div>
                <Button className={styles.button} text={'Add slide'}    onClick={onAddSlide}></Button>
                <Button className={styles.button} text={'Remove slide'} onClick={onRemoveSlide}></Button>
                <Button className={styles.button} text={'Add text'}     onClick={onAddTextObject}></Button>
                <Button className={styles.button} text={'Add Image'}    onClick={onAddImageObject}></Button>
            </div>
        </div>
    )
}

export {
    TopPanel,
}
