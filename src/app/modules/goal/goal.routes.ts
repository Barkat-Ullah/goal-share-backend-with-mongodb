import express from 'express';
import { GoalController } from './goal.controller';

const router = express.Router();

router.get('/', GoalController.getAllGoal);
router.get('/my-goal', GoalController.getMyGoal);
router.get('/:id', GoalController.getGoalById);

router.post('/', GoalController.createIntoDb);

router.patch('/:id', GoalController.updateIntoDb);

router.delete('/:id', GoalController.deleteIntoDb);
router.delete('/soft/:id', GoalController.softDeleteIntoDb);

export const GoalRoutes = router;
