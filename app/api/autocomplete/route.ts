import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

export const runtime = 'edge';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    n: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 0.7,
    messages: [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that continues existing text based on context from prior text.' +
          'Give more weight/priority to the later characters than the beginning ones. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
