import { prisma } from '../../utils/prisma';

const followUser = async (followerId: string, followingId: string) => {
  if (followerId === followingId) throw new Error('You cannot follow yourself');

  // Check if already following
  const existing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: { followerId, followingId },
    },
  });

  if (existing) throw new Error('Already following this user');

  // Create follow record
  const follow = await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
    include: {
      follower: { select: { id: true, fullName: true } },
      following: { select: { id: true, fullName: true } },
    },
  });

  return follow;
};

const unfollowUser = async (followerId: string, followingId: string) => {
  const follow = await prisma.follow.delete({
    where: { followerId_followingId: { followerId, followingId } },
    include: {
      follower: { select: { id: true, fullName: true } },
      following: { select: { id: true, fullName: true } },
    },
  });

  return follow;
};

const getFollowers = async (userId: string) => {
  const followers = await prisma.follow.findMany({
    where: { followingId: userId },
    include: { follower: { select: { id: true, fullName: true } } },
  });
  return followers.map(f => f.follower);
};

const getFollowing = async (userId: string) => {
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    include: { following: { select: { id: true, fullName: true } } },
  });
  return following.map(f => f.following);
};
const getFollowCounts = async (userId: string) => {
  // Followers count
  const followersCount = await prisma.follow.count({
    where: { followingId: userId },
  });

  // Following count
  const followingCount = await prisma.follow.count({
    where: { followerId: userId },
  });

  return {
    followersCount,
    followingCount,
  };
};

const getMyFollowCounts = async (userId: string) => {
  const followersCount = await prisma.follow.count({
    where: { followingId: userId },
  });

  const followingCount = await prisma.follow.count({
    where: { followerId: userId },
  });

  return { followersCount, followingCount };
};

export const FollowServices = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowCounts,
  getMyFollowCounts,
};
