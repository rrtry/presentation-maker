import styles from './TopPanel.module.css'
import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { ColorInput } from '../../components/Input.tsx';
import { FileInput } from '../../components/Input.tsx';
import { PresentationSchema } from '../../store/schemas/PresentationSchema.ts';
import { Ajv } from "ajv";
import * as actions from "../../store/actions.ts";
import { EditorType } from '../../store/EditorType.ts';
import { PresentationType } from '../../store/PresentationType.ts';
import { SlideType } from '../../store/PresentationType.ts';

const ajv = new Ajv(); 
const validatePresentation = ajv.compile(PresentationSchema);

function TopPanel() {

    const dispatch = useDispatch(); 
    const editor   = useSelector((state: RootState) => state.editor);

    const [colorPickerVisible, setColorPickerVisible] = React.useState(false)
    const [color, setColor] = React.useState(
        editor.presentation.slides.find((value: SlideType) => editor.selection?.selectedSlideId === value.id)!.background
    )

    function onImportDocument(jsonSchema: string) {
        const imported: PresentationType = JSON.parse(jsonSchema);
        if (validatePresentation(imported)) {
            const importedEditor: EditorType = {
                presentation: imported,
                selection: { selectedSlideId: imported.slides[0].id },
                objectId: null
            }
            dispatch(actions.setEditor(importedEditor));
        } else {
            alert('Could not import presentation: Invalid schema');
        }
    } 

    function onExportDocument() {
        const a = document.createElement('a');
        a.download = editor.presentation.title;
        a.href = URL.createObjectURL(new Blob([JSON.stringify(editor.presentation)], { type: 'application/json' }));
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
    }

    function onToggleColorPickerVisibility() {
        setColor(editor.presentation.slides.find((value: SlideType) => editor.selection?.selectedSlideId === value.id)!.background)
        setColorPickerVisible(prevState => !prevState)
    }

    function onAddSlide() {
        dispatch(actions.addSlide())
    }

    function onRemoveSlide() {
        dispatch(actions.removeSlide())
    }

    function onRemoveObject() {
        dispatch(actions.removeSlideObject())
    }

    function onAddTextObject() {
        dispatch(actions.addText({ x: 100, y: 100}));
    }

    function onAddImageObject(path: string) {
        dispatch(actions.addImage(path))
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(actions.renamePresentation((event.target as HTMLInputElement).value));
    }

    const onBackgroundColorChange: React.ChangeEventHandler = (event) => {
        dispatch(actions.setSlideBackground((event.target as HTMLInputElement).value));
        setColor((event.target as HTMLInputElement).value);
        /*
        const value = (event.target as HTMLInputElement).value
        dispatch(changeSlideBackgroundColor, value)
        setColor(value) */
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
            <input className={styles.title} type="text" defaultValue={editor.presentation.title} onChange={onTitleChange}/>
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
