import React, { useCallback, useEffect, useState } from "react";
import { IArg } from "./Arg";
import { ArgumentType } from "./ArgumentType";
import { ConstantType } from "./ConstantType";
import { OperatorType } from "./OperatorType";

type IResult = boolean | undefined;

const chooseList = ["select...", "constant", "argument", "and", "or"];

interface IOperationProps {
    argsList: { [key: number]: IArg };
    setResult: (newValue: IResult, id?: number) => void;
    close: (id?: number) => void;
    id?: number;
}

export const Operation = ({ id, argsList, setResult, close }: IOperationProps) => {
    const [value, setValue] = useState<IResult>(undefined);

    useEffect(() => {
        setResult(value, id);
    }, [id, setResult, value]);

    const [type, setType] = useState(0);

    const onChangeTypeHandler: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
        (e) => {
            const newValue = Number(e.target.value);
            if (newValue === 2 && Object.keys(argsList).length === 0) return;
            setType(newValue);
            setValue(undefined);
        },
        [argsList]
    );

    const closeHere = useCallback(() => {
        setType(0);
        setValue(undefined);
    }, []);

    const closeIt = useCallback(() => {
        close(id);
    }, [close, id]);

    return (
        <>
            {type === 0 && (
                <>
                    <select onChange={onChangeTypeHandler}>
                        {chooseList.map((val, index) => (
                            <option key={index} selected={index === type} value={index}>
                                {val}
                            </option>
                        ))}
                    </select>
                    <button onClick={closeIt}>x</button>
                </>
            )}
            {type === 1 && <ConstantType setResult={setValue} close={closeHere} />}
            {type === 2 && <ArgumentType argsList={argsList} setResult={setValue} close={closeHere} />}
            {type === 3 && <OperatorType argsList={argsList} setResult={setValue} close={closeHere} initType={0} />}
            {type === 4 && <OperatorType argsList={argsList} setResult={setValue} close={closeHere} initType={1} />}

            <br />
        </>
    );
};
