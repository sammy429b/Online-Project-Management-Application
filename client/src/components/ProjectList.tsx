import { Search } from "lucide-react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";

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

  const handleStatusChange = async (id:string, status:string) => {
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

  const handleSortChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="w-[90%] h-screen mx-8 px-6 bg-white rounded-lg fixed top-32">
        <div className="flex justify-between items-center p-4">
          <div className="max-w-sm w-full">
            <label className=" flex items-center gap-2 border-b-2 border-gray-300 pb-2 w-full max-w-md">
              <Search className="text-gray-400" />
              <input
                type="search"
                className="grow border-none outline-none w-full max-w-md"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>
          </div>
          <div>
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

        <div className="w-full py-8">
          <table className="min-w-full bg-white border-gray-200 rounded-md">
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
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project._id}>
                  <td className="px-6 py-4 border-b border-gray-200">{project.projectTheme}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.reason}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.type}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.division}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.category}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.priority}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.department}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.location}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{project.status}</td>
                  <td className="px-2 py-4 border-b border-gray-200">
                    <button className="bg-primary text-white w-20 h-6 rounded-xl" onClick={() => handleStatusChange(project._id, "Running")}>Start</button>
                  </td>
                  <td className="px-2 py-4 border-b border-gray-200">
                    <button className="w-20 h-6 text-primary border-primary border rounded-xl" onClick={() => handleStatusChange(project._id, "Closed")}>Close</button>
                  </td>
                  <td className="px-2 py-4 border-b border-gray-200">
                    <button className="w-20 h-6 text-primary border-primary border rounded-xl" onClick={() => handleStatusChange(project._id, "Cancelled")}>Cancel</button>
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
