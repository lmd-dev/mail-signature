import { useState } from "react";

type TimedButtonProperties = {
    firstLabel: string,
    secondLabel: string,
    duration: number,
    onClick: () => void
}

export function TimedButton({firstLabel, secondLabel, duration, onClick}: TimedButtonProperties)
{
    const [label, setLabel] = useState<string>(firstLabel);
    const [timer, setTimer] = useState<number | null>(null);

    const click = () => {
        if(timer)
            return;

        setLabel(secondLabel);
        onClick();

        setTimer(setTimeout(() => { setLabel(firstLabel); setTimer(null); }, duration));
    }

    return <button onClick={click}>{label}</button>
}