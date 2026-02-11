 
import type { AuthOptions } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // Note: 'authorized' callback is not available in next-auth v4
  // It's available in next-auth v5 (auth.js)
  // For now, we'll use middleware or route protection in the pages themselves
  providers: [], // Add providers with an empty array for now
} satisfies AuthOptions;