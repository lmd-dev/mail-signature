import { OptionalField } from "./optional-field";

export type Signature = {
    name: string,
    role: string,
    phoneNumber: string,
    mail: string,
    optionalFieldsAfterRole: OptionalField[],
    optionalFieldsAfterPhone: OptionalField[],
    optionalFieldsAfterMail: OptionalField[],
    showAddress: boolean,
}

export function defaultSignature(): Signature {
    return {
        name: "",
        role: "",
        phoneNumber: "",
        mail: "",
        optionalFieldsAfterRole: [],
        optionalFieldsAfterPhone: [],
        optionalFieldsAfterMail: [],
        showAddress: true
    }
}