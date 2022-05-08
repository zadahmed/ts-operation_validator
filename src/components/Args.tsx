import React, { useCallback, useEffect, useState } from "react";
import { Arg, IArg } from "./Arg";

type IResult = boolean | undefined;

interface IArgsProps {
    argsList: { [key: number]: IArg };
    setArgsList: React.Dispatch<React.SetStateAction<IArg[]>>;
}

export const Args = ({ argsList, setArgsList }: IArgsProps) => {
    const updateArg = useCallback(
        (newArg: IArg) => {
            setArgsList((argsList) => {
                return { ...argsList, [newArg.id]: newArg };
            });
        },
        [setArgsList]
    );

    const addArg = useCallback(() => {
        setArgsList((argsList) => {
            const newArg = {
                name: "newarg",
                value: false,
                id: Object.keys(argsList).length,
            };
            return { ...argsList, [newArg.id]: newArg };
        });
    }, [setArgsList]);

    return (
        <>
            {Object.values(argsList).map((arg) => (
                <Arg key={arg.id} arg={arg} updateArg={updateArg} />
            ))}

            <button onClick={addArg}>+ add arg</button>
            <br />
        </>
    );
};
