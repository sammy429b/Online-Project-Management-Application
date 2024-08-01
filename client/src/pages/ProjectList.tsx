import { AlignLeft, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import dateTransform from "../utils/DateTransform";

const FilterType = ["Priority", "Category", "Reason", "Division", "Department",];

export interface Project {
  _id: string;
  projectTheme: string;
  reason: string;
  type: string;
  division: string;
  category: string;
  priority: string;
  department: string;
  startDate: string;
  endDate: string;
  location: string;
  status: string;
}

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string>("Priority");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);

  const handleIncrement = () => {
    if (endIndex >= filteredProjects.length) return;
    const newEndIndex = Math.min(endIndex + 5, filteredProjects.length);
    setStartIndex(startIndex + 5);
    setEndIndex(newEndIndex);
  }

  const handleDecrement = () => {
    if (startIndex <= 0) return;
    const newStartIndex = Math.max(startIndex - 5, 0);
    setStartIndex(newStartIndex);
    setEndIndex(startIndex);
  }


  // Fetch project list
  const getProject = async () => {
    try {
      const response = await axios.get(ApiConfig.API_PROJECT_LIST_URL, {
        withCredentials: true,

      });
      setProjects([...response.data.projects]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  const handleSortChange = (field: string) => {
    // Toggle sort order if the same field is clicked again
    if (field === sortField) {
      setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc"); // Default to ascending order when changing the sort field
    }
  };

  // fucntion to sort the projects based on the selected field

  const sortedProjects = [...projects].sort((a, b) => {
    let valueA = a[sortField.toLowerCase() as keyof Project];
    let valueB = b[sortField.toLowerCase() as keyof Project];

    const sortMaps: { [key: string]: { [key: string]: number } } = {
      priority: { low: 1, medium: 2, high: 3 },
      category: { "quality a": 1, "quality b": 2, "quality c": 3, "quality d": 4 },
      reason: { business: 1, dealership: 2, transport: 3 },
      division: { compressor: 1, filters: 2, pumps: 3, glass: 4, "water heater": 5 },
      department: { strategy: 1, finance: 2, quality: 3, maintenance: 4, stores: 5 },
      location: { pune: 1, delhi: 2, mumbai: 3 },
      status: { registered: 1, running: 2, closed: 3, cancelled: 4 }
    };

    if (sortMaps[sortField.toLowerCase()]) {
      valueA = (sortMaps[sortField.toLowerCase()][valueA.toLowerCase()] ?? 0).toString();
      valueB = (sortMaps[sortField.toLowerCase()][valueB.toLowerCase()] ?? 0).toString();

    } else {
      valueA = valueA?.toString().toLowerCase() ?? "";
      valueB = valueB?.toString().toLowerCase() ?? "";
    }

    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if (valueA < valueB) {
      comparison = -1;
    }

    return sortOrder === "desc" ? comparison * -1 : comparison;
  });

  // Update project status
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await axios.put(ApiConfig.API_UPDATE_PROJECT_STATUS_URL, { id, status }, {
        withCredentials: true,
      });
      if (response.data.success) {
        alert("Project status updated successfully.");

        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === id ? { ...project, status } : project
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter projects based on search term
  const filteredProjects = sortedProjects.filter((project) =>
    Object.values(project).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <Navbar header={"Project Listing"} />
      <div className="w-full md:w-[90%] h-screen mx-0 md:mx-8 px-6 md:bg-white rounded-lg fixed top-16 md:top-32 overflow-scroll md:overflow-hidden scrollbar">
        <div className="flex justify-between items-center p-4">
          <div className="max-w-sm w-full">
            <label className=" flex items-center gap-2 border-b-2 border-gray-300 pb-2 w-full max-w-md">
              <Search className="text-gray-400" />
              <input
                type="search"
                className="grow border-none outline-none w-full max-w-md bg-slate-200 md:bg-white"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>
          </div>
          <div className="block md:hidden">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="text-gray-400" onClick={() => {
              const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              }
            }}><AlignLeft /></button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-full h-screen">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                {FilterType.map((type) => (
                  <div className="form-control mt-2" key={type}>
                    <label className="label cursor-pointer">
                      <span className="label-text text-[16px]">{type}</span>
                      <input
                        type="checkbox"
                        value={type}
                        id={type}
                        name="filter"
                        className="checkbox text-[16px]"
                        onChange={(e) => handleSortChange(e.target.value)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </dialog>
          </div>
          <div className="hidden md:block">
            <label className="flex items-center gap-x-4 justify-center w-full max-w-md">
              <span className="text-gray-400">Sort By :</span>
              <select
                className="select select-ghost max-w-xs"
                value={sortField}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                {FilterType.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>
        </div>


        {/* Card for Mobile view */}
        <div className="mb-52 block md:hidden">
          {filteredProjects.map((project) => (
            <div className="bg-white p-4 mb-4 rounded" key={project._id}>
              <div className="flex justify-between mb-4">
                <div >
                  <h2 className="font-semibold">{project.projectTheme}</h2>
                  <p className="text-sm text-gray-400 font-normal">{dateTransform(project.startDate)} to {dateTransform(project.endDate)}</p>
                </div>
                <div>
                  <p className="font-medium text-sm">{project.status}</p>
                </div>
              </div>
              <div>
                <p><span className="text-sm text-gray-400">Reason: </span><span className="text-sm">{project.reason}</span></p>
                <p><span><span className="text-sm text-gray-400">Type: </span><span className="text-sm">{project.type}</span></span>
                  <span> <span className="text-sm text-gray-400">Category: </span><span className="text-sm">{project.category}</span></span>
                </p>
                <p><span><span className="text-sm text-gray-400">Div: </span><span className="text-sm">{project.division}</span></span>
                  <span> <span className="text-sm text-gray-400">Dept: </span><span className="text-sm">{project.department}</span></span>
                </p>
                <p><span className="text-sm text-gray-400">Location: </span><span className="text-sm">{project.location}</span></p>
                <p><span className="text-sm text-gray-400">Priority: </span><span className="text-sm">{project.priority}</span></p>
              </div>
              <div className="flex justify-around items-center gap-x-4 mt-4">
                <button className="bg-primary text-white w-24 h-8 rounded-2xl" onClick={() => handleStatusChange(project._id, "Running")}>Start</button>
                <button className="w-24 h-8 rounded-2xl text-primary border-primary border" onClick={() => handleStatusChange(project._id, "Closed")}>Close</button>
                <button className="w-24 h-8 rounded-2xl text-primary border-primary border" onClick={() => handleStatusChange(project._id, "Cancelled")}>Cancel</button>
              </div>
            </div>
          ))}
        </div>

        {/* Table for desktop view */}
        <div className="w-full py-8">
          <table className="w-full bg-white border-gray-200 rounded-md hidden md:block">
            <thead className="w-full">
              <tr className="bg-gray-200 text-left text-sm font-medium text-gray-700">
                <th className="px-6 py-3 border-b border-gray-200">Project Theme</th>
                <th className="px-6 py-3 border-b border-gray-200">Reason</th>
                <th className="px-6 py-3 border-b border-gray-200">Type</th>
                <th className="px-6 py-3 border-b border-gray-200">Division</th>
                <th className="px-6 py-3 border-b border-gray-200">Category</th>
                <th className="px-6 py-3 border-b border-gray-200">Priority</th>
                <th className="px-6 py-3 border-b border-gray-200">Department</th>
                <th className="px-6 py-3 border-b border-gray-200">Location</th>
                <th className="px-6 py-3 border-b border-gray-200">Status</th>
                <th className="px-6 py-3 border-b border-gray-200"> </th>
                <th className="px-6 py-3 border-b border-gray-200"> </th>
                <th className="px-6 py-3 border-b border-gray-200"> </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredProjects.slice(startIndex, endIndex).map((project) => (
                <tr key={project._id}>
                  <td className="w-80 px-0 py-4 border-b border-gray-200">{project.projectTheme}
                    <p className="text-sm  text-gray-400 font-normal">{dateTransform(project.startDate)} to {dateTransform(project.endDate)}</p>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.reason}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.type}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.division}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.category}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.priority}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.department}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.location}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.status}</td>
                  <td className="px-1 py-4 border-b border-gray-200">
                    <button className="bg-primary text-white w-20 h-8 rounded-2xl" onClick={() => handleStatusChange(project._id, "Running")}>Start</button>
                  </td>
                  <td className="px-1 py-4 border-b border-gray-200">
                    <button className="w-20 h-8 rounded-2xl text-primary border-primary border " onClick={() => handleStatusChange(project._id, "Closed")}>Close</button>
                  </td>
                  <td className="px-1 py-4 border-b border-gray-200">
                    <button className="w-20 h-8 rounded-2xl text-primary border-primary border " onClick={() => handleStatusChange(project._id, "Cancelled")}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* pagination buttons */}
          <div className="fixed bottom-4 ">
            <button className="btn btn-ghost w-20 h-8 rounded-2xl" onClick={handleDecrement}>Prev</button>
            <button className={`btn btn-ghost w-20 h-8 rounded-2xl }`} onClick={handleIncrement}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectList;
