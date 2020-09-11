const stripe = require('../services/stripe')


module.exports = {
    async findOrCreateCustomer(client, token){
        if(client.stripeId){
            console.log("Retornando cliente do Stripe já existente")
            return await stripe.customers.retrieve(
                client.stripeId
            );
        }
        console.log("Criando novo cliente do Stripe")
        return await stripe.customers.create({
            email: client.email,
            source: token.id
        });
    }
}