import { Request, Response } from "express";
import { Wallet } from "../models/wallet";

const wallets: Wallet[] = [];

const populateWallets = () => {
    if (wallets.length === 0) {
        Array.from({ length: 100 }).forEach((_, i) => {
            const wallet = new Wallet(`Nome${i}`, `Teste${i}`, `email${i}@example.com`, 1000 + i * 50);
            wallets.push(wallet);
        });
    }
};

const getWallets = (req: Request, res: Response) => {
    populateWallets();

    const { name, email, page = '1', limit = '10' } = req.query;

    let filteredWallets = wallets;

    if (name) {
        filteredWallets = filteredWallets.filter(wallet => wallet.name.toLowerCase().includes((name as string).toLowerCase()));
    }

    if (email) {
        filteredWallets = filteredWallets.filter(wallet => wallet.email.toLowerCase().includes((email as string).toLowerCase()));
    }

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedWallets = filteredWallets.slice(startIndex, endIndex);

    res.status(200).json({
        page: pageNumber,
        limit: pageSize,
        total: filteredWallets.length,
        data: paginatedWallets,
    });
};


const createWallet = (req: Request, res: Response) => {
    const { name, lastname, email, ammount } = req.body;

    const newWallet = new Wallet(name, lastname, email, ammount);
    wallets.unshift(newWallet);
    res.status(201).json(newWallet);
};

const getWalletByUuid = (req: Request, res: Response) => {
    const { uuid } = req.params;
    const wallet = wallets.find(w => w.uuid === uuid);

    if (!wallet) {
        return res.status(404).json({ message: 'Wallet não encontrada.' });
    }

    res.status(200).json(wallet);
};

const updateWallet = (req: Request, res: Response) => {
    const { uuid } = req.params;
    const { name, lastName, email, ammount } = req.body;

    const wallet = wallets.find(w => w.uuid === uuid);
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet não encontrada.' });
    }

    if (name) wallet.name = name;
    if (lastName) wallet.lastname = lastName;
    if (email) wallet.email = email;
    if (ammount !== undefined) wallet.ammount = ammount;

    res.status(200).json(wallet);
};

const deleteWallet = (req: Request, res: Response) => {
    const { uuid } = req.params;
    const index = wallets.findIndex(w => w.uuid === uuid);

    if (index === -1) {
        return res.status(404).json({ message: 'Wallet não encontrada.' });
    }

    const deletedWallet = wallets.splice(index, 1);
    res.status(200).json({ message: 'Wallet deletada com sucesso.', wallet: deletedWallet });
};

export {
    getWallets,
    createWallet,
    getWalletByUuid,
    updateWallet,
    deleteWallet
};
