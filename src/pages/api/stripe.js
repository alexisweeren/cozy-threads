const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log('Request method:', req.method);
  console.log('Request body:', req.body.items);
  switch (req.method) {
    case "POST":
      try {
        // console.log('req.body' ,req.body)
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card', 'cashapp' , 'klarna', 'us_bank_account'],
          billing_address_collection: 'required',
          shipping_address_collection: {
            allowed_countries: ['US'],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 0,
                  currency: 'usd',
                },
                display_name: 'Free shipping',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7,
                  },
                },
              },
            },
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 700,
                  currency: 'usd',
                },
                display_name: 'Express',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 2,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 3,
                  },
                },
              },
            },
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'usd',
                },
                display_name: 'Next day',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 1,
                  },
                },
              },
            },
          ],
          ui_mode: 'embedded',
          line_items: req.body.items,
          mode: 'payment',
          automatic_tax: {
            enabled: true,
          },
          allow_promotion_codes: true,
          return_url: 'http://localhost:3000/success'
        });

        res.send({ clientSecret: session.client_secret });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    case "GET":
      try {
        const session =
          await stripe.checkout.sessions.retrieve(req.query.session_id);

        res.send({
          status: session.status,
          customer_email: session.customer_details.email
        });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    default:
      res.setHeader('Allow', req.method);
      res.status(405).end('Method Not Allowed');
  }
}