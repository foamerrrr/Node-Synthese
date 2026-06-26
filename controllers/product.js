import { prisma } from "../app.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, quantity, userId } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        quantity: Number(quantity),
        userId: Number(userId)
      }
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, quantity } = req.body;

    const product = await prisma.product.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        quantity: Number(quantity)
      }
    });

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};