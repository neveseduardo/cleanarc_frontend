import express, { Request, Response } from 'express';
import { walletRoutes } from './routes/walletRoutes';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Api Wallets! Bem vindo.');
});

app.use('/api/wallets', walletRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
