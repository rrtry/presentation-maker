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
import { FileInput } from '../../components/Input.tsx';
import { removeObject } from './removeObject.ts';
import { PresentationType } from '../../store/PresentationType.ts';
import { PresentationSchema } from '../../store/schemas/PresentationSchema.ts';
import { Ajv } from "ajv";

const ajv = new Ajv(); 
const validatePresentation = ajv.compile(PresentationSchema);

type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps) {

    const [colorPickerVisible, setColorPickerVisible] = React.useState(false)
    const [color, setColor] = React.useState(getSelection(editor)!!.background)

    function onImportDocument(jsonSchema: string) {
        const presentation: PresentationType = JSON.parse(jsonSchema);
        if (validatePresentation(presentation)) {
            dispatch(() => {
                return {
                    presentation: presentation,
                    selection: { selectedSlideId: presentation.slides[0].id },
                    objectId: null
                }
            });
        } else {
            alert('Could not import presentation: Invalid schema');
        }
    }

    function onExportDocument() {
        const editor = getEditor();
        const a = document.createElement('a');
        a.download = editor.presentation.title;
        console.log(`${editor.presentation.title}`)
        a.href = URL.createObjectURL(new Blob([JSON.stringify(editor.presentation)], { type: 'application/json' }));
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
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

    const onFileSelected = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: string,
        onload: (file: string) => void
    ) => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    onload(e.target.result as string);
                }
            };
            if (type.startsWith('image')) {
                reader.readAsDataURL(file);
            } else {
                reader.readAsText(file);
            }
        }
        input.value = '';
    };
    
    return (
        <header className={styles.topPanel}>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>
            <ul className={styles.actions}>
                <li className={styles.action}><button className={styles.button} onClick={onAddSlide}>{'Add slide'}</button></li>
                <li className={styles.action}><button className={styles.button} onClick={onRemoveSlide}>{'Remove slide'}</button></li>
                <li className={styles.action}><button className={styles.button} onClick={onAddTextObject}>{'Add text'}</button></li>
                <li className={styles.action}>
                    <button className={styles.inputButton}>
                        <FileInput
                            text={"Add image"}
                            className={styles.hiddenInput}
                            onChange={(e) => onFileSelected(e, "image/jpg", onAddImageObject)}
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
                <li className={styles.action}><button className={styles.button} onClick={onExportDocument}>{'Export document'}</button></li>
                <li className={styles.action}>
                    <button className={styles.inputButton}>
                        <FileInput
                            text={"Import document"}
                            className={styles.hiddenInput}
                            onChange={(e) => onFileSelected(e, "application/json", onImportDocument)}
                            accept={"application/json"}
                        />
                    </button>
                </li>
            </ul>
        </header>
    )
}

export {
    TopPanel,
}
