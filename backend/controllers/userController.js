import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Tạo token JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Đăng nhập
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User does not exist"})

        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:"Invaild credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true, token})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
};

// Đăng ký
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Kiểm tra user đã tồn tại chưa
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Kiểm tra email và độ mạnh của mật khẩu
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Băm mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        // Lưu user vào DB
        const user = await newUser.save();

        // Tạo token
        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error occurred" });
    }
};

export { loginUser, registerUser };
