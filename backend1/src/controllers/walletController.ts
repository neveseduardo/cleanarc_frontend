import { Request, Response } from "express";
import { Wallet } from "../models/wallet";

let wallets: Wallet[] = [];

const populateWallets = () => {
    if (wallets.length === 0) {
        Array.from({ length: 100 }).forEach((_, i) => {
            const wallet = new Wallet(`Nome${i}`, `Teste${i}`, `email${i}@example.com`, 1000 + i * 50);
            wallets.push(wallet);
        });
    }
};

const getWallets = (req: Request, res: Response) => {
    if (!wallets.length) {
        populateWallets();
    }

    const { name, email } = req.query;

    let filteredWallets = wallets;

    if (name) {
        filteredWallets = filteredWallets.filter(wallet => wallet.name.toLowerCase().includes((name as string).toLowerCase()));
    }

    if (email) {
        filteredWallets = filteredWallets.filter(wallet => wallet.email.toLowerCase().includes((email as string).toLowerCase()));
    }

    const sortedWallets = filteredWallets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    res.status(200).json({
        total: filteredWallets.length,
        data: sortedWallets,
    });
};


const createWallet = (req: Request, res: Response) => {
    const { name, lastname, email, amount, btc_amount } = req.body;

    const newWallet = new Wallet(name, lastname, email, amount, btc_amount);
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
    const { name, lastName, email, amount, btc_amount } = req.body;

    const wallet = wallets.find(w => w.uuid === uuid);

    if (!wallet) {
        return res.status(404).json({ message: 'Wallet não encontrada.' });
    }

    if (name) wallet.name = name;
    if (lastName) wallet.lastname = lastName;
    if (email) wallet.email = email;
    if (amount !== undefined) wallet.amount = amount;
    if (btc_amount !== undefined) wallet.btc_amount = btc_amount;

    res.status(200).json(wallet);
};

const deleteWallet = (req: Request, res: Response) => {
    const { uuid } = req.params;
    const index = wallets.findIndex(w => w.uuid === uuid);

    if (index === -1) {
        return res.status(404).json({ message: 'Wallet não encontrada.' });
    }

    wallets = wallets.filter(x => x.uuid !== uuid);

    res.status(200).json({ message: 'Wallet deletada com sucesso.' });
};

export {
    getWallets,
    createWallet,
    getWalletByUuid,
    updateWallet,
    deleteWallet
};
