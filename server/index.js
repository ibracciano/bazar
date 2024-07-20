// importation de express
const express = require('express');

// instancier express
const app = express();

// importation de dotenv
require('dotenv').config();

// importation de cors pour gerer le conflit entre backend et frontend
const cors = require('cors');
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// importation de stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// route pour payer

app.post("/api/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.title,
                images: [product.image],
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.json({ id: session.id });
});

const PORT = process.env.PORT || 8000

// ecoute du serveur au port 3000
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT} `);
});