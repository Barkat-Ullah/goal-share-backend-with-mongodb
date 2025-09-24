import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { GoalServices } from './goal.service';

const createIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await GoalServices.createIntoDb(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully created goal',
    data: result,
  });
});

const getAllGoal = catchAsync(async (req: Request, res: Response) => {
  const result = await GoalServices.getAllGoal(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved all goal',
    data: result,
  });
});
const getMyGoal = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await GoalServices.getMyGoalIntoDb(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved all goal',
    data: result,
  });
});

const getGoalById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GoalServices.getGoalByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved goal by id',
    data: result,
  });
});

const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GoalServices.updateIntoDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated goal',
    data: result,
  });
});

const deleteIntoDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GoalServices.deleteIntoDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted goal',
    data: result,
  });
});

const softDeleteIntoDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GoalServices.softDeleteIntoDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully soft deleted goal',
    data: result,
  });
});

export const GoalController = {
  createIntoDb,
  getAllGoal,
  getGoalById,
  getMyGoal,
  updateIntoDb,
  deleteIntoDb,
  softDeleteIntoDb,
};
