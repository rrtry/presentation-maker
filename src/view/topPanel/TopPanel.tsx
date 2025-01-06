import styles from './TopPanel.module.css'
import {dispatch, getEditor} from "../../store/editor.ts";
import {addSlide} from "../../store/addSlide.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import {renamePresentationTitle} from "../../store/renamePresentationTitle.ts";
import { addTextObject } from './addTextObject.ts';
import { addImageObject } from './addImageObject.ts';
import { changeSlideBackgroundColor } from '../slide/changeSlideBackgroundColor.ts';
import { getSelection } from '../../store/selection.ts';
import * as React from "react";
import { editor } from '../../store/data.ts';
import { ColorInput } from '../../components/Input.tsx';
import { ImageInput } from '../../components/Input.tsx';
import { removeObject } from './removeObject.ts';

type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps) {

    const [colorPickerVisible, setColorPickerVisible] = React.useState(false)
    const [color, setColor] = React.useState(getSelection(editor)!!.background)

    function onImportDocument() {
        // TODO: implement
    }

    function onExportDocument() {
        // TODO: implement
    }

    function onToggleColorPickerVisibility() {
        setColor(getSelection(getEditor())!!.background)
        setColorPickerVisible(prevState => !prevState)
    }

    function onAddSlide() {
        dispatch(addSlide)
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    function onRemoveObject() {
        dispatch(removeObject)
    }

    function onAddTextObject() {
        dispatch(addTextObject, {x: 100, y: 100})
    }

    function onAddImageObject(path: string) {
        dispatch(addImageObject, path)
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }

    const onBackgroundColorChange: React.ChangeEventHandler = (event) => {
        const value = (event.target as HTMLInputElement).value
        dispatch(changeSlideBackgroundColor, value)
        setColor(value)
    }

    const onImageSelected: React.ChangeEventHandler = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
            const reader  = new FileReader();
            reader.onload = function(e) {
                if (e.target) {
                    onAddImageObject(e.target.result as string)
                }
            }
            reader.readAsDataURL(file);
        }   
    }
    
    return (
        <header className={styles.topPanel}>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>
            <ul className={styles.actions}>
                <li className={styles.action}><button className={styles.button} onClick={onAddSlide}>{'Add slide'}</button></li>
                <li className={styles.action}><button className={styles.button} onClick={onRemoveSlide}>{'Remove slide'}</button></li>
                <li className={styles.action}><button className={styles.button} onClick={onAddTextObject}>{'Add text'}</button></li>
                <li className={styles.action}>
                    <button className={styles.inputButton}>
                        <ImageInput
                        text={"Add image"}
                        className={styles.hiddenInput}
                        onChange={onImageSelected}
                        accept={"image/jpg"}
                        />
                    </button>
                </li>
                <li className={styles.action}><button className={styles.button} onClick={onRemoveObject}>{'Remove object'}</button></li>
                <li className={styles.action}>
                    <button className={styles.inputButton} onClick={onToggleColorPickerVisibility}>
                        <ColorInput
                            text={"Change Background"}
                            className={styles.hiddenInput}
                            value={color}
                            onChange={onBackgroundColorChange}
                        />
                    </button>
                </li>
                <li className={styles.action}><button className={styles.button} onClick={onImportDocument}>{'Import document'}</button></li>
                <li className={styles.action}><button className={styles.button} onClick={onExportDocument}>{'Export document'}</button></li>
            </ul>
        </header>
    )
}

export {
    TopPanel,
}
