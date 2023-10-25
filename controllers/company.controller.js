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
        const verification = await Verification.create({
            user_id: user.id,
        });

        return res.status(200).json({
            status: "success",
            message: "Company and user created successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
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

const getAllCompany = async (req, res) => {
    try {
        const companies = await Company.findAll({
            attributes: ["user_id"],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["name", "email"],
                    include: [
                        {
                            model: Verification,
                            as: "verification",
                            attributes: ["is_verified"],
                        },
                    ],
                },
            ],
        });
        return res.status(200).json({
            status: "success",
            message: "Companies retrieved successfully",
            data: companies.map((company) => ({
                id: company.user_id,
                name: company.user.name,
                email: company.user.email,
                is_verified: company.user.verification.is_verified,
            })),
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null,
        });
    }
};

const getCompanyByID = async (req, res) => {
    try {
        const company = await Company.findOne({
            where: {
                user_id: req.params.id,
            },
            attributes: ["user_id"],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["name", "email"],
                    include: [
                        {
                            model: Verification,
                            as: "verification",
                            attributes: ["is_verified"],
                        },
                    ],
                },
            ],
        });
        if (!company) {
            return res.status(404).json({
                status: "error",
                message: "Company not found",
                data: null,
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Company retrieved successfully",
            data: {
                id: company.user_id,
                name: company.user.name,
                email: company.user.email,
                is_verified: company.user.verification.is_verified,
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

const updateCompany = async (req, res) => {
    try {
        const company = await Company.findOne({
            where: {
                user_id: req.params.id,
            },
            include: [
                {
                    model: User,
                    as: "user",
                },
            ],
        });

        if (!company) {
            return res.status(404).json({
                status: "error",
                message: "Company not found",
                data: null,
            });
        }

        // Update user with the provided fields
        await company.user.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        return res.status(200).json({
            status: "success",
            message: "Company updated successfully",
            data: {
                id: company.user.id,
                name: company.user.name,
                email: company.user.email,
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

const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findOne({
            where: {
                user_id: req.params.id,
            },
            include: [
                {
                    model: User,
                    as: "user",
                },
            ],
        });

        if (!company) {
            return res.status(404).json({
                status: "error",
                message: "Company not found",
                data: null,
            });
        }

        // Delete the user
        await company.user.destroy();

        return res.status(200).json({
            status: "success",
            message: "Company deleted successfully",
            data: null,
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null,
        });
    }
};

module.exports = {
    createCompany,
    getAllCompany,
    getCompanyByID,
    updateCompany,
    deleteCompany,
};
