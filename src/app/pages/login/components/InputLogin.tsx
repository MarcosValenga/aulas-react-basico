import React from "react";

interface IInputLoginProps {
    label: string;
    value: string;
    typeInput: string;

    onChange: (newValue: string) => void;
    onPressEnter?: () => void;
}

export const InputLogin = React.forwardRef<HTMLInputElement, IInputLoginProps>((props, ref) => {
    return (
        <label htmlFor="">
            <span>{props.label}</span>
            <input
                ref={ref}
                value={props.value}
                type={props.typeInput}
                onChange={e => props.onChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter' 
                ? props.onPressEnter && props.onPressEnter()  
                : undefined} />
        </label>
    )
});