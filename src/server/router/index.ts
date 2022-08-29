// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { reviewsUserRouter } from './reviewsUser';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('reviewsUser.', reviewsUserRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
