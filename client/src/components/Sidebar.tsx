import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const [active, setActive] = useState("Dashboard");
    const navigate = useNavigate();

    const handleClick = (item, path) => {
        setActive(item);
        navigate(path);
    };

    const renderItem = (item, activeImg, inactiveImg, path) => (
        <div 
            onClick={() => handleClick(item, path)} 
            className={`flex justify-center items-center cursor-pointer ${active === item ? 'relative' : ''}`}
        >
            {active === item && <div className='bg-[#044E92] w-12 md:w-1 rounded-t-xl md:rounded-r-xl h-2 md:h-8 fixed bottom-0 md:bottom-auto left-auto md:left-0'></div>}
            <img src={active === item ? activeImg : inactiveImg} alt={item} />
        </div>
    );

    return (
        <div className="w-full h-full md:h-screen gap-y-6  flex flex-row md:flex-col justify-around md:justify-center items-center">
            {renderItem("Dashboard", "Dashboard-active.svg", "Dashboard.svg", "/")}
            {renderItem("Project-list", "Project-list-active.svg", "Project-list.svg", "/project-list")}
            <div className="hidden md:block">
                <hr className="w-6 h-1 mx-auto bg-gray-300 border-0 rounded my-4 dark:bg-gray-700" />
            </div>
            {renderItem("Create-project", "create-project-active.svg", "create-project.svg", "/create-project")}
        </div>
    );
}

export default Sidebar;
