import OpenAI from "openai";
import { ChatMessage, Tour } from "./types";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export type TokenWithMessage = ChatMessage & { total_tokens: number };

export const chatResponse = async (
  chatMessages: ChatMessage[]
): Promise<ChatMessage | TokenWithMessage | null> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...(chatMessages as OpenAI.Chat.Completions.ChatCompletionMessageParam[]),
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 100,
    });
    return {
      content: completion.choices[0].message.content,
      role: completion.choices[0].message.role,
      total_tokens: completion.usage?.total_tokens,
    };
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

export type AITourResponseWithToken = AITourResponse & { total_tokens: number };

export const createNewTour = async ({
  city,
  country,
}: CityCountryParam): Promise<AITourResponseWithToken | null> => {
  const tourPrompt = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things couples or families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["stop name , some information", "stop name , some information","stop name ,some information"]
  }
}
"stops" property should include only three stops with strings.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters. Be sure that JSON format is correct!`;
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
    if (!tourData.tour) return null;
    return {
      tour: tourData.tour,
      total_tokens: completion.usage?.total_tokens!,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
