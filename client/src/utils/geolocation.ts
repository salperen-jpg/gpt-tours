import axios, { AxiosError } from "axios";

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

interface Fetched {
  data: NominatimResponse[];
}

export const convertToLatitudeAndLongitude = async (stopNames: string[]) => {
  const promiseFactory: Promise<Fetched>[] = [
    axios(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        stopNames[0]
      )}&format=json`
    ),
    axios(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        stopNames[1]
      )}&format=json`
    ),
    axios(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        stopNames[2]
      )}&format=json`
    ),
  ];
  try {
    const response = await Promise.allSettled(promiseFactory);
    const locations: number[][] = response
      .map((answers) => {
        if (answers.status === "fulfilled") {
          return [
            +answers.value?.data?.[0]?.lat || 0,
            +answers.value?.data?.[0]?.lon || 0,
          ];
        } else {
          return false;
        }
      })
      .filter((result): result is number[] => result !== false);
    return locations;
  } catch (error) {
    const errorMsg =
      error instanceof AxiosError
        ? error.response?.data
        : "Something went wrong!";
    console.log(errorMsg);
    return null;
  }
};
