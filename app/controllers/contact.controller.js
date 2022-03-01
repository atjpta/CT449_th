const mongoose = require("mongoose");
const { BadRequestError } = require("../errors");
const handlePromise = require("../helpers/promise.helper");
const Contact = require("../model/contact.model");

exports.create = (req, res) => {
    res.send({ message: "create handler" });
};

exports.findAll = (req, res) => {
    res.send({ message: "findAll handler" });
};

exports.findOne = (req, res) => {
    res.send({ message: "fondOne handler" });
};

exports.update = (req, res) => {
    res.send({ message: "update handler" });
};

exports.delete = (req, res) => {
    res.send({ message: "delete handler" });
};

exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler" });
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler" });
};


// create and save a new contact
exports.create = async (req, res, next) => {
    // validate request 
    if (!req.body.name) {
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    //create a contact
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        favorite: req.bode.favorite === true,
    });

    //save contact tn the database
    const [error, document] = await handlePromise(contact.save());

    if (error) {
        return next(new BadRequestError(500, "An error occurred while creating the conntact"));
    }

    return res.send(document);
};

//retrieve all contacts of a uers from the database
exports.findAll = async (req, res, next) => {
    const condition = {};
    const { name } = req.query;
    if (name) {
        condition.name = { $regex: new RegExp(name), $options: "i" };
    }

    const [error, document] = await handlePromise(Contact.find(condition));

    if (error) {
        return next(new BadRequestError(500, "An error occurred while creating the conntact"));
    }

    return res.send(document);
}

exports.findOne = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    const [error, document] = await handlePromise(Contact.findOne(condition));

    if (error) {
        return next(new BadRequestError(500, "An error occurred while creating the conntact"));
    }

    if (!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send(document);
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new BadRequestError(400, "Data to update can not be empty"));
    }

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    const [error, document] = await handlePromise(
        Contact.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    );

    if (error) {
        return next(new BadRequestError(500, `Error updating contact with id = ${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send({ message: " Contact was updated successfully" });
}

exports.delete = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    const [error, document] = await handlePromise(
        Contact.findOneAndDelete(condition)
    );

    if (error) {
        return next(new BadRequestError(500, `Could not delete contact with id = ${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send({ message: "Contact was delete successfully", });
}

exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handlePromise(
        Contact.deleteMany({})
    );

    if (error) {
        return next(new BadRequestError(500, "An error occurred while removing all contacts"));
    }

    return res.send({
        message: `${data.deletedCount} contacts were deleted successfully`,
    });
}