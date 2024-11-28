'use server';

import { cookies } from 'next/headers';

export const deleteCookies = async(keys: string[]) => {
   const cookiesStore = cookies();

   // Use forEach properly with async
   for (const key of keys) {
     cookiesStore.delete(key);
   }
};
