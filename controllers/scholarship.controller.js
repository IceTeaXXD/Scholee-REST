const db =  require("../models");

// Create main model
const Scholarship = db.scholarship;

// Create Scholarship
const createScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.create({
            user_id: req.body.user_id,
            scholarship_id: await Scholarship.count() + 1,
            title: req.body.title,
            description: req.body.description,
            short_description: req.body.short_description,
            coverage: req.body.coverage,
            contact_name: req.body.contact_name,
            contact_email: req.body.contact_email,
        });
        return res.status(200).json({
            status: "success",
            message: "Successfully created scholarship",
            data: {
                user_id: scholarship.user_id,
                scholarship_id: scholarship.scholarship_id,
                title: scholarship.title,
                description: scholarship.description,
                short_description: scholarship.short_description,
                coverage: scholarship.coverage,
                contact_name: scholarship.contact_name,
                contact_email: scholarship.contact_email,
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
const getAllScholarships = async (req, res) => {
    try {
        const scholarship = await Scholarship.findAll({
            attributes: [
                'user_id', 
                'scholarship_id', 
                'title', 
                'description', 
                'short_description', 
                'coverage', 
                'contact_name', 
                'contact_email'
            ]
        });
        return res.status(200).json({
            status: "success",
            message: "Successfully retrieved all scholarships",
            data: scholarship
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null
        });
    }
};

const getScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findByPk(req.params.id, {
            attributes: [
                'user_id',
                'scholarship_id',
                'title',
                'description',
                'short_description',
                'coverage',
                'contact_name',
                'contact_email'
            ]
        });
        if (!scholarship) { // if scholarship not found
            return res.status(404).json({
                status: "error",
                message: "Scholarship not found",
                data: null
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Successfully retrieved scholarship",
            data: scholarship
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null
        });
    }
};

const updateScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findOne({ 
            where: { 
                scholarship_id: req.params.id 
            } 
        });
        if (!scholarship) { // if scholarship not found
            return res.status(404).json({
                status: "error",
                message: "Scholarship not found",
                data: null
            });
        }
        await scholarship.update({
            title: req.body.title,
            description: req.body.description,
            short_description: req.body.short_description,
            coverage: req.body.coverage,
            contact_name: req.body.contact_name,
            contact_email: req.body.contact_email,
        });
        return res.status(200).json({
            status: "success",
            message: "Successfully updated scholarship",
            data: scholarship
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
            data: null
        });
    }
}

const deleteScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findOne({ 
            where: { 
                scholarship_id: req.params.id 
            } 
        });
        if (!scholarship) { // if scholarship not found
            return res.status(404).json({
                status: "error",
                message: "Scholarship not found",
                data: null
            });
        }
        await scholarship.destroy();
        return res.status(200).json({
            status: "success",
            message: "Successfully deleted scholarship",
            data: scholarship
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
    createScholarship,
    getAllScholarships,
    getScholarship,
    updateScholarship,
    deleteScholarship
};