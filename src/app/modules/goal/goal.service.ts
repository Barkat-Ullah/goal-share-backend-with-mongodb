import { Request } from 'express';

const createIntoDb = async (req: Request) => {
  return null;
};

const getAllGoal = async (query: Record<string, any>) => {
  console.log(query);
  return [];
};

const getMyGoalIntoDb = async (id: string) => {
  console.log(id);
  return null;
};
const getGoalByIdFromDB = async (id: string) => {
  console.log(id);
  return null;
};

const updateIntoDb = async (id: string, data: Partial<any>) => {
  console.dir({ id, data });
  return null;
};

const deleteIntoDb = async (id: string) => {
  console.log(id);
  return null;
};

const softDeleteIntoDb = async (id: string) => {
  console.log(id);
  return null;
};

export const GoalServices = {
  createIntoDb,
  getAllGoal,
  getGoalByIdFromDB,
  updateIntoDb,
  deleteIntoDb,
  softDeleteIntoDb,
  getMyGoalIntoDb,
};
