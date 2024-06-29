import { Outlet, useMatch } from 'react-router-dom';
import SideNav from '../components/SideNav';
import path from 'src/constants/path';

const MainLayout = () => {
    const isVaultDetail = useMatch(path.vaultDetail);
    return (
        <main className="min-h-screen w-full flex">
            <div className="w-[280px] p-[25px] bg-bgNav min-h-full fixed top-0 left-0 bottom-0">
                <SideNav />
            </div>
            <div className={`ml-[280px] flex-1 ${!isVaultDetail && 'px-[100px] pt-[100px] pb-[50px]'} bg-bgMain`}>
                <Outlet />
            </div>
        </main>
    );
};

export default MainLayout;
