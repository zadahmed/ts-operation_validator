import React, { useCallback, useEffect, useState } from "react";

type IResult = boolean | undefined;

export interface IArg {
    name: string;
    value: boolean;
    id: number;
}

interface IArgProps {
    arg: IArg;
    updateArg: (newArg: IArg) => void;
}

export const Arg = ({ arg, updateArg }: IArgProps) => {
    const [name, setName] = useState(arg.name);
    const [value, setValue] = useState(arg.value);

    const onChangeNameHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setName(e.target.value);
    }, []);

    const onChangeValueHandler: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        setValue(e.target.value === "true");
    }, []);

    useEffect(() => {
        if (arg.name !== name) updateArg({ ...arg, name: name });
    }, [arg, name, updateArg]);

    useEffect(() => {
        if (arg.value !== value) updateArg({ ...arg, value: value });
    }, [arg, value, updateArg]);

    return (
        <>
            <input type="text" name="name" value={name} onChange={onChangeNameHandler} />
            <select onChange={onChangeValueHandler}>
                <option selected={value} value="true">
                    true
                </option>
                <option selected={!value} value="false">
                    false
                </option>
            </select>
            <br />
        </>
    );
};
