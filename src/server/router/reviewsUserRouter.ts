import { createRouter } from './context';
import { z } from 'zod';
import { prisma } from '../db/client';

export const reviewsUserRouter = createRouter().mutation('createUser', {
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
});
