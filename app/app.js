import dotenv from "dotenv"
dotenv.config();
import express from "express"
import userRouter from "../routes/userRoutes.js";
import { dbConnection } from "../config/dbConfig.js";
import productRouter from "../routes/productRoutes.js";
import { globalErrorHandler } from "../middlewares/globalErrorHandler.js";
import categoryRouter from "../routes/categoryRoutes.js";
import brandRouter from "../routes/brandRoutes.js";
import colorRouter from "../routes/colorRoutes.js";
import reviewRouter from "../routes/reviewRoutes.js";
import orderRouter from "../routes/orderRoutes.js";
import Stripe from "stripe";

//app instance
let app=express();

dbConnection();

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.




// This is your Stripe CLI webhook secret for testing your endpoint locally.
const stripe=new Stripe(process.env.STRIPE_KEY)
const endpointSecret = "whsec_90d5f8980ff837359d5618eae391de2c74913a6c59484dc00d440a38babfa1d2";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const currency=session.currency
      const paymentMethod=session.payment_method_type[0]
      const paymentStatus=session.payment_status
      const totalPrice=session.amount_total/100
      const orderId=JSON.parse(session.metadata.orderId)
// console.log(currency,paymentMethod,paymentStatus,totalPrice,orderId);
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

//middlewares to process the json data
app.use(express.json());


app.use("/api/v1/users",userRouter);

app.use("/api/v1/products",productRouter);

app.use("/api/v1/categories",categoryRouter);

app.use("/api/v1/brands", brandRouter);

app.use("/api/v1/colors", colorRouter);

app.use("/api/v1/reviews", reviewRouter);

app.use("/api/v1/orders", orderRouter);

//not found route
app.all("*",(req,res,next)=>{
const err=new Error(`path ${req.originalUrl} not found`)
err.status=404
next(err)
})

//error handling middleware
app.use(globalErrorHandler)

export default app;