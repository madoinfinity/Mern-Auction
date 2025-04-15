import User from '../models/User.js';

export const login = async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    
    try {
        let user = await User.findOne({ Username: Username });

        if (!user || (user.Password !== Password)) {
            return res.status(400).json({ errors: "Invalid Credentials" });
        }

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Login Failed" });
    }
}

export const signup = async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    const ItemsOwned = 0;
    
    try {
        const user = new User({
            Username,
            Password,
            ItemsOwned
        });

        await user.save();
        res.status(200).json({ message: "Signup Successful" });
    }
    catch (error) {
        res.status(500).json({ error: "Signup Failed" });
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get users" });
    }
}


export const updateUser = async (req, res) => {
    const { Username, newPassword } = req.body;
    console.log("got req", req.body)
    try {
        let user = await User.findOne({ Username });

        if (!user) {
            return res.status(400).json({ errors: "User not found" });
        }

        user.Password = newPassword; // Update password
        await user.save();
        res.status(200).json({ message: "Password updated" });
    }
    catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Failed to update password" });
    }
}