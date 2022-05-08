import React, { useCallback, useEffect, useState } from "react";
import { IArg } from "./Arg";
import { Args } from "./Args";
import { Operation } from "./Operation";

type IResult = boolean | undefined;

function OperationPage() {
    const [argsList, setArgsList] = useState<IArg[]>([
        {
            name: "My arg",
            id: 0,
            value: false,
        },
    ]);
    const [result, setResult] = useState<IResult>(undefined);
    const close = useCallback(() => {}, []);
    const updateResult = useCallback((value: IResult, id?: number) => {
        setResult(value);
    }, []);

    return (
        <>
            <Args argsList={argsList} setArgsList={setArgsList} />
            <br />
            <br />
            <br />

            <Operation setResult={updateResult} argsList={argsList} close={close} />
            <br />
            <br />
            <br />

            <p>{`result: ${result}`}</p>
        </>
    );
}

export default OperationPage;
