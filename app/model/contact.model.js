const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Contact name is required"],
        },
        email: {
            type: String,
            trim: true,
            lowercas: true,
        },
        address: String,
        phone: String,
        favorite: Boolean,
    },

    {
        timestamps: true,
    }
);

// xài k dc 
// schema.method("toJSON", () => {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("contact", schema);