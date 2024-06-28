import { AlignLeft, Search } from "lucide-react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import dateTransform from "../utils/DateTransform";

const FilterType = ["Priority", "Category", "Reason", "Division", "Department", "Location"];

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

  const getProject = async () => {
    try {
      const response = await axios.get(ApiConfig.API_PROJECT_LIST_URL);
      setProjects([...response.data.projects]);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getProject();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await axios.put(ApiConfig.API_UPDATE_PROJECT_STATUS_URL, { id, status });
      console.log(response.data);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === id ? { ...project, status } : project
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedField = e.target.value;
    setSortField(selectedField);
    // Toggle sort order
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter((project) =>
    Object.values(project).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <Navbar header={"Project Listing"} />
      <div className="w-[90%] h-screen mx-8 px-6 md:bg-white rounded-lg fixed top-32 overflow-scroll md:overflow-hidden scrollbar">
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
            <button className="text-gray-400" onClick={() => document.getElementById('my_modal_3').showModal()}><AlignLeft /></button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {FilterType.map((type) => (
                  <p key={type}>{type}</p>
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
                onChange={handleSortChange}
              >
                {FilterType.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mb-52 block md:hidden">

          {filteredProjects.map((project) => (
            <div className="bg-white p-4 mb-4 rounded ">
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


        <div className="w-full py-8">
          <table className="min-w-full bg-white border-gray-200 rounded-md hidden md:block">
            <thead>
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
                <th className="px-6 py-3 border-b border-gray-200"></th>
                <th className="px-6 py-3 border-b border-gray-200"></th>
                <th className="px-6 py-3 border-b border-gray-200"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredProjects.map((project) => (
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
        </div>
      </div>
    </>
  );
}

export default ProjectList;
