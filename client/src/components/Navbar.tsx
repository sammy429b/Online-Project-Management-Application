
function Navbar({header}) {
  return (
    <>
        <div className="w-full">
            <div className="w-full">
                <img className="w-full" src="Header-bg.svg" alt="" />
                <div className="w-full flex justify-between items-center fixed top-10 px-8"> 
                    <div>
                        <p className="text-white text-2xl font-semibold">{header}</p>
                    </div>
                    <div>
                        <img src="Logo.svg" alt="Logo" />
                    </div>
                    <div className="mr-32">
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar