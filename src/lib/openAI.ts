import axios from "axios";

import OpenAI from "openai";

export const openai = new OpenAI();

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5 seconds timeout
});

export const getChatGPTResponse = async (messages: any[]) => {
  try {
    const assistant = await openai.beta.assistants.create({
      instructions: "You are a helpful assistant.",
      name: "Quickstart Assistant",
      model: "gpt-4o",
      tools: [
        { type: "code_interpreter" },
        {
          type: "function",
          function: {
            name: "get_weather",
            description: "Determine weather in my location",
            parameters: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "The city and state e.g. San Francisco, CA",
                },
                unit: {
                  type: "string",
                  enum: ["c", "f"],
                },
              },
              required: ["location"],
            },
          },
        },
        { type: "file_search" },
      ],
    });
    const response = await axiosInstance.post("", {
      model: "gpt-4",
      messages,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching ChatGPT response:", error);
    throw error;
  }
};
