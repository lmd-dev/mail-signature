export type OptionalField = {
    label: string,
    bold: boolean,
    italic: boolean,
    underlined: boolean,
    color: string,
}

export function defaultOptionalField() : OptionalField
{
    return {
        label: "",
        bold: false,
        italic: false,
        underlined: false,
        color: "black"
    }
}