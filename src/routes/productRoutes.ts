import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// GET ALL products

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Ops, error fetching products" });
  }
});

// GET by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Ops, product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

// POST a new product

router.post("/", async (req, res) => {
  const { id, name, description, category, categoryId, group, groupId, sizes, scents, price, stock, createdAt } =
    req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        id,
        name,
        description,
        category,
        categoryId,
        group,
        groupId,
        sizes,
        scents,
        price,
        stock,
        createdAt,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
});

// update a product PUT

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, category, categoryId, group, groupId, sizes, scents, price, stock, createdAt } =
    req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: { id,
        name,
        description,
        category,
        categoryId,
        group,
        groupId,
        sizes,
        scents,
        price,
        stock,
        createdAt, 
    },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

export default router;
