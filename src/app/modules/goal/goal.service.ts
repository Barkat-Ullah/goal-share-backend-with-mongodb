import { Request } from 'express';
import { prisma } from '../../utils/prisma';

interface PaginationQuery {
  page?: number | string;
  limit?: number | string;
}

// ---------- Goal ----------
const createGoal = async (req: Request, userId: string) => {
  const { title, clientTarget, description, category, priority, dueDate } =
    req.body;

  return await prisma.goal.create({
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
};

const getMyGoals = async (userId: string, query: PaginationQuery) => {
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 10;
  const skip = (page - 1) * limit;

  const total = await prisma.goal.count({ where: { userId } });

  const goals = await prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  return {
    goals,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getGoalById = async (id: string) => {
  return await prisma.goal.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      clientTarget: true,
      category: true,
      priority: true,
      dueDate: true,
      status: true,
      userId: true,
      clients: {
        select: {
          id: true,
          name: true,
          status: true,
          timeSpent: true,
          notes: true,
          phone: true,
        },
      },
      myWhies: {
        select: {
          id: true,
          text: true,
        },
      },
      affirmations: {
        select: {
          id: true,
          text: true,
        },
      },
      description: true,
    },
  });
};

const updateGoal = async (id: string, data: Partial<any>) => {
  if (data.dueDate) data.dueDate = new Date(data.dueDate);
  return await prisma.goal.update({ where: { id }, data });
};

const deleteGoal = async (id: string) => {
  return await prisma.goal.delete({ where: { id } });
};

const updateGoalStatus = async (
  id: string,
  status: 'PENDING' | 'COMPLETED',
) => {
  return await prisma.goal.update({ where: { id }, data: { status } });
};

// ---------- Client ----------
const addClient = async (
  goalId: string,
  clientData: { name?: string; phone?: string; notes?: string },
) => {
  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
    select: { clientTarget: true, clients: { select: { id: true } } },
  });

  if (!goal) {
    throw new Error('Goal not found.');
  }

  if (goal.clients.length >= goal.clientTarget) {
    throw new Error(
      `Client limit reached. Goal target is ${goal.clientTarget} clients.`,
    );
  }
  return await prisma.client.create({
    data: {
      goalId,
      ...clientData,
    },
  });
};

const getClientById = async (id: string) => {
  return await prisma.client.findUnique({
    where: { id },
    select: {
      name: true,
      phone: true,
      notes: true,
    },
  });
};

const updateClient = async (clientId: string, data: Partial<any>) => {
  return await prisma.client.update({
    where: { id: clientId },
    data: data,
    select: {
      name: true,
      notes: true,
      phone: true,
    },
  });
};

const updateClientStatus = async (
  clientId: string,
  status: 'PENDING' | 'COMPLETED',
) => {
  return await prisma.client.update({
    where: { id: clientId },
    data: { status },
  });
};
const updateClientTimeSpent = async (clientId: string, timeSpent: any) => {
  return await prisma.client.update({
    where: { id: clientId },
    data: { timeSpent },
  });
};

// ---------- MyWhy ----------
const addMyWhy = async (goalId: string, text: string) => {
  return await prisma.myWhy.create({ data: { goalId, text } });
};

// ---------- Affirmation ----------
const addAffirmation = async (goalId: string, text: string) => {
  return await prisma.affirmation.create({ data: { goalId, text } });
};

export const GoalServices = {
  createGoal,
  getMyGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  updateGoalStatus,

  addClient,
  getClientById,
  updateClient,
  updateClientTimeSpent,
  updateClientStatus,
  addMyWhy,
  addAffirmation,
};
