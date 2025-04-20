import express from "express";
import authUser from "../middleware/authUser.js";
import { getAllOrders, getUserOrders, placeorderCOD, placeorderStripe } from "../controlers/orderController.js";
import authSeller from "../middleware/authSeller.js";
 
const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeorderCOD);
orderRouter.post('/stripe', authUser, placeorderStripe);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);


export default orderRouter;