const { STRIPE_ENPOINT_SECRET } = require('../../config/Constants')
const stripe = require('../../services/stripe')

const CONTROLLER_NAME = 'PAYMENTS'
module.exports = {
    async webhooks(req, res) {
        const sig = req.headers['stripe-signature'];

        try {
            const event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_ENPOINT_SECRET);
            console.log(`${CONTROLLER_NAME} Recebendo Webhook - ${event.type}`)
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    console.log('PaymentIntent was successful!');
                    console.log(paymentIntent)
                    break;
                case 'payment_method.attached':
                    const paymentMethod = event.data.object;
                    console.log('PaymentMethod was attached to a Customer!');
                    break;
                case 'customer.subscription.updated':
                    const subscription = event.data.object;

                    const customerId = subscription.customer

                    console.log(obj)
                    break;
                // ... handle other event types:

                default:
                // Unexpected event type
                return res.status(400).end();
            }

            // Return a response to acknowledge receipt of the event
            return res.json({received: true});
        }
        catch (err) {
            console.log(err)
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        
        
    },
}