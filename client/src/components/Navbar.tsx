import { useAuth } from "../context/useAuth";

function Navbar({header}:{header:string}) {
    const {handleLogout} = useAuth();
  return (
    <>
        <div className="w-full">
            <div className="w-full">
                <img className="w-full object-fill md:h-auto" src="Header-bg.svg" alt="" />
                <div className="w-full flex justify-between items-center fixed top-4 md:top-10 px-8"> 
                    <div className="flex justify-center items-center">
                        <p className="text-white text-2xl font-semibold">{header}</p>
                    </div>
                    <div className="hidden md:block">
                        <img src="Logo.svg" alt="Logo" className="" />
                    </div>
                    <div className="md:mr-32" onClick={handleLogout}>
                        <img src="Logout.svg" alt="Profile" className="block md:hidden cursor-pointer " />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar