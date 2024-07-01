import { Request, Response } from 'express';
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import { JWTsign } from '../utils/JWT';


interface loginType {
    email: string,
    password: string
}

interface registerType {
    username: string,
    email: string,
    password: string
}

export const registerController = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body as registerType;

        if (!username || !email || !password) {
            return res.status(400).json({ "message": "Username or password missing in request" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exist with this email" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save();

        res.status(201).json({ message: "User created successfully.", user: newUser });
    } catch (error) {
        console.log("error in register", error)
        res.status(500).json({ message: "Internal server error" });
    }
}



export const loginController = async (req: Request, res: Response) => {
    try {
        res.setHeader('setHeader', 'application/json')
        const { email, password } = req.body as loginType;
        if (!email || !password) {
            return res.status(401).json({ "message": "Username or password missing in request" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(200).json({ Success: false, Message: "Invalid User" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return res.status(200).json({ Success: false, Message: "Invalid User" });
        }


        const token = JWTsign(existingUser._id.toString())

        if (!token) {
            return res.status(500).json({ message: "Could not generate token" });
        }

        res.cookie('token', token, {
            sameSite: 'lax',
            httpOnly: true,
        });

        res.status(200).json({ Success: true, Message: "Valid User", token });

    } catch (error) {
        console.error("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const logoutController = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
