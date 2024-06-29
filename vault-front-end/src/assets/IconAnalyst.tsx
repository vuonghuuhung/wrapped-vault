const IconAnalyst = ({ width = 24, height = 24 }: { width?: number; height?: number }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 20 23"
            fill="none"
            className="mdl-js"
        >
            <path
                d="M19 4.19043C19 5.84728 14.9706 7.19043 10 7.19043C5.02944 7.19043 1 5.84728 1 4.19043M19 4.19043C19 2.53358 14.9706 1.19043 10 1.19043C5.02944 1.19043 1 2.53358 1 4.19043M19 4.19043V18.1904C19 19.8504 15 21.1904 10 21.1904C5 21.1904 1 19.8504 1 18.1904V4.19043M19 11.1904C19 12.8504 15 14.1904 10 14.1904C5 14.1904 1 12.8504 1 11.1904"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:!stroke-[#15b088] stroke-current"
            />
        </svg>
    );
};

export default IconAnalyst;
