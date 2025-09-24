import express from 'express';
import auth from '../../middlewares/auth';
import { UserRoleEnum } from '@prisma/client';
import { MetaController } from './analytics.controller';
const router = express.Router();

router.get(
  '/',
  auth(UserRoleEnum.ADMIN),
  MetaController.fetchDashboardMetaData,
);

export const MetaRoutes = router;
