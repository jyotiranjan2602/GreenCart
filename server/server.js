import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import 'dotenv/config'; 
import userRouter from "./Routes/UserRoute.js";
import sellerRouter from "./Routes/SellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./Routes/ProductRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import addressRouter from "./Routes/addressRoute.js";
import orderRouter from "./Routes/orderRoute.js";
import { stripeWebHooks } from "./controlers/orderController.js";

const app =express();
const port = process.env.PORT  || 4000 ; 

await connectDB();
await connectCloudinary()
// allowed multiple origins

const allowedOrigins = ['http://localhost:5173','https://green-carts.vercel.app']

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebHooks)

// middleware configuration

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));
app.get('/', (req, res)=> res.send(" Api is working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter);


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
