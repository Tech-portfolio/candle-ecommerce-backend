import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router(); 

//GET all

router.get('/', async (req, res) => {
    try {
        const productGroups = await prisma.productGroup.findMany();
        res.json(productGroups);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product groups!' });
    }
});

// GET by id

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const productGroup = await prisma.productGroup.findUnique({
            where: {  id: parseInt(id) },
        });
        if(productGroup) {
            res.json(productGroup);
        } else {
            res.status(404).json({ error: 'Product group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product group' });
    }
});

//POST new produt group
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newProductGroup = await prisma.productGroup.create({
            data: { name, },
        });
        res.status(201).json(newProductGroup);
    } catch (error) {
        res.status(500).json({ error: 'Error creating product group' });
    }
});

//PUT to update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {name} = req.body;
    try {
        const updatedProductGroup = await prisma.productGroup.update({
            where: { id: parseInt(id) },
            data: {name},
        });
        res.json(updatedProductGroup);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product group!' });
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.productGroup.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting prodict group!' });
    }
});

export default router;