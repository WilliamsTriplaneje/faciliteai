const Client = require("../models/client");

const CONTROLLER_NAME = 'CLIENTS'

module.exports = {
    async list(req, res) {
        console.log(`${CONTROLLER_NAME} Listando...`)
        const companies = await Client.find()
        return res.status(200).json(companies)
    },

    async store(req, res) {
        const { email } = res.locals.user;

        console.log(`${CONTROLLER_NAME} Cadastrando ${email}`)

        const client = await Client.create({
            email
        })

        if(!client){
            return res.status(500).json({})
        }
        return res.status(201).json({})
    },

    async index(req, res) {
        const { id } = req.params;
        console.log(`${CONTROLLER_NAME} Listando ${id}`)
        const client = await Client.findOne({
            _id: id
        })
        return res.status(200).json(client)
    },

    async update(req, res) {
        const { id } = req.params;
        const {
            email,
        } = req.body

        console.log(`${CONTROLLER_NAME} Atualizando ${id}`)

        const client = await Client.updateOne({
            _id: id
          }, { $set: 
            { 
                email,
            } 
          });

        return res.status(200).json(client)
    },
    
    async delete(req, res) {
        const { id } = req.params;
        return await Client.updateOne({
            _id: id
          }, { $set: 
            { 
                isDeleted: true,
            } 
          }).then((result)=> {
                return res.status(204).json({
                    message: "Cliente deletado com sucesso"
            })
            })
            .catch((err) => {
                console.log(`${CONTROLLER_NAME} Erro ao deletar ${id}`)

                return res.status(400).json({
                    message: "Cliente não encontrada"
                })
            })
    },
};
