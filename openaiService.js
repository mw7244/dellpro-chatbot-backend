// 📁 openaiService.js — komunikacja z OpenAI API

const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getChatResponse(message, context = []) {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Jesteś doradcą technicznym DellPro AI. Pomagasz dobrać sprzęt Dell klientom biznesowym, edukacyjnym i indywidualnym.' },
        ...context,
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 600
    });

    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error('Błąd przy pobieraniu odpowiedzi z OpenAI:', error);
    throw error;
  }
}

module.exports = {
  getChatResponse
};
