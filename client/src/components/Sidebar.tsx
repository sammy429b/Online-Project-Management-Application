import { LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Sidebar() {
  const { handleLogout } = useAuth();
  const [active, setActive] = useState(() => {
    return localStorage.getItem('active') || 'Dashboard';
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Handle initial navigation based on active state
    if (active === 'Dashboard') {
      navigate('/');
    } else if (active === 'Project-list') {
      navigate('/project-list');
    } else if (active === 'Create-project') {
      navigate('/create-project');
    }
  }, [active, navigate]);

  const handleClick = (item, path) => {
    setActive(item);
    navigate(path);
    localStorage.setItem('active', item);
  };

  const renderItem = (item, activeImg, inactiveImg, path) => (
    <div
      key={item}
      onClick={() => handleClick(item, path)}
      className={`flex justify-center items-center cursor-pointer tooltip ${active === item ? 'relative' : ''}`}
      data-tip={item}
    >
      {active === item && (
        <div className="bg-[#025AAB] w-12 md:w-1 rounded-t-xl md:rounded-r-xl h-2 md:h-8 fixed bottom-0 md:bottom-auto left-auto md:left-0"></div>
      )}
      <img src={active === item ? activeImg : inactiveImg} alt={item} />
    </div>
  );

  return (
    <div className="w-full h-full md:h-screen gap-y-16 flex flex-row md:flex-col justify-around md:justify-evenly items-center">
      <div className="w-full gap-y-8 flex flex-row md:flex-col justify-around md:justify-center items-center">
        {renderItem('Dashboard', 'Dashboard-active.svg', 'Dashboard.svg', '/')}
        {renderItem('Project-list', 'Project-list-active.svg', 'Project-list.svg', '/project-list')}
        <div className="hidden md:block">
          <hr className="w-6 h-1 mx-auto bg-gray-300 border-0 rounded my-4 dark:bg-gray-700" />
        </div>
        {renderItem('Create-project', 'create-project-active.svg', 'create-project.svg', '/create-project')}
      </div>
      <div className="hidden md:block tooltip" data-tip="Logout" onClick={handleLogout}>
        <LogOut className="text-gray-400 hover:text-[#025AAB] transition-all" />
      </div>
    </div>
  );
}

export default Sidebar;
