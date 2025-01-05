import "./signature-preview.scss";
import { useEffect, useState } from "react"
import { signatureService } from "../../../services/signature.service"
import { Signature } from "../../../models/signature";
import logoUrl from "./../../global/img/logo.png";

export function SignaturePreview()
{
    const [signature, setSignature] = useState<Signature>(signatureService.signature);

    const updatePreview = () =>
    {
        setSignature({ ...signatureService.signature });
    }

    useEffect(() =>
    {
        signatureService.addEventListener("change", updatePreview);

        return () =>
        {
            signatureService.removeEventListener("change", updatePreview);
        }
    })

    return (
        <div className="signature-preview">
            <div>
                <div className="name">{ signature.name }</div>
                <div className="role">{ signature.role }</div>
                {
                    signatureService.signature.optionalFieldsAfterRole.map((field, index) =>
                    {
                        return <div key={ `optional-field-${ index }` } className={ `${ field.label === "" ? "empty" : "" } ${ field.bold && "bold" } ${ field.italic && "italic" } ${ field.underlined && "underlined" } ${ field.color }` }>{ field.label }</div>
                    })
                }
                { signature.phoneNumber !== "" && <div className="phone">Tél : <a className="no-deco" href={ `tel:${ signature.phoneNumber }` }>{ signature.phoneNumber }</a></div> }
                {
                    signatureService.signature.optionalFieldsAfterPhone.map((field, index) =>
                    {
                        return <div key={ `optional-field-${ index }` } className={ `${ field.label === "" ? "empty" : "" } ${ field.bold && "bold" } ${ field.italic && "italic" } ${ field.underlined && "underlined" } ${ field.color }` }>{ field.label }</div>
                    })
                }
                { signature.mail !== "" && <div className="mail"><a href={ `mailto:${ signature.mail }` }>{ signature.mail }</a></div> }
                {
                    signatureService.signature.optionalFieldsAfterMail.map((field, index) =>
                    {
                        return <div key={ `optional-field-${ index }` } className={ `${ field.label === "" ? "empty" : "" } ${ field.bold && "bold" } ${ field.italic && "italic" } ${ field.underlined && "underlined" } ${ field.color }` }>{ field.label }</div>
                    })
                }
                { signature.showAddress ?
                    <div className="address">
                        <hr />
                        <div><strong>Polytech Dijon</strong> | <a href="https://polytech.u-bourgogne.fr" target="_blank">polytech.u-bourgogne.fr</a></div>
                        <div>9 Av. Alain Savary 21000 DIJON</div>
                        <img className="logo" src={ logoUrl } />
                    </div>
                    :
                    <img className="logo" src={ logoUrl } />
                }
            </div>
        </div>
    )
}