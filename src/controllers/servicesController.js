const User = require("../models/user");
const Company = require("../models/company");
const Service = require("../models/service");
const NormalizeUtils = require("../utils/NormalizeUtils");


const { APP_URL, PUBLIC_URL } = require("../config/Constants");

const CONTROLLER_NAME = 'SERVICES'
module.exports = {
    async list(req, res) {
        const {
            companyId,
            categoryId,
            subcategoryId
        } = req.query

        // TODO Acrescentar cidade de bairro da empresa prestadora do serviço
        const where = {}

        if(companyId) {
            where[companyId] = companyId 
        }
        if(categoryId) {
            where['category'] = categoryId 
        }
        if(subcategoryId) {
            where['subcategory'] = subcategoryId 
        }

        // const services = await Service.find(where)

        const services = await Service.find(where)
            .populate('companyId').exec();
        
        return res.status(200).json(services)
    },

    async store(req, res) {
        const {
            category,
            subcategory,
            price,
            description,
            typePay,
            companyId,
            name
        } = req.body

        console.log(`${CONTROLLER_NAME} Cadastrando serviço da empresa ${companyId}`)
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(400).json({
                message: "Empresa não encontrada"
            })
        }

        const service = await Service.create({
            companyId,
            category,
            subcategory,
            price,
            description,
            typePay,
            name
        })

        // company.services.push(service)
        // const success = company.save()
        //     .then(() => true)
        //     .catch((err) => {
        //         console.log(err)
        //         return false
        //     })
        if(!service){
            return res.status(500).json({})
        }
        return res.status(201).json({})
    },

    async index(req, res) {
        const { id } = req.params;
        const service = await Service.findById(id)
        if(!service){
            return res.status(400).json({
                message: "Serviço não encontrada"
            })
          }
        return res.status(200).json(company)
    },

    async update(req, res) {
        const { id } = req.params;
        const {
            category,
            subcategory,
            price,
            description,
            typePay,
            companyId,
            name
        } = req.body
        
        // const service = await Service.findByIdAndUpdate(id, {
        //     category,
        //     subcategory,
        //     price,
        //     description,
        //     typePay,
        //     companyId,
        //     name
        // })

        const service = await Service.updateOne({
            _id: id
          }, { $set: 
            { 
                category,
                subcategory,
                price,
                description,
                typePay,
                companyId,
                name
            } 
          });
        return service
    },

    async delete(req, res) {
        const { id } = req.params;

        return await Service.findByIdAndDelete(id)
            .then((result)=> {
                return res.status(204).json({
                    message: "Serviço deletado com sucesso"
                })
            })
            .catch((err) => {
                return res.status(400).json({
                    message: "Serviço não encontrada"
                })
            })
    },

    async approve(req, res) {
        const { id } = req.params;
        const {
            isApproved
        } = req.body

        const service = await Service.findByIdAndUpdate(id, {
            isActive: isApproved,
            isInAnalysis: isApproved
        })

        if(!service){
            return res.status(500).json({})
        }
        return res.status(201).json({})
    },

    async listLast(req, res) {
        const {
            companyId
        } = req.params
        console.log(`${CONTROLLER_NAME}  Listando ultimos serviços da empresa ${companyId}`)


        const services = await Service.find({
            companyId: companyId
        }, {}, {
            skip: 0,
            limit: 5,
            sort: {
                createdAt: -1
            }
        })
        
        return res.status(200).json(services)
    },

    async search(req, res) {
        const {
            q
        } = req.query

        // const services = await Service.find({
        //     $and: [
        //         {
        //             $or: [
        //                 {
        //                    // Buscas
        //                 }
        //             ]
        //         }
        //     ]
        // }) 
        return res.status(200).json({
            q: NormalizeUtils.normalize(q)
        })
    }
};
