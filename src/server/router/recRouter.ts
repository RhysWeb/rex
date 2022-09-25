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
	});
