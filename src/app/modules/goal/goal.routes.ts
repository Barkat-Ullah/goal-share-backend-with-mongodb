import express from 'express';
import { GoalController } from './goal.controller';
import auth from '../../middlewares/auth';
import { UserRoleEnum } from '@prisma/client';

const router = express.Router();

router.get('/', GoalController.getAllGoal);
router.get('/my-goal', auth(UserRoleEnum.USER), GoalController.getMyGoal);
router.get('/:id', GoalController.getGoalById);

router.post('/', auth(UserRoleEnum.USER), GoalController.createIntoDb);

router.patch('/:id', GoalController.updateIntoDb);

router.delete('/:id', GoalController.deleteIntoDb);
router.delete('/soft/:id', GoalController.softDeleteIntoDb);

export const GoalRoutes = router;
