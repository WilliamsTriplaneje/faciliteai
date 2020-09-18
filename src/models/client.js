const mongoose = require("mongoose");
const { getHashPassword } = require('../utils/AuthUtils')
const { OnlyNotDeleted } = require("../utils/MongooseUtils");

const clientSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    stripeId: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false,
    }
});

clientSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
    const self = this
    return await self.findOne(condition)
    .then(async (result) => {
        return result ? result : await self.create(condition)
    })
    .catch(async (err) => {
        console.log("Erro ao encontrar cliente!")
        console.log(err)

        return null
    })
}

clientSchema.pre("findOne", async function (next) {
    OnlyNotDeleted(this)
    next();
});
clientSchema.pre("find", async function (next) {
    OnlyNotDeleted(this)
    next();
});


module.exports = mongoose.model("client", clientSchema);
