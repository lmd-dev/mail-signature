import "./app.scss"
import { SignaturePreview } from "../components/signature-preview/signature-preview";
import { SignatureProperties } from "../components/signature-properties/signature-properties";

export function App()
{
    return (
        <>
            <SignatureProperties />
            <SignaturePreview />
        </>
    )
}