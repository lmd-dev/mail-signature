import { useEffect, useRef, useState } from "react"
import "./signature-properties.scss"
import { Signature } from "../../../models/signature";
import { signatureService } from "../../../services/signature.service";
import { TimedButton } from "../timed-button/timed-button";
import { OptionalFieldList } from "../optional-field-list/optional-field-list";

import logoUrl from "./../../global/img/logo.png";
import pdfPictoUrl from "./../../global/img/pictos/pdf.png";
import zimbraUserManualUrl from "../../../../public/guide-signature-zimbra.pdf";

export function SignatureProperties()
{
    const [signature, setSignature] = useState<Signature>(signatureService.signature);

    const txtName = useRef<HTMLInputElement>(null);
    const txtRole = useRef<HTMLInputElement>(null);
    const txtPhone = useRef<HTMLInputElement>(null);
    const txtMail = useRef<HTMLInputElement>(null);
    const chkAddress = useRef<HTMLInputElement>(null);

    const loadSignature = () =>
    {
        setSignature({ ...signatureService.signature });
    }

    const updateSignature = () =>
    {
        signatureService.signature.name = txtName.current!.value;
        signatureService.signature.role = txtRole.current!.value;
        signatureService.signature.phoneNumber = txtPhone.current!.value;
        signatureService.signature.mail = txtMail.current!.value;
        signatureService.signature.showAddress = chkAddress.current!.checked;

        console.log(signatureService.signature);

        signatureService.saveSignature();
    }

    const copyHTMLCode = () =>
    {
        signatureService.copyHTMLToClipboard();
    }

    useEffect(() =>
    {
        signatureService.addEventListener("change", loadSignature);

        return () =>
        {
            signatureService.removeEventListener("change", loadSignature);
        }
    })

    return (
        <div className="signature-properties">
            <div className="logo">
                <img src={logoUrl} />
            </div>

            <h2>1. Configurez votre signature de mail</h2>
            <div className="fields">
                <div className="field">
                    <label>Nom</label>
                    <input ref={txtName} type="text" defaultValue={signature.name} onChange={updateSignature} />
                </div>
                <div className="field">
                    <label>Fonction</label>
                    <input ref={txtRole} type="text" defaultValue={signature.role} onChange={updateSignature} />
                </div>
                <OptionalFieldList fields={signature.optionalFieldsAfterRole} />
                <div className="field">
                    <label>Téléphone</label>
                    <input ref={txtPhone} type="phone" defaultValue={signature.phoneNumber} onChange={updateSignature} />
                </div>
                <OptionalFieldList fields={signature.optionalFieldsAfterPhone} />
                <div className="field">
                    <label>Adresse mail</label>
                    <input ref={txtMail} type="mail" defaultValue={signature.mail} onChange={updateSignature} />
                </div>
                <OptionalFieldList fields={signature.optionalFieldsAfterMail} />
                <div className="field">
                    <label><input ref={chkAddress} type="checkbox" defaultChecked={signature.showAddress} onChange={updateSignature} />Afficher l'adresse de Polytech Dijon</label>
                </div>
            </div>

            <h2>2. Copiez le code HTML</h2>
            <div className="field">
                <TimedButton firstLabel="Copier le code HTML de la signature" secondLabel="Code copié !" duration={5000} onClick={copyHTMLCode} />
            </div>

            <h2>3. Collez le code HTML dans votre client mail</h2>
            <a href={zimbraUserManualUrl} target="_blank"><img src={pdfPictoUrl} /> Guide pour la signature Zimbra</a>
        </div >
    )
}