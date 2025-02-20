const GEMINI_API_KEY = 'AIzaSyASsyFC608FIJ-omj4W7GdNhBHHadUWkBU';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function chatWithGemini(message: string) {
  const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}