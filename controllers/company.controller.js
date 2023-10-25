const db = require("../models");

const Company = db.company;
const User = db.user;
const Verification = db.verification;

const createCompany = async (req, res) => {
    try {
        // Create the user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: "company",
        });
        
        // Create the company
        const company = await Company.create({
            user_id: user.id,
        });

        // Create the verification
        // const verification = await Verification.create({
        //     user_id: user.user_id,
        // });

        return res.status(200).json({
            status: "success",
            message: "Company and user created successfully",
            data: {
                user_id: user.user_id,
                company_id: company.user_id,
                // is_verified: verification.is_verified,
            },
        });

    }
    catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null,
        });
    }
}

const getAllCompany = async (req, res) => {
    try {
        const companies = await Company.findAll({
            attributes: [
                "user_id",
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: [
                        "name",
                        "email",
                        "image",
                    ],
                },
            ],
        });

        return res.status(200).json({
            status: "success",
            message: "Companies retrieved successfully",
            data: companies,
        });
    }
    catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null,
        });
    }
}

module.exports = {
    createCompany,
    getAllCompany,
};
