"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartDataController = exports.projectCountController = exports.updateProjectStatusController = exports.getProjectController = exports.createProjectController = void 0;
const project_model_1 = __importDefault(require("../models/project.model"));
// Create Project Controller
const createProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectTheme, reason, type, division, category, priority, department, startDate, endDate, location } = req.body;
        if (!projectTheme || !reason || !type || !division || !category || !priority || !department || !startDate || !endDate || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProject = new project_model_1.default({
            projectTheme,
            reason,
            type,
            division,
            category,
            priority,
            department,
            startDate,
            endDate,
            location
        });
        yield newProject.save();
        res.status(201).json({ message: "Project created successfully.", project: newProject, success: true });
    }
    catch (error) {
        console.log("error in createProject", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createProjectController = createProjectController;
// Get Project Controller
const getProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_model_1.default.find({});
        res.status(200).json({ projects });
    }
    catch (error) {
        console.log("error in createProject", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getProjectController = getProjectController;
// Update Project Status Controller
const updateProjectStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, id } = req.body;
        if (!status || !id) {
            return res.status(400).json({ message: "Status & id are required" });
        }
        const project = yield project_model_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        project.status = status;
        yield project.save();
        res.status(200).json({ message: "Project status updated successfully", project, success: true });
    }
    catch (error) {
        console.log("error in createProject", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateProjectStatusController = updateProjectStatusController;
// Project Count Controller
const projectCountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let totalProjects = yield project_model_1.default.countDocuments({});
        let closedProjects = yield project_model_1.default.countDocuments({ status: "Closed" });
        let runningProjects = yield project_model_1.default.countDocuments({ status: "Running" });
        let cancelledProjects = yield project_model_1.default.countDocuments({ status: "Cancelled" });
        let delayedProjects = yield project_model_1.default.countDocuments({
            status: "Running",
            endDate: { $lt: new Date() }
        });
        res.status(200).json({
            "Total Project": totalProjects,
            Closed: closedProjects,
            Running: runningProjects,
            "Closure Delay": delayedProjects,
            Cancelled: cancelledProjects,
        });
    }
    catch (error) {
        console.error("error in projectCountController", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.projectCountController = projectCountController;
// Chart Data Controller
const chartDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentSuccess = yield project_model_1.default.aggregate([
            {
                $group: {
                    _id: '$department',
                    totalProjects: { $sum: 1 },
                    closedProjects: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'Closed'] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    department: '$_id',
                    totalProjects: 1,
                    closedProjects: 1,
                    successPercentage: {
                        $multiply: [{ $divide: ['$closedProjects', '$totalProjects'] }, 100]
                    }
                }
            }
        ]);
        res.status(200).json(departmentSuccess);
    }
    catch (error) {
        console.error('Error fetching department success data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.chartDataController = chartDataController;
