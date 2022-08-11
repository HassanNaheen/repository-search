import express from 'express';
import controller from './repositories-controller';
const router = express.Router();

router.get('/repositories', controller.getRepositories);

export default router;