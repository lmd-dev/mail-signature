import { useState } from "react";
import "./toggle-button.scss";

type ToggleButtonProperties = {
    status: boolean,
    css?: string,
    onUpdate: (active: boolean) => void
}

export function ToggleButton({status, css, onUpdate}: ToggleButtonProperties)
{
    const [active, setActive] = useState<boolean>(status)
    
    const toggle = () => {
        const newStatus = !active;
        onUpdate(newStatus);
        setActive(newStatus)
    }

    return (
        <div className={`toggle-button ${css ?? ""} ${active ? "active" : ""}`} onClick={toggle}>

        </div>
    )
}