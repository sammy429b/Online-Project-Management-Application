import { Request, Response } from 'express';
import Project from '../models/project.model';

interface projectType {
    projectTheme: string,
    reason: string,
    type: string,
    division: string,
    category: string,
    priority: string,
    department: string,
    startDate: Date,
    endDate: Date,
    location: string
}

export const createProjectController = async (req: Request, res: Response) => {
    try {
        const { projectTheme, reason, type, division, category, priority, department, startDate, endDate, location } = req.body as projectType;

        if (!projectTheme || !reason || !type || !division || !category || !priority || !department || !startDate || !endDate || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProject = new Project({
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
        })

        await newProject.save();

        res.status(201).json({ message: "Project created successfully.", project: newProject });
    } catch (error) {
        console.log("error in createProject", error)
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getProjectController = async (req: Request, res: Response) => {
    try {
        
        const projects = await Project.find({});
        res.status(200).json({ projects });

    } catch (error) {
        console.log("error in createProject", error)
        res.status(500).json({ message: "Internal server error" });
    }
}


export const updateProjectStatusController = async (req: Request, res: Response) => {
    try {
        const { status, id } = req.body;

        if (!status || !id) {
            return res.status(400).json({ message: "Status & id are required" });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.status = status;

        await project.save();

        res.status(200).json({ message: "Project status updated successfully", project });

    } catch (error) {
        console.log("error in createProject", error)
        res.status(500).json({ message: "Internal server error" });
    }
}