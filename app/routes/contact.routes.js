const express = require("express");
const contacts = require("../controllers/contact.controller");

module.exports = (app) => {
    const router = express.Router();

    router.route("/")
        .get(contacts.findAll)
        .post(contacts.create)
        .delete(contacts.deleteAll);
    
    router.route("/favorite")
        .get(contacts.findAllFavorite);
    
    router.route("/:id")
        .get(contacts.findOne)
        .put(contacts.update)
        .delete(contacts.delete);

    app.use("/api/contacts", router);

    // //retrieve all contacts
    // router.get("/", contacts.findAll);

    // //create a new contact
    // router.post("/", contacts.create);

    // //delete all contats
    // router.delete("/", contacts.deleteAll);

    // //retrieve all favorite contacts
    // router.get("/favorite", contacts.findAllFavorite);

    // //retrieve a single contacts with id
    // router.get("/:id", contacts.findOne);

    // //update a contact with id
    // router.put("/:id", contacts.update);
    
    // //delete a contact with id
    // router.delete("/:id", contacts.delete);

    
};