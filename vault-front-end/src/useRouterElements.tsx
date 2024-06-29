import { useRoutes } from 'react-router-dom';
import path from './constants/path';
import MainLayout from './Layouts/MainLayout';
import FarmsPage from './pages/FarmsPage';
import DashBoardPage from './pages/DashBoardPage';
import VaultDetail from './pages/VaultDetail';
import Controller from './pages/Controller';

const useRouterElements = () => {
    const routeElements = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: path.dashBoard,
                    element: <DashBoardPage />,
                },
                {
                    path: path.farms,
                    element: <FarmsPage />,
                },
                {
                    path: path.vaultDetail,
                    element: <VaultDetail />,
                },
                {
                    path: '/',
                    element: <FarmsPage />,
                },
                {
                    path: path.controller,
                    element: <Controller />,
                }
            ],
        },
    ]);
    return routeElements;
};

export default useRouterElements;
