const IconDot = ({ fill = '#A19D98', height = 9, width = 9 }: { fill?: string; width?: number; height?: number }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 9 9" fill="currentColor">
            <circle cx="4.74286" cy="4.08569" r={4} fill={fill} className="group-hover:fill-[#12B86A]" />
        </svg>
    );
};

export default IconDot;
