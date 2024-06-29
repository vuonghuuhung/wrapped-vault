import { useState } from 'react';
import IconSearch from 'src/assets/IconSearch';
import useGetValueSearch from 'src/state/valueSearch.ztd';

const InputSearch = () => {
    const [valueInput, setValueInput] = useState<string>('');
    const { setValueSearch } = useGetValueSearch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setValueInput(e.target.value);
        }
    };

    const handleSearch = () => {
        setValueSearch(valueInput.trim());
    };

    return (
        <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
            <input
                type="text"
                value={valueInput}
                onChange={handleChange}
                placeholder="Assets, platform"
                className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
            />
            <button
                onClick={handleSearch}
                className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
            >
                <IconSearch />
            </button>
        </div>
    );
};

export default InputSearch;
