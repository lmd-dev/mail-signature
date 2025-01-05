import { OptionalField } from "../models/optional-field";
import { defaultSignature, Signature } from "../models/signature";

class SignatureService extends EventTarget
{
    private _signature: Signature;
    public get signature(): Signature { return this._signature; };

    constructor()
    {
        super();

        this._signature = this.initSignature();
    }

    initSignature()
    {
        let signature = this.loadSignature()

        if (!signature)
            signature = defaultSignature();

        return signature;
    }

    loadSignature(): Signature | null
    {
        const data = localStorage.getItem("signature");

        if (data)
        {
            try
            {
                return JSON.parse(data);
            }
            catch (error)
            {
                console.error(error);
            }
        }
        return null;
    }

    saveSignature()
    {
        localStorage.setItem("signature", JSON.stringify(this._signature));
        this.notify();
    }

    notify()
    {
        this.dispatchEvent(new CustomEvent("change"));
    }

    copyHTMLToClipboard()
    {
        const html = /*html*/`
            <div style="padding-top: 30px;font-size: 10pt; color:#444">
                <div style="font-size: 11pt; font-weight: bold; color: #004674">${this.signature.name}</div>
                <div style="padding-top:3px;font-weight:bold">${this.signature.role}</div>
                ${this.makeOptionalFieldsHTMLCode(this.signature.optionalFieldsAfterRole)}                
                ${this.signature.phoneNumber !== "" ? `<div style="padding-top:3px;">Tél : <a style="color:#444;text-decoration:none;" href="tel:${this.signature.phoneNumber}">${this.signature.phoneNumber}</a></div>` : ""}
                ${this.makeOptionalFieldsHTMLCode(this.signature.optionalFieldsAfterPhone)}                
                <div style="padding-top:10px;padding-bottom: 10px"><a style="color:#009EE2;text-decoration: none; font-weight:bold;" href="mailto:${this.signature.mail}">${this.signature.mail}</a></div>
                ${this.makeOptionalFieldsHTMLCode(this.signature.optionalFieldsAfterMail)}                
                ${this.signature.showAddress ? `
                    <div style="padding-top: 10px; padding-bottom: 10px;display:inline-block">
                        <div style="padding-top:10px;border-top: 1px solid #ccc;"><strong>Polytech Dijon</strong> | <a style="color:#009EE2;" href="https://polytech.u-bourgogne.fr" target="_blank">polytech.u-bourgogne.fr</a></div>
                        <div style="padding-top:3px;">9 Av. Alain Savary 21000 DIJON</div>
                        <img style="padding-top: 10px;" src="data:image/jpeg;base64,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" />

                    </div>
                    ` :
                `
                        <img style="padding-top: 10px;" src="data:image/jpeg;base64,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" />
                    `
            }
                
            </div>
        `;

        console.log(html);

        navigator.clipboard.writeText(html);
    }

    private makeOptionalFieldsHTMLCode(fields: OptionalField[]): string
    {
        return fields.map((field) =>
        {
            return `<div style="
                                padding-top:3px;
                                ${field.bold ? "font-weight:bold;" : ""} 
                                ${field.italic ? "font-style:italic;" : ""}
                                ${field.underlined ? "text-decoration:underline;" : ""}
                                color:${field.color === "black" ? "#444" : field.color === "light" ? "#009EE2" : "#004674"};
                            ">${field.label}</div>`
        }).join(" ")
    }
}

export const signatureService = new SignatureService();