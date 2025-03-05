import DashboardIcon from "@/src/shared/icons/dashboard-icon";
import HeartIcon from "@/src/shared/icons/heart-icon";
import ProfileIcon from "@/src/shared/icons/profile-icon";

import { IBottomNavigatonButtonProps } from "./bottom-navigation-button.interface";

export const links: IBottomNavigatonButtonProps[] = [
    {
        icon: <DashboardIcon />,
        label: 'Dashboard',
    },
    {
        icon: <HeartIcon />,
        label: 'Map',
    },
    {
        icon: <ProfileIcon />,
        label: 'Settings',
    }
]