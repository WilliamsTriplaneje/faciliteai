const stripe = require('../services/stripe')


module.exports = {
    async findOrCreateCustomer(user){
        if(user.stripeId){
            console.log("Retornando costumer do Stripe já existente")
            return await stripe.customers.retrieve(
                user.stripeId
            );
        }
        console.log("Criando novo costumer do Stripe")
        return await stripe.customers.create({
            email: user.email,
            // source: token.id
        });
    }
}