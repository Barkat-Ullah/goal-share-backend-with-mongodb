import { Request } from 'express';
import { prisma } from '../../utils/prisma';

interface PaginationQuery {
  page?: number | string;
  limit?: number | string;
}

const createIntoDb = async (req: Request, userId: string) => {
  const { title, clientTarget, description, category, priority, dueDate } =
    req.body;

  const goal = await prisma.goal.create({
    data: {
      title,
      clientTarget,
      description,
      category,
      priority,
      dueDate: new Date(dueDate),
      userId,
    },
  });

  return goal;
};

const getAllGoal = async (query: Record<string, any>) => {
  const goals = await prisma.goal.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, fullName: true, email: true, profile: true },
      },
    },
  });

  return goals;
};

const getMyGoalIntoDb = async (userId: string, query: PaginationQuery) => {
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 10;
  const skip = (page - 1) * limit;

  // Total count for pagination info
  const totalGoals = await prisma.goal.count({
    where: { userId },
  });

  const goals = await prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  return {
    goals,
    pagination: {
      total: totalGoals,
      page,
      limit,
      totalPages: Math.ceil(totalGoals / limit),
    },
  };
};

const getGoalByIdFromDB = async (id: string) => {
  const goal = await prisma.goal.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, fullName: true, email: true, profile: true },
      },
    },
  });

  return goal;
};

const updateIntoDb = async (id: string, data: Partial<any>) => {
  if (data.dueDate) {
    data.dueDate = new Date(data.dueDate);
  }

  const goal = await prisma.goal.update({
    where: { id },
    data,
  });

  return goal;
};

const deleteIntoDb = async (id: string) => {
  const goal = await prisma.goal.delete({
    where: { id },
  });

  return goal;
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
  getMyGoalIntoDb,
  softDeleteIntoDb,
};
