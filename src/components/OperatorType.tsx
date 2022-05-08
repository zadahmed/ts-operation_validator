import React, { useCallback, useEffect, useState } from "react";
import { IArg } from "./Arg";
import { Operation } from "./Operation";

type IResult = boolean | undefined;

interface IOperatorProps {
    argsList: { [key: number]: IArg };
    setResult: (newValue: IResult, id?: number) => void;
    close: (id?: number) => void;
    initType: number;
}

const operatorList = ["and", "or"];
export const OperatorType = ({ argsList, setResult, close, initType }: IOperatorProps) => {
    const [results, setResults] = useState<{ value: IResult; id: number }[]>([
        { id: 0, value: undefined },
        { id: 1, value: undefined },
    ]);

    const [value, setValue] = useState<IResult>(false);
    const [type, setType] = useState(initType);

    const func = useCallback(
        (a: IResult, b: IResult) => {
            if (a === undefined) return b;
            if (b === undefined) return a;
            if (type === 1) return a || b;
            return a && b;
        },
        [type]
    );

    useEffect(() => {
        setValue(results.reduce<IResult>((previousValue, currentValue) => func(previousValue, currentValue.value), undefined));
    }, [func, results]);

    useEffect(() => {
        setResult(value);
    }, [setResult, value]);

    const onChangeTypeHandler: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
        (e) => {
            const newValue = Number(e.target.value);
            if (newValue === 2 && Object.keys(argsList).length === 0) return;
            setType(newValue);
        },
        [argsList]
    );

    const updateResult = useCallback((newValue: IResult, id?: number) => {
        if (id === undefined) return;
        setResults((prevResults) => {
            return prevResults.map((val) => {
                if (val.id !== id) return val;
                return { ...val, value: newValue };
            });
        });
    }, []);

    const removeOperator = useCallback((id?: number) => {
        if (id === undefined) return;
        setResults((prevResults) => {
            if (prevResults.length < 3) return prevResults;
            return prevResults.filter((val) => val.id !== id);
        });
    }, []);

    const addOp = useCallback(() => {
        setResults((prevResults) => {
            const newValue = {
                id: prevResults[prevResults.length - 1].id + 1,
                value: undefined,
            };
            return [...prevResults, newValue];
        });
    }, []);

    return (
        <>
            <select onChange={onChangeTypeHandler}>
                {operatorList.map((val, index) => (
                    <option key={index} selected={index === type} value={index}>
                        {val}
                    </option>
                ))}
            </select>
            <button onClick={() => close()}>x</button>
            <br />
            {results.map(({ id }) => (
                <Operation key={id} id={id} close={removeOperator} argsList={argsList} setResult={updateResult} />
            ))}
            <br />
            <button onClick={addOp}>+ add op</button>
        </>
    );
};
