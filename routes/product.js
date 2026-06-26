import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.js";

import { auth } from "../middlewares/auth.js";
import { validateProduct } from "../middlewares/validateProduct.js";

const router = express.Router();

router.get("/", auth, getAllProducts);
router.post("/", auth, validateProduct, createProduct);
router.put("/:id", auth, validateProduct, updateProduct);
router.delete("/:id", auth, deleteProduct);


export default router;