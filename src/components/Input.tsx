type InputProps = {
    className: string,
    onChange: React.ChangeEventHandler<Element>,
    text: string
}

type ImageInputProps = InputProps & {
    accept: string
}

type ColorInputProps = InputProps & {
    value: string
}

function ColorInput({className, onChange, text, value}: ColorInputProps) {
    return (
        <div>
            <input
                type="color"
                className={className}
                value={value}
                onChange={onChange}
            />
        {"Change background"}
        </div>
    )
}

function ImageInput({className, onChange, text, accept}: ImageInputProps) {
    return (
        <div>
            <input
                type="file"
                className={className}
                accept={accept}
                onChange={onChange}
            />
        {text}
        </div>
    )
}

export {
    ColorInput,
    ImageInput
}