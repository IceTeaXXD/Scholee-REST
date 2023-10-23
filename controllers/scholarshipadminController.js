const db =  require("../models");

// Create main model
const ScholarshipAdmin = db.scholarshipadmin;

// Create user
const createUser = async (req, res) => {
    return await ScholarshipAdmin.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        organization: req.body.organization,
    })
    // if successfull return 201 status code with message successful
    .then((user) => {
        res.status(201).send({ message: 'User created successfully!' });
    })
    // if error return 500 status code
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

// Retrieve all Scholarship from the database.
const getAllUser = async (req, res) => {
    return await ScholarshipAdmin.findAll()
        .then((scholarshipAdmin) => {
            res.status(200).send(scholarshipAdmin);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

// Retrieve a certain user
const getUser = async (req, res) => {
    // get the user based on id, if not found return 404 status code
    return await ScholarshipAdmin.findByPk(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            // if found return 200 status code with user object
            res.status(200).send(user);
        })
        // if error return 500 status code
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

const updateUser = async (req, res) => {
    // get the user based on id, if not found return 404 status code
    return await ScholarshipAdmin.findByPk(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            // if found update the user, minimum one field is required
            user.update({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                organization: req.body.organization,
            })
            // if successfull return 200 status code with message successful
            res.status(200).send({ message: 'User updated successfully!' });
        })
        // if error return 500 status code
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
}

const deleteUser = async (req, res) => {
    // get the user based on id, if not found return 404 status code
    return await ScholarshipAdmin.findByPk(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            // if found delete the user
            user.destroy()
            // if successfull return 200 status code with message successful
            res.status(200).send({ message: 'User deleted successfully!' });
        })
        // if error return 500 status code
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
}

// Export controller
module.exports = {
    getAllUser,
    createUser,
    getUser,
    updateUser,
    deleteUser,
};