const User = require("../../models/user");
const stripe = require('../../services/stripe')
const StripeUtils = require('../../utils/StripeUtils')
const { SITE_URL } = require('../../config/Constants')


const CONTROLLER_NAME = 'PLANS'

module.exports = {
    async list(req, res) {
        console.log(`${CONTROLLER_NAME} Listando...`)
        const stripePlans = await stripe.plans.list({limit: 3});
        const plans = stripePlans.data

        return res.status(200).json(plans)
    },

    // async store(req, res) {
    //     const { email } = res.locals.user;

    //     console.log(`${CONTROLLER_NAME} Cadastrando ${email}`)

    //     const client = await Client.create({
    //         email
    //     })

    //     if(!client){
    //         return res.status(500).json({})
    //     }
    //     return res.status(201).json({})
    // },

    // async index(req, res) {
    //     const { id } = req.params;
    //     console.log(`${CONTROLLER_NAME} Listando ${id}`)
    //     const client = await Client.findById(id)
    //     return res.status(200).json(client)
    // },

    // async update(req, res) {
    //     const { id } = req.params;
    //     const {
    //         email,
    //     } = req.body

    //     console.log(`${CONTROLLER_NAME} Atualizando ${id}`)

    //     const client = await Category.updateOne({
    //         _id: id
    //       }, { $set: 
    //         { 
    //             email,
    //         } 
    //       });

    //     return res.status(200).json(client)
    // },
    
    // async delete(req, res) {
    //     const { id } = req.params;
    //     return await Client.findByIdAndDelete(id)
    //         .then((result)=> {
    //             return res.status(204).json({
    //                 message: "Cliente deletado com sucesso"
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(`${CONTROLLER_NAME} Erro ao deletar ${id}`)

    //             return res.status(400).json({
    //                 message: "Cliente não encontrada"
    //             })
    //         })
    // },
    async checkout(req, res) {
        const { planId } = req.body;
        const { _id: userId , email} = res.locals.user;

        console.log(`${CONTROLLER_NAME} Criando checkout para o usuário ${email} no plano ${planId}`)
        const user = await User.findById(userId)

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


        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ['card'],
            line_items: [{
                price: planId,
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: `${SITE_URL}/sucesso-no-pagamento`,
            cancel_url: `${SITE_URL}/falha-no-pagamento`,
        });

        return res.status(201).json(session)
    },
};
