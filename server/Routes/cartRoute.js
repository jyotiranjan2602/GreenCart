import express from "express";
import authUser from "../middleware/authUser.js";
import { getCart, updateCart } from "../controlers/cartController.js";


const cartRouter = express.Router();

cartRouter.post('/update', authUser, updateCart);
cartRouter.get('/:userId', authUser, getCart);

export default cartRouter;