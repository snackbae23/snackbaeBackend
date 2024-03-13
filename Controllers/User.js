const User = require("../models/User");
const Profile = require("../models/Profile");
exports.FindUserByNumber = async (req, res) => {
    const ph = req.query.search;
    const user = await User.find({ contactNumber: ph }).populate("additionalDetails").exec();
    res.send(user);
}

exports.createUser = async (req, res) => {
    const { ph } = req.body;

    try {
        const data = new User({ contactNumber : ph });
        const savedData = await data.save();

        res.status(201).json({
            success: true,
            savedData,
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

exports.createProfile = async (req, res) => {
    const ph = req.query.search;
    const {
        profileImage,
        fullName,
        gender,
        dob,
        email,
        foodPreference,
        anniversary,
    } = req.body;

    try { 
        const profileDetails = new Profile({
        image:profileImage,
        fullName,
        gender,
        dateOfBirth:dob,
        email,
        foodPreference,
        anniversary,
        });

        const data = await profileDetails.save();

        const user = await User.findOneAndUpdate(
            {contactNumber:ph},
            {additionalDetails : data._id},
            {new:true},
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          res.status(201).json(data);
    }
    catch(err)
    {
        res.status(400).json({
            message: err.message });
    }
}