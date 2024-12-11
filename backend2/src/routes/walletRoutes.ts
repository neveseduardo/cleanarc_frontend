import { deleteWallet, getWalletByUuid, updateWallet, getWallets, createWallet } from "../controllers/walletController";

const express = require('express');

const router = express.Router();

router.get('/', getWallets);
router.get('/:uuid', getWalletByUuid);
router.post('/', createWallet);
router.put('/:uuid', updateWallet);
router.delete('/:uuid', deleteWallet);

export const walletRoutes = router;