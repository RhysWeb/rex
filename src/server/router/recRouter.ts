import { createRouter } from './context';
import { z } from 'zod';
import { prisma } from '../db/client';

export const recRouter = createRouter()
	.mutation('addRecommendation', {
		input: z.object({
			authorId: z.string(),
			recName: z.string(),
			recDetail: z.string(),
			rating: z.number().gte(0).lte(10),
			reviewCategory: z.enum([
				'FILM',
				'TV',
				'BOOK',
				'GAME',
				'MUSIC',
				'PODCAST',
				'COMIC',
				'DAYOUT',
				'RESTAURANT',
				'OTHER',
			]),
		}),
		async resolve({ input }) {
			const { authorId, recDetail, rating, reviewCategory, recName } = input;
			const reviewInDb = await prisma.recommendation.create({
				data: {
					authorId,
					recName,
					recDetail,
					rating,
					reviewCategory,
				},
			});
			return { success: true, review: reviewInDb };
		},
	})
	.mutation('deleteRecommendation', {
		input: z.object({
			id: z.number(),
		}),
		async resolve({ input }) {
			const { id } = input;
			const deletedRec = await prisma.recommendation.delete({
				where: {
					id: id,
				},
			});
			return { success: true, deletedRec: deletedRec };
		},
	})
	.query('getRecommendations', {
		input: z.object({
			authorId: z.string(),
		}),
		async resolve({ input }) {
			const { authorId } = input;
			const recs = await prisma.recommendation.findMany({
				where: {
					authorId,
				},
			});
			return { success: true, recs };
		},
	})
	.mutation('addFriend', {
		input: z.object({
			id: z.string(),
			friendId: z.string(),
		}),
		async resolve({ input }) {
			//use prisma to add a friend to the user
			const { id, friendId } = input;
			const friend = await prisma.user.update({
				where: {
					id: id,
				},
				data: {
					friends: {
						connect: {
							id: friendId,
						},
					},
				},
			});
			return { success: true, friend };
		},
	})
	.mutation('delFriend', {
		input: z.object({
			id: z.string(),
			friendId: z.string(),
		}),
		async resolve({ input }) {
			//use prisma to delete a friend from the user
			const { id, friendId } = input;
			const friend = await prisma.user.update({
				where: {
					id: id,
				},
				data: {
					friends: {
						disconnect: {
							id: friendId,
						},
					},
				},
			});
			return { success: true, friend };
		},
	})
	.query('getFriends', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input }) {
			const { id } = input;
			const friends = await prisma.user.findUnique({
				where: {
					id: id,
				},
				select: {
					friends: true,
				},
			});
			return { success: true, friends };
		},
	});

// 	},
// })
// .mutation('deleteFriend', {
// 	input: z.object({
// 		id: z.number(),
// 	}),
// 	async resolve({ input }) {
// 		const { id } = input;
// 		const deletedRec = await prisma.recommendation.delete({
// 			where: {
// 				id: id,
// 			},
// 		});
// 		return { success: true, deletedRec: deletedRec };
// 	},
// })
// .query('getFriends', {
// 	input: z.object({
// 		authorId: z.string(),
// 	}),
// 	async resolve({ input }) {
// 		const { authorId } = input;
// 		const recs = await prisma.recommendation.findMany({
// 			where: {
// 				authorId,
// 			},
// 		});
// 		return { success: true, recs };
// 	},
// })
