import { createRouter } from './context';
import { z } from 'zod';
import { prisma } from '../db/client';

export const reviewsUserRouter = createRouter()
	.mutation('createUser', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input }) {
			const userInfo = await prisma.user.update({
				where: {
					id: input.id,
				},
				data: {
					role: 'USER',
				},
			});
			return userInfo;
		},
	})
	.query('getUsers', {
		async resolve() {
			const users = await prisma.user.findMany({ where: { role: 'USER' } });
			return users;
		},
	})
	.query('getUser', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input }) {
			const friend = await prisma.user.findFirst({ where: { id: input.id } });
			return friend;
		},
	});
