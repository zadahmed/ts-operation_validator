import React, { useCallback, useEffect, useState } from "react";

type IResult = boolean | undefined;

interface IConstantProps {
    setResult: (newValue: IResult, id?: number) => void;
    close: (id?: number) => void;
}

export const ConstantType = ({ setResult, close }: IConstantProps) => {
    const [value, setValue] = useState<IResult>(false);

    useEffect(() => {
        setResult(value);
    }, [setResult, value]);

    const onChangeValueHandler: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        const newValue = e.target.value === "true";
        setValue(newValue);
    }, []);

    return (
        <>
            <select onChange={onChangeValueHandler}>
                <option selected={value} value="true">
                    true
                </option>
                <option selected={!value} value="false">
                    false
                </option>
            </select>
            <button onClick={() => close()}>x</button>
            <br />
        </>
    );
};
