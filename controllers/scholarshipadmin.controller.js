const db = require("../models");

// Create main model
const ScholarshipAdmin = db.scholarshipadmin;

// Create user
const createUser = async (req, res) => {
    try {
        const scholarshipAdmin = await ScholarshipAdmin.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            organization: req.body.organization,
        });
        return res.status(200).json({
            status: "success",
            message: "Successfully created user",
            data: {
                user_id: scholarshipAdmin.user_id,
                name: scholarshipAdmin.name,
                email: scholarshipAdmin.email,
                organization: scholarshipAdmin.organization,
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null
        });
    }
}

// Retrieve all Scholarship from the database.
const getAllUser = async (req, res) => {
    try {
        const scholarshipAdmin = await ScholarshipAdmin.findAll({
            attributes: [
                'user_id',
                'name',
                'email',
                'organization'
            ]
        });
        return res.status(200).json({
            status: "success",
            message: "Successfully retrieved all users",
            data: scholarshipAdmin
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null
        });
    }
};

// Retrieve a certain user
const getUser = async (req, res) => {
    try {
        const scholarshipAdmin = await ScholarshipAdmin.findByPk(req.params.id, {
            attributes: [
                'user_id',
                'name',
                'email',
                'organization'
            ]
        });
        if (!scholarshipAdmin) { // if user not found
            throw new Error("User does not exist");
        }
        return res.status(200).json({
            status: "success",
            message: "Successfully retrieved user",
            data: scholarshipAdmin
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const scholarshipAdmin = await ScholarshipAdmin.findByPk(req.params.id);
        if (!scholarshipAdmin) { // if user not found
            throw new Error("User does not exist");
        }
        await scholarshipAdmin.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            organization: req.body.organization,
        });
        return res.status(200).json({
            status: "success",
            message: "Successfully updated user",
            data: {
                user_id: scholarshipAdmin.user_id,
                name: scholarshipAdmin.name,
                email: scholarshipAdmin.email,
                organization: scholarshipAdmin.organization,
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const scholarshipAdmin = await ScholarshipAdmin.findByPk(req.params.id);
        if (!scholarshipAdmin) { // if user not found
            throw new Error("User does not exist");
        }
        const deletedUser = scholarshipAdmin.dataValues;
        await scholarshipAdmin.destroy();
        return res.status(200).json({
            status: "success",
            message: "Successfully deleted user",
            data: {
                user_id: deletedUser.user_id,
                name: deletedUser.name,
                email: deletedUser.email,
                organization: deletedUser.organization,
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null
        });
    }
}

// Export controller
module.exports = {
    getAllUser,
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
