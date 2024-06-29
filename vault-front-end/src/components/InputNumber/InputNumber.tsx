import { InputHTMLAttributes, forwardRef, useMemo, useState } from 'react';
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    errorsMessage?: string;
    classNameInput?: string;
    classNameError?: string;
    localValue: string;
    myMoney?: string;
    setLocalValue: React.Dispatch<React.SetStateAction<string>>;
    name: 'deposit' | 'withdraw';
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
    {
        className,
        errorsMessage,
        classNameInput = 'block w-full p-3 h-[45px] text-white rounded-[8px] bg-[#161b26] text-[14px] font-medium border border-[#d0d5dd] outline-none',
        classNameError = 'mt-1 text-red-600 min-h-[20px] text-sm',
        onChange,
        localValue,
        setLocalValue,
        value = '',
        myMoney = '0',
        ...rest
    },
    ref,
) {
    // const { setValue } = useFormContext();
    const [prevValue, setPrevValue] = useState('');

    const handleChange = (event: any) => {
        const value = event.target.value.replace(/,/g, '');
        if (/^\d*\.?\d*$/.test(value) || value === '') {
            if (value.includes('.')) {
                const [integer, decimal]: [integer: string, decimal: string] = value.split('.');
                if (integer.length <= 9 && decimal.length <= 6) {
                    onChange && onChange(value);
                    setLocalValue(value);
                }
            } else {
                if (value.length <= 9) {
                    onChange && onChange(value);
                    setLocalValue(value);
                } else {
                    return prevValue;
                }
            }
        }
    };

    const calculatedValue = useMemo(() => {
        const _value = typeof value === 'undefined' ? localValue : String(value);
        if (_value === '') {
            return _value;
        }
        if (_value.includes('.')) {
            const [integer, decimal] = _value.split('.');
            if (integer.length <= 9 && decimal.length <= 6) {
                if (integer === '') {
                    setPrevValue(`.${decimal}`);
                    return `.${decimal}`;
                }
                setPrevValue(`${Number(integer).toLocaleString('en-US')}.${decimal}`);
                return `${Number(integer).toLocaleString('en-US')}.${decimal}`;
            }
            return prevValue;
        }
        if (_value.length <= 9) {
            setPrevValue(Number(_value).toLocaleString('en-US'));
            return Number(_value).toLocaleString('en-US');
        } else {
            return prevValue;
        }
    }, [localValue, value, prevValue, setPrevValue]);

    // const handleSetMaxDeposit = () => {
    //     setValue(name, myMoney);
    //     setLocalValue(Number(myMoney).toLocaleString());
    //     setPrevValue(Number(myMoney).toLocaleString());
    // };
    return (
        <div className={className}>
            <div className="relative">
                <input
                    type="text"
                    className={classNameInput}
                    {...rest}
                    value={calculatedValue}
                    onChange={handleChange}
                    ref={ref}
                />
                {/* <button
                    type="button"
                    onClick={handleSetMaxDeposit}
                    className="absolute top-[50%] translate-y-[-50%] right-4 text-[14px] rounded-2xl text-accent_3 font-semibold bg-transparent"
                >
                    Max
                </button> */}
            </div>
            {/* <input type="text" className={classNameInput} value={localValue} onChange={handleChange} /> */}
            {<div className={classNameError}>{errorsMessage}</div>}
            <div className="text-[14px]">Balance Available: {myMoney || 0}</div>
        </div>
    );
});

export default InputNumber;
