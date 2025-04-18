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
            className={`flex items-center space-x-2 py-2 px-2 cursor-pointer 
                ${props.active ? "font-semibold" : "font-normal"}`} 
        >
            <div>
                {props.icon}
            </div>
            <span className="text-base">
                {props.text}
            </span>
        </div>
    );
};
export default SidebarItem;