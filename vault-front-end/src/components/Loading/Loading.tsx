import { tailspin } from 'ldrs';

tailspin.register();

interface Props {
    isSignContract?: boolean;
}

const Loading = ({ isSignContract }: Props) => {
    return (
        <div className={`w-full h-full bg-bgButton grid place-items-center ${isSignContract && '!bg-[#00000099]'}`}>
            <l-tailspin size="60" stroke="5" speed="0.9" color="white"></l-tailspin>
        </div>
    );
};

export default Loading;

// Default values shown
