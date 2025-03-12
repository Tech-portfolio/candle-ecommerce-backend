import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// GET all categories

router.get('/', async(req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Ops, error fetching categories!' });
    }
}); 

// GET category by id

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
        });
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Ops, category not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category!' })
    }
});

// POST new category

router.post('/', async(req, res) => {
    const { name } = req.body;
    try {
        const newCategory = await prisma.category.create({
            data: { name },
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error creating new category' });
    }
});

// PUT to update a category

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error updating category!' });
    }
});

//DELETE

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.category.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category!' });
    }
});

export default router;