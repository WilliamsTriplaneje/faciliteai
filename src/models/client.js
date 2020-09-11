const mongoose = require("mongoose");
const { getHashPassword } = require('../utils/AuthUtils')

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
        defalut: Date.now,
    },
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

module.exports = mongoose.model("client", clientSchema);
