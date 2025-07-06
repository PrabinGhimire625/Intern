import User from "../model/userModel.js"; //from the model
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

//user register API
export const userRegistration = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;  //postman  ....frontend
        console.log("username", username)
        console.log("email", email)
        //status code 
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, password must required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(404).json({ message: "Email is already!" })
        }

        const hashedPassword = await bcrypt.hash(password, 14); // password hashing
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        })
        res.status(200).json({ message: "User register successfully", data: newUser })

    } catch (err) {
        res.status(500).json({ error: "Internal server error" })

    }
}



//user login api
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;  //postman  ....frontend

        //status code 
        if (!email || !password) {
            return res.status(400).json({ message: "email, password must required" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const ismatch = await bcrypt.compare(password, existingUser.password);

        if (!ismatch) {
            return res.status(404).json({ message: "Password not matched" })
        }

        const payload = { id: existingUser.id, role: existingUser.role }
        const token = jwt.sign(payload, process.env.JWT_SECRETE, { expiresIn: "1h" });

        res.status(200).json({ message: "User login successfull", token, data: existingUser })

    } catch (err) {
        res.status(500).json({ error: "Internal server error" })

    }
}