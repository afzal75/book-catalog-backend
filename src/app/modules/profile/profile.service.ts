import prisma from '../../../shared/prisma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getProfile = async (user: any) => {
  const { userId } = user;
  const result = await prisma.user.findUnique({ where: { id: userId } });
  return result;
};

export const ProfileService = {
  getProfile,
};