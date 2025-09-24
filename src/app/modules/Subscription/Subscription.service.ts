import { Request } from 'express';
import { prisma } from '../../utils/prisma';

// Create Subscription
const createIntoDb = async (req: Request) => {
  const { title, price, subscriptionType, duration } = req.body;

  const subscription = await prisma.subscription.create({
    data: {
      title,
      price: parseFloat(price),
      subscriptionType,
      duration,
    },
  });

  return subscription;
};

// Get All Subscription (Optional Filtering)
const getAllSubscription = async (query: Record<string, any>) => {
  const { subscriptionType } = query;

  const subscriptions = await prisma.subscription.findMany({
    where: subscriptionType
      ? {
          subscriptionType: subscriptionType as any,
        }
      : {},
    orderBy: {
      createdAt: 'desc',
    },
  });

  return subscriptions;
};

// Get Subscription by ID
const getSubscriptionByIdFromDB = async (id: string) => {
  const subscription = await prisma.subscription.findUnique({
    where: { id },
  });

  return subscription;
};

// Update Subscription
const updateIntoDb = async (id: string, data: Partial<any>) => {
  const subscription = await prisma.subscription.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.price && { price: parseFloat(data.price) }),
      ...(data.subscriptionType && {
        subscriptionType: data.subscriptionType,
      }),
      ...(data.duration && { duration: data.duration }),
    },
  });

  return subscription;
};

// Hard Delete Subscription
const deleteIntoDb = async (id: string) => {
  const subscription = await prisma.subscription.delete({
    where: { id },
  });

  return subscription;
};

export const SubscriptionServices = {
  createIntoDb,
  getAllSubscription,
  getSubscriptionByIdFromDB,
  updateIntoDb,
  deleteIntoDb,
};
