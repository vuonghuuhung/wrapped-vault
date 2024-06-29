import { Link } from 'react-router-dom';
// import IconAnalyst from 'src/assets/IconAnalyst';
import IconDashboard from 'src/assets/IconDashboard';
import IconDiscord from 'src/assets/IconDiscord';
// import IconDoc from 'src/assets/IconDoc';
import IconFarms from 'src/assets/IconFarms';
import IconLogo from 'src/assets/IconLogo';
import IconMedium from 'src/assets/IconMedium';
// import IconTutorial from 'src/assets/IconTutorial';
import IconTwitter from 'src/assets/IconTwitter';
import ConnectButtonCst from 'src/components/ConnectButtonCst';
import path from 'src/constants/path';

const SideNav = () => {
    const listNav = [
        {
            icon: <IconDashboard />,
            name: 'All Farms',
            to: path.farms,
        },
        {
            icon: <IconFarms />,
            name: 'Controller',
            to: path.controller,
        }
    ];

    // const listDoc = [
        // {
        //     icon: <IconAnalyst />,
        //     name: 'Analytics',
        //     to: path.dashBoard,
        // },
        // {
        //     icon: <IconTutorial />,
        //     name: 'Tutorial',
        //     to: path.dashBoard,
        // },
        // {
        //     icon: <IconDoc />,
        //     name: 'Docs',
        //     to: path.dashBoard,
        // },
    // ];

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <Link to={path.dashBoard} className="flex items-center justify-start">
                    <div>
                        <IconLogo />
                    </div>
                    <div className="text-[24px] ml-[22px] font-semibold">Vaults</div>
                </Link>
                <div className="my-[25px]">
                    <ConnectButtonCst />
                </div>
                <div>
                    {listNav.map((item, index) => (
                        <Link
                            key={index}
                            to={item.to}
                            className="group mb-[10px] flex items-center justify-start text-white hover:text-colorGreenText py-2 px-3"
                        >
                            {item.icon}
                            <div className="text-current h-[100%] pt-[3px] font-semibold ml-3">{item.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
            {/* <div>
                {listDoc.map((item, index) => (
                    <Link
                        key={index}
                        to={item.to}
                        className="group mb-[10px] flex items-center justify-start text-white hover:text-colorGreenText py-2 px-3"
                    >
                        {item.icon}
                        <div className="group-hover:text-colorGreenText h-[100%] pt-[3px] font-semibold ml-3 transition-all duration-250">
                            {item.name}
                        </div>
                    </Link>
                ))}

                <div className="mb-[40px] mt-[15px] flex items-center justify-start gap-2 ml-[15px]">
                    <div className="bg-bgSocial w-[30px] cursor-pointer h-[30px] grid place-items-center rounded-[5px]">
                        <IconDiscord />
                    </div>
                    <div className="bg-bgSocial w-[30px] cursor-pointer h-[30px] grid place-items-center rounded-[5px]">
                        <IconTwitter />
                    </div>
                    <div className="bg-bgSocial w-[30px] cursor-pointer h-[30px] grid place-items-center rounded-[5px]">
                        <IconMedium />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default SideNav;
