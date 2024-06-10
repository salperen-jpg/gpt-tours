import { createClient } from "pexels";

const pexelClient = createClient(import.meta.env.VITE_PEXELS_API_KEY);

export const generateImage = async ({
  query,
  per_page = 1,
}: {
  query: string;
  per_page?: number;
}): Promise<string | string[] | null> => {
  try {
    const response = await pexelClient.photos.search({ query, per_page });
    if ("photos" in response) {
      return per_page === 1
        ? response?.photos?.[0]?.src?.original
        : response.photos.map((photo) => photo.src.original);
    }
    return null;
  } catch (error) {
    return null;
  }
};
