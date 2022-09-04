import { createRouter } from './context';
import { z } from 'zod';
import { prisma } from '../db/client';

export const reviewsUserRouter = createRouter()
	.query('getUser', {
		input: z.object({
			userId: z.string(),
		}),
		async resolve({ input }) {
			const userInfo = await prisma.reviewsUser.findUnique({
				where: { authUserId: input.userId },
			});
			return userInfo;
		},
	})
	.mutation('createUser', {
		input: z.object({
			authUserId: z.string(),
			userName: z.string(),
		}),
		async resolve({ input }) {
			const userInfo = await prisma.reviewsUser.create({
				data: {
					authUserId: input.authUserId,
					userName: input.userName,
				},
			});
			return userInfo;
		},
	});
