import "./optional-field-list.scss"
import { defaultOptionalField, OptionalField } from "../../../models/optional-field"
import { signatureService } from "../../../services/signature.service"
import { OptionalFieldEditor } from "../optional-field-editor/optional-field-editor"

type OptionalFieldListProperties = {
    fields: OptionalField[]
}

export function OptionalFieldList({ fields }: OptionalFieldListProperties)
{
    const updateSignature = () => {
        signatureService.saveSignature();
    }

    const addOptionalField = () =>
    {
        fields.push(defaultOptionalField())

        updateSignature()
    }

    const deleteOptionalField = (index: number) =>
    {
        fields.splice(index, 1);
        updateSignature()
    }

    const onFieldUpdate = () =>
    {
        updateSignature()
    }

    return (
        <div className="optional-fields-list">
            <div>
                {
                    fields.map((field, index) =>
                    {
                        return <OptionalFieldEditor key={`field-editor-${index}`} field={field} onUpdate={onFieldUpdate} onDelete={() => { deleteOptionalField(index) }} />
                    })
                }
            </div>
            <button onClick={addOptionalField}>Ajouter un champ personnalisé</button>
            </div>
    )
}