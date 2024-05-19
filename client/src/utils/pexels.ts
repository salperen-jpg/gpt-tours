import { createClient } from "pexels";

const pexelClient = createClient(import.meta.env.VITE_PEXELS_API_KEY);

export const generateImage = async (query: string): Promise<string | null> => {
  try {
    const response = await pexelClient.photos.search({ query, per_page: 1 });
    return "photos" in response ? response?.photos?.[0]?.src?.original : null;
  } catch (error) {
    return null;
  }
};
