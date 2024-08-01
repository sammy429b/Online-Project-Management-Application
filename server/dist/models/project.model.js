"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ProjectSchema = new mongoose_1.Schema({
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
        enum: ['Registered', 'Running', 'Closed', 'Cancelled'],
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
const Project = mongoose_1.default.model('Project', ProjectSchema);
exports.default = Project;
