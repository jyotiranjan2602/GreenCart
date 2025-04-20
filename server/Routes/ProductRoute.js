import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middleware/authSeller.js";
import { addProduct, changeStock, productById, productList } from "../controlers/productController.js";

const productRouter = express.Router();

productRouter.post('/add',authSeller, upload.array("images"), addProduct);
productRouter.get('/list', productList)
productRouter.get('/list/:id', productById)
productRouter.post('/stock', authSeller, changeStock)

export default productRouter;