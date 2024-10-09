import axios, { AxiosError } from "axios";

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

interface FetchedLatitudeAndLongitude {
  data: NominatimResponse[];
}

export const convertToLatitudeAndLongitude = async (stopNames: string[]) => {
  const promiseFactory: Promise<FetchedLatitudeAndLongitude>[] = stopNames.map(
    (stopName) =>
      axios(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          stopName
        )}&format=json`
      )
  );
  try {
    const response = await Promise.allSettled(promiseFactory);
    const locations: number[][] = response
      .map((answers) => {
        if (answers.status === "fulfilled" && answers.value.data.length > 1) {
          return [
            +answers.value.data?.[0].lat || 0,
            +answers.value.data?.[0].lon || 0,
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
