import SidebarItem from "./SidebarItem";
import { StateContext } from "../Context API/StateContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { LiaBookReaderSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import favicon from "../assets/favicon.ico";

export const Sidebar = () => {
    const { isHome, isAssignments, isSubmissions, setHome, setAssignments, setSubmissions } = useContext(StateContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const HomeIcon = () => <FaHome className="w-6 h-6" />;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleHomeClick = () => {
        setHome(true);
        setAssignments(false);
        setSubmissions(false);
        setIsSidebarOpen(false);
    };

    const handleAssignmentClick = () => {
        setHome(false);
        setAssignments(true);
        setSubmissions(false);
        setIsSidebarOpen(false);
        
    };

    const handleSubmissionsClick = () => {
        setHome(false);
        setAssignments(false);
        setSubmissions(true);
        setIsSidebarOpen(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            {!isSidebarOpen && (
                <div className="md:hidden fixed top-4 left-4 z-40">
                    <button
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        onClick={toggleSidebar}
                        aria-label="Open menu"
                    >
                        <RxHamburgerMenu className="w-6 h-6 text-blue-400" />
                    </button>
                </div>
            )}

            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div
                className={`bg-gray-900 border-r border-gray-700 min-h-screen w-72 fixed md:relative transform transition-transform duration-300 ease-in-out z-40 md:z-0 ${
                    isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
                } md:translate-x-0 md:shadow-md`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-5 flex justify-between items-center border-b border-gray-800">
                        <div
                            onClick={handleHomeClick}
                            className="text-2xl font-bold flex items-center cursor-pointer"
                        >
                            {/* <img
                                src={favicon}
                                alt="Assessly Logo"
                                className="w-8 h-8 mr-2"
                            /> */}
                            <span className="text-blue-400 font-semibold">Assessly</span>
                        </div>
                        {isSidebarOpen && (
                            <div className="md:hidden block">
                                <button
                                    className="p-2 hover:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    onClick={toggleSidebar}
                                    aria-label="Close menu"
                                >
                                    <IoCloseOutline className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col flex-grow justify-between">
                        <nav className="p-5 space-y-1">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 pl-4">Main Menu</div>
                            <SidebarItem
                                onClick={handleHomeClick}
                                icon={<HomeIcon />}
                                text="Home"
                                active={isHome}
                            />
                            <SidebarItem
                                onClick={handleAssignmentClick}
                                icon={<LuNotebookPen className="w-6 h-6" />}
                                text="Assignments"
                                active={isAssignments}
                            />
                            <SidebarItem
                                onClick={handleSubmissionsClick}
                                icon={<LiaBookReaderSolid className="w-6 h-6" />}
                                text="Submissions"
                                active={isSubmissions}
                            />
                        </nav>

                        <div className="p-5 border-t border-gray-800">
                            <SidebarItem
                                onClick={handleLogoutClick}
                                icon={<AiOutlineLogout className="w-6 h-6" />}
                                text="Logout"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;