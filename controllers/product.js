import { prisma } from "../app.js";

const getBaseUrl = (req) => `${req.protocol}://${req.get("host")}`;

const addLinks = (product, req) => {
  return {
    ...product,
    links: [
      {
        rel: "self",
        method: "GET",
        href: `${getBaseUrl(req)}/api/products/${product.id}`
      },
      {
        rel: "update",
        method: "PUT",
        href: `${getBaseUrl(req)}/api/products/${product.id}`
      },
      {
        rel: "delete",
        method: "DELETE",
        href: `${getBaseUrl(req)}/api/products/${product.id}`
      }
    ]
  };
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { userId: req.user.userId }
    });

    res.json(products.map(p => addLinks(p, req)));
  } catch (err) {
  if (err.code === "P2002") {
    return res.status(409).json({ error: "Already exists" });
  }

  if (err.code === "P2025") {
    return res.status(404).json({ error: "Not found" });
  }

  return res.status(500).json({ error: "Server error" });
}
};

export const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        quantity: Number(quantity),
        userId: req.user.userId
      }
    });

    res.status(201).json(addLinks(product, req));
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Already exists" });
    }

    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.userId !== req.user.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: req.body
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.userId !== req.user.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await prisma.product.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};