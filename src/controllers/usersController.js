const User = require("../models/user");
const { getNotEmpty } = require('../utils/BodyUtils')

const CONTROLLER_NAME = 'USERS'

module.exports = {
    async list(req, res) {
        console.log(`${CONTROLLER_NAME} Listando...`)
        const users = await User.find()
        return res.status(200).json(users)
    },

    async index(req, res) {
        const { id } = req.params;
        console.log(`${CONTROLLER_NAME} Listando ${id}`)

        const user = await User.findOne({
            _id: id
        })
        return res.status(200).json(user)
    },

    async update(req, res) {
        const { id } = req.params;

        const fields = getNotEmpty(req.body)

        const user = await User.updateOne({
            _id: id,
          }, { 
              $set: fields
          });

        return res.status(200).json(user)
    },
    
    async delete(req, res) {
        const { id } = req.params;
        console.log(`${CONTROLLER_NAME} Deletando ${id}`)

        return await User.updateOne({
            _id: id,
          }, { 
              $set: {
                  isDeleted: true
              }
          }).then((result)=> {
                return res.status(204).json({
                    message: "Usuário deletado com sucesso"
                })
            })
            .catch((err) => {
                return res.status(400).json({
                    message: "Usuário não encontrada"
                })
            })
    },
};
