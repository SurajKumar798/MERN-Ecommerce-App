import express from 'express';
import { saveAddress, getAddress } from '../controllers/adressController.js';

const router = express.Router();

router.post('/add', saveAddress);
router.get('/:userId', getAddress);

export default router;