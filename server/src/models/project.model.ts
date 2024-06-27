import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    projectTheme: string;
    reason: 'Business' | 'Dealership' | 'Transport';
    type: 'Internal' | 'External' | 'Vendor';
    division: 'Compressor' | 'Filters' | 'Pumps' | 'Glass' | 'Water Heater';
    category: 'Quality A' | 'Quality B' | 'Quality C' | 'Quality D';
    priority: 'Low' | 'Medium' | 'High';
    department: 'Strategy' | 'Finance' | 'Quality' | 'Maintenance' | 'Stores';
    startDate: Date;
    endDate: Date;
    location: 'Pune' | 'Delhi' | 'Mumbai';
}

const ProjectSchema: Schema = new Schema({
    projectTheme: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        enum: ['Business', 'Dealership', 'Transport'],
        required: true,
    },
    type: {
        type: String,
        enum: ['Internal', 'External', 'Vendor'],
        required: true,
    },
    division: {
        type: String,
        enum: ['Compressor', 'Filters', 'Pumps', 'Glass', 'Water Heater'],
        required: true,
    },
    category: {
        type: String,
        enum: ['Quality A', 'Quality B', 'Quality C', 'Quality D'],
        required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true,
    },
    department: {
        type: String,
        enum: ['Strategy', 'Finance', 'Quality', 'Maintenance', 'Stores'],
        required: true,
    },
    status: {
        type: String,
        default: 'Registered'
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        enum: ['Pune', 'Delhi', 'Mumbai'],
        required: true,
    }
}, {
    timestamps: true
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
