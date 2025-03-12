import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productGroupRoutes from './routes/productGroupRoutes';


dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000; 

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/productGroups', productGroupRoutes);

app.get('/', (req,res) => {
    res.send('Welcome to XXX API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

