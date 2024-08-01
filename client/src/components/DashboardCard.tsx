
interface DashboardCardProps {
    data: string[];
}

function DashboardCard({ data }: DashboardCardProps) {
    return (
        <>
            <div
                className="bg-white w-36 md:w-64 h-24 flex items-start shadow-lg rounded-lg overflow-hidden mx-1"
            >
                <div className="px-[0.175rem] h-full bg-[#0CC9E8]"></div>
                <div className="pl-4 pt-2">
                    <h2 className="text-md font-medium text-[#474D52]">{data[0]}</h2>
                    <p className="text-[40px] font-semibold text-[#474D52]">{data[1]}</p>
                </div>
            </div>
        </>
    )
}

export default DashboardCard