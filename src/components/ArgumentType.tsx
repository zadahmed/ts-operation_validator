import React, { useCallback, useEffect, useState } from "react";
import { IArg } from "./Arg";

type IResult = boolean | undefined;

interface IArgumentProps {
    argsList: { [key: number]: IArg };
    setResult: (newValue: IResult, id?: number) => void;
    close: (id?: number) => void;
}

export const ArgumentType = ({ argsList, setResult, close }: IArgumentProps) => {
    const [selected, setSelected] = useState(0);
    const [value, setValue] = useState<IResult>(false);

    const onChangeValueHandler: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        const newValue = Number(e.target.value);
        setSelected(newValue);
    }, []);

    useEffect(() => {
        setValue(argsList[selected].value);
    }, [argsList, selected]);

    useEffect(() => {
        setResult(value);
    }, [setResult, value]);

    return (
        <>
            <select onChange={onChangeValueHandler}>
                {Object.values(argsList).map((arg) => (
                    <option key={arg.id} selected={arg.id === selected} value={arg.id}>
                        {arg.name}
                    </option>
                ))}
            </select>
            <button onClick={() => close()}>x</button>
            <br />
        </>
    );
};
