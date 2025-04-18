import { ReactElement } from "react";

interface itemProps {
    text: string;
    icon: ReactElement;
    onClick?: () => void;
    active?: boolean;
}

const SidebarItem = (props: itemProps) => {
    return (
        <div
            onClick={props.onClick}
            className={`flex items-center space-x-3 py-3 px-4 cursor-pointer rounded-lg transition-all duration-200 group
                ${props.active
                    ? "bg-blue-900/30 text-blue-300" // Active: dark blue background, light blue text
                    : "text-gray-300 hover:bg-gray-800" // Inactive: light gray text, hover dark gray bg
                }`}
        >
            <div className={`${props.active
                ? "text-blue-400" // Active icon: light blue
                : "text-gray-400 group-hover:text-blue-400" // Inactive icon: medium gray, hover light blue
            } transition-colors duration-200`}>
                {props.icon}
            </div>
            <span className={`text-base font-medium ${props.active
                ? "text-blue-300" // Active text: light blue
                : "text-gray-300 group-hover:text-blue-300" // Inactive text: light gray, hover light blue
            } transition-colors duration-200`}>
                {props.text}
            </span>
        </div>
    );
};
export default SidebarItem;