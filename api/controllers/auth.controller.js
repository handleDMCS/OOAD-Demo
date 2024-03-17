import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { firstname, lastname, username, password } = req.body;
    // console.log(req.body);

    try {
        if (!firstname || !lastname || !username || !password) {
            return next(errorHandler(400, "Please fill in all fields"));
        }

        const existingUser = await User.findOne({username});
        if (existingUser) {
            return next(errorHandler(400, "Username already exists"));
        }

        const avatar = `https://avatar.iran.liara.run/username?username=${firstname}+${lastname}`;
        const hashedPassword = bcryptjs.hashSync(password, 10);

        await User.create({
            firstname,
            lastname,
            username,
            password: hashedPassword,
            avatar,
        });

        res.status(201).json("User created successfully");
    }
    catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return next(errorHandler(400, "Please fill in all fields"));
        }

        const user = await User.findOne({username});
        if (!user) {
            return next(errorHandler(400, "Invalid credentials"));
        }

        const isMatch = bcryptjs.compareSync(password, user.password);
        if (!isMatch) {
            return next(errorHandler(400, "Invalid credentials"));
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie("access_token", token, {httpOnly: true})
            .status(200)
            .json("User logged in successfully");
    }
    catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        // clear the cookie
        res.clearCookie("access_token");
        res.status(200).json("User logged out successfully");
    }
    catch (error) {
        next(error);
    }
}
