const db = require("../models");

const Administrator = db.administrator;
const User = db.user;
const Verification = db.verification;

const createAdministrator = async (req, res) => {
    try {
        // Create the user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: "administrator",
        });

        // Create the administrator with the created user's user_id
        const administrator = await Administrator.create({
            user_id: user.user_id,
            company_id: req.body.company_id,
        });

        const verification = await Verification.create({
            user_id: user.user_id,
        });

        return res.status(200).json({
            status: "success",
            message: "Administrator and user created successfully",
            data: {
                user_id: user.user_id,
                administrator_id: administrator.user_id,
                company_id: administrator.company_id,
                is_verified: verification.is_verified,
            },
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null,
        });
    }
};

const getAdministrator = async (req, res) => {
    try {
        const administrator = await Administrator.findOne({
            where: {
                user_id: req.params.user_id,
            },
            attributes: [
                "user_id",
                "company_id",
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        "name",
                        "email",
                    ],
                },
            ],
        });

        return res.status(200).json({
            status: "success",
            message: "Administrator retrieved successfully",
            data: administrator,
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null,
        });
    }
};

// Export controller
module.exports = {
    createAdministrator,
    getAdministrator,
};
