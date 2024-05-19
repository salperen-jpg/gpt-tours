import OpenAI from "openai";
import { ChatMessage, Tour } from "./types";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const chatResponse = async (
  chatMessages: ChatMessage[]
): Promise<ChatMessage | null> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    return completion.choices[0].message;
  } catch (error) {
    return null;
  }
};

export type CityCountryParam = {
  city: string;
  country: string;
};

export type AITourResponse = {
  tour: Tour | null;
};

export const createNewTour = async ({
  city,
  country,
}: CityCountryParam): Promise<Tour | null> => {
  const tourPrompt = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["stop name", "stop name","stop name"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You will be my guide in my next journey!" },
        { role: "user", content: tourPrompt },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    const tourData: AITourResponse = completion.choices[0].message.content
      ? JSON.parse(completion.choices[0].message.content)
      : null;
    console.log(completion.choices[0].message);
    if (!tourData.tour) return null;
    return tourData.tour;
  } catch (error) {
    return null;
  }
};
