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
                    ? "bg-blue-100 text-blue-800" // Active: light blue background, dark blue text
                    : "text-gray-700 hover:bg-blue-50" // Inactive: dark gray text, hover light blue bg
                }`}
        >
            <div className={`${props.active
                ? "text-blue-700" // Active icon: dark blue
                : "text-gray-500 group-hover:text-blue-700" // Inactive icon: medium gray, hover dark blue
            } transition-colors duration-200`}>
                {props.icon}
            </div>
            <span className={`text-base font-medium ${props.active
                ? "text-blue-800" // Active text: dark blue
                : "text-gray-700 group-hover:text-blue-800" // Inactive text: dark gray, hover dark blue
            } transition-colors duration-200`}>
                {props.text}
            </span>
        </div>
    );
};
export default SidebarItem;