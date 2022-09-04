// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { reviewsUserRouter } from './reviewsUserRouter';
import { recRouter } from './recRouter';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('reviewsUser.', reviewsUserRouter)
	.merge('recommendation.', recRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
