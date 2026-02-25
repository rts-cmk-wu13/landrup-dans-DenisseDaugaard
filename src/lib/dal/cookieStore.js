import { cookies } from "next/headers";

export const cookieStore = async () => {
  const cookieStore = await cookies();
  return cookieStore;
}