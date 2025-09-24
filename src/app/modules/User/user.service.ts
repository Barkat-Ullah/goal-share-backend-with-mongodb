import httpStatus from 'http-status';
import { User, UserRoleEnum, UserStatus } from '@prisma/client';
import QueryBuilder from '../../builder/QueryBuilder';
import { prisma } from '../../utils/prisma';
import { deleteFile, uploadSingleFile } from '../../utils/uploadFiles';
import { Request } from 'express';
import AppError from '../../errors/AppError';
import { uploadToDigitalOceanAWS } from '../../utils/uploadToDigitalOceanAWS';

interface UserWithOptionalPassword extends Omit<User, 'password'> {
  password?: string;
}
const getAllUsersFromDB = async (query: any) => {
  const usersQuery = new QueryBuilder<typeof prisma.user>(prisma.user, query);

  const result = await usersQuery
    .search(['fullName', 'email'])
    .filter()
    .sort()
    .fields()
    .exclude()
    .paginate()
    .include({ subscription: true })
    .execute();
  return result;
};

const getMyProfileFromDB = async (id: string) => {
  const Profile = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: { subscription: true },
  });

  return Profile;
};

const getUserDetailsFromDB = async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
    // select: {
    //   id: true,
    //   fullName: true,
    //   email: true,
    //   role: true,
    //   createdAt: true,
    //   updatedAt: true,
    //   profile: true,
    // },
  });
  return user;
};

const updateProfileImg = async (
  id: string,
  previousImg: string,
  req: Request,
  file: Express.Multer.File | undefined,
) => {
  if (file) {
    const location = uploadToDigitalOceanAWS(file);

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        profile: (await location).Location,
      },
    });
    if (previousImg) {
      deleteFile(previousImg);
    }
    req.user.profile = location;
    return result;
  }
  throw new AppError(httpStatus.NOT_FOUND, 'Please provide image');
};

const updateMyProfileIntoDB = async (
  id: string,

  payload: Partial<User>,
) => {
  delete payload.email;

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const updateUserRoleStatusIntoDB = async (id: string, role: UserRoleEnum) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      role: role,
    },
  });
  return result;
};
const updateProfileStatus = async (id: string, status: UserStatus) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
    select: {
      id: true,
      status: true,
      role: true,
    },
  });
  return result;
};
const updateUserApproval = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      isApproved: true,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      isApproved: true,
    },
  });
  return result;
};

export const UserServices = {
  getAllUsersFromDB,
  getMyProfileFromDB,
  getUserDetailsFromDB,
  updateMyProfileIntoDB,
  updateUserRoleStatusIntoDB,
  updateProfileStatus,
  updateProfileImg,
  updateUserApproval,
};
