import prisma from "../../config/prisma";

export async function getProfile(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      birthPlace: true,
      birthDate: true,
      role: true,
      createdAt: true,
    },
  });
  if (!user) throw new Error("USER_NOT_FOUND");
  return user;
}

interface UpdateProfileInput {
  name?: string;
  phone?: string;
  address?: string;
  birthPlace?: string;
  birthDate?: string;
}

export async function updateProfile(userId: number, data: UpdateProfileInput) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      phone: data.phone,
      address: data.address,
      birthPlace: data.birthPlace,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      birthPlace: true,
      birthDate: true,
      role: true,
    },
  });
}