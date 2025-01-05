import { ChangeEvent, useId, useRef } from "react";
import { OptionalField } from "../../../models/optional-field";
import "./optional-field-editor.scss";
import { ToggleButton } from "../toggle-button/toggle-button";

type OptionalFieldEditorProperties = {
    field: OptionalField,
    onUpdate: () => void,
    onDelete: () => void
}

export function OptionalFieldEditor({ field, onUpdate, onDelete }: OptionalFieldEditorProperties)
{
    const id = useId();

    const txtLabel = useRef<HTMLInputElement>(null);

    const updateLabel = () =>
    {
        field.label = txtLabel.current!.value;
        onUpdate();
    }

    const updateBoldStyle = (status: boolean) =>
    {
        field.bold = status;
        onUpdate();
    }

    const updateItalicStyle = (status: boolean) =>
    {
        field.italic = status;
        onUpdate();
    }

    const updateUnderlineStyle = (status: boolean) =>
    {
        field.underlined = status;
        onUpdate();
    }

    const onColorChange = (event: ChangeEvent) => {
        field.color = (event.target as HTMLInputElement).value;
        onUpdate();
    }

    return (
        <div className="optional-field-editor">
            <label>Champ personnalisé</label>
            <div>
                <input ref={ txtLabel } type="text" defaultValue={ field.label } onChange={ updateLabel } />
                <div className="close-button" onClick={ onDelete }></div>
            </div>
            <div className="options">
                <ToggleButton status={field.bold} css="bold" onUpdate={ updateBoldStyle } />
                <ToggleButton status={field.italic} css="italic" onUpdate={ updateItalicStyle } />
                <ToggleButton status={field.underlined} css="underline" onUpdate={ updateUnderlineStyle } />
                <label><input type="radio" name={`${id}-color`} value={"black"} defaultChecked={field.color === "black"} onChange={onColorChange} /> Normal</label>
                <label className="dark-blue"><input type="radio" name={`${id}-color`} value={"dark"} defaultChecked={field.color === "dark"} onChange={onColorChange}/> Bleu foncé</label>
                <label className="light-blue"><input type="radio" name={`${id}-color`} value={"light"} defaultChecked={field.color === "light"} onChange={onColorChange} /> Bleu clair</label>
            </div>
        </div>
    )
}