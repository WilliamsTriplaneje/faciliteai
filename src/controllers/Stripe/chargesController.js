const User = require("../../models/user");
const Charge = require("../../models/charge")
const Service = require("../../models/service");


const { APP_URL, PUBLIC_URL } = require("../../config/Constants");
const stripe = require('../../services/stripe')
const StripeUtils = require('../../utils/StripeUtils')

const { v4: uuid } = require('uuid');

const CONTROLLER_NAME = 'COMPANIES'

module.exports = {
    async list(req, res) {
        return res.status(200).json([])
    },

    async store(req, res) {
        const { serviceId, token } = req.body;
        const { _id: userId , email} = res.locals.user;
        
        const user = await User.findById(userId)
        const service = await Service.findById(serviceId)
        
        if(!service) {
            return res.status(400).json({
                message: "Serviço não encontrado"
            })
        }

        console.log(`${CONTROLLER_NAME} Realizando pagamento do serviço ${service.name}`)


        const customer = await StripeUtils.findOrCreateCustomer(user)

        if(!customer) {
            return res.status(400).json({
                message: "Costumer Stripe não encontrado"
            })
        }

        await User.updateOne({
            _id: userId
        },{ $set: 
            { 
                stripeId: customer.id
            } 
        })
        await Charge.create({
            userId: user._id,
            serviceId: service._id,
            price: service.price,
            date: Date.now()
        })

        const idempotencyKey = uuid();
        await stripe.charges.create(
            {
                amount: service.price * 100,
                currency: "BRL",
                customer: customer.id,
                receipt_email: user.email,
                description: `Pagamento do serviço ${service.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },
            {
                idempotencyKey
            }
        );
        return res.status(201).json({})
    },

    async index(req, res) {
        const { id } = req.params;

        return res.status(200).json({})
    },

    async update(req, res) {
        const { id } = req.params;
        return res.status(204).json({})
    },
    
    async delete(req, res) {
        const { id } = req.params;
    },
};
