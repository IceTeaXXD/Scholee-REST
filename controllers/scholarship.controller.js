const db =  require("../models");

// Create main model
const Scholarship = db.scholarship;
const ScholarshipType = db.scholarshiptype;

// Create Scholarship
const createScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.create({
            title: req.body.title,
            description: req.body.description,
            short_description: req.body.short_description,
            coverage: req.body.coverage,
            contact_name: req.body.contact_name,
            contact_email: req.body.contact_email,
        });
        const scholarshiptype = await ScholarshipType.create({
            scholarship_id: scholarship.id,
            type: req.body.type,
        });
        return res.status(200).json({
            status: "success",
            message: "Successfully created scholarship",
            data: {
                user_id: scholarship.administrator_id,
                scholarship_id: scholarship.id,
                title: scholarship.title,
                description: scholarship.description,
                short_description: scholarship.short_description,
                coverage: scholarship.coverage,
                contact_name: scholarship.contact_name,
                contact_email: scholarship.contact_email,
                type: scholarshiptype.type,
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
                'id', 
                'title', 
                'description', 
                'short_description', 
                'coverage', 
                'contact_name', 
                'contact_email',
                'administrator_id'
            ],
            include: {
                model: ScholarshipType,
                as: "scholarshiptype",
                attributes: [
                    'type'
                ]
            }
        });    
        return res.status(200).json({
            status: "success",
            message: "Successfully retrieved all scholarships and types",
            data: scholarship,
            type: ScholarshipType.type
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
        const scholarshipId = req.params.id; // Assuming the parameter is named 'id'
        const scholarship = await Scholarship.findOne({
            where: {
                id: scholarshipId,
            },
            attributes: [
                'id',
                'title',
                'description',
                'short_description',
                'coverage',
                'contact_name',
                'contact_email',
                'administrator_id'
            ],
            include: [
                {
                    model: ScholarshipType,
                    as: 'scholarshiptype',
                    attributes: ['type'],
                },
            ],
        });

        if (!scholarship) {
            return res.status(404).json({
                status: "error",
                message: "Scholarship not found",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Successfully retrieved the scholarship",
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
                id: req.params.id 
            } 
        });
        const scholarshiptype = await ScholarshipType.findOne({
            where: {
                scholarship_id: scholarship.id
            }
        });
        if (!scholarship) { 
            return res.status(404).json({
                status: "error",
                message: "Scholarship not found",
                data: null
            });
        }
        if (!scholarshiptype) { 
            return res.status(404).json({
                status: "error",
                message: "Scholarship type not found",
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
        await scholarshiptype.update({
            type: req.body.type
        });
        return res.status(200).json({
            status: "success",
            message: "Successfully updated scholarship",
            data: scholarship,
            type: scholarshiptype
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
                id: req.params.id 
            } 
        });
        if (!scholarship) { // if scholarship not found
            return res.status(404).json({
                status: "error",
                message: "Scholarship not found",
                data: null
            });
        }
        const scholarshiptype = await ScholarshipType.findOne({
            where: {
                scholarship_id: scholarship.id
            }
        });
        await scholarship.destroy();
        await scholarshiptype.destroy();
        return res.status(200).json({
            status: "success",
            message: "Successfully deleted scholarship",
            data: scholarship,
            type: scholarshiptype
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