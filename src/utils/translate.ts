import axios from "axios";

console.log(process.env.QUOTES_API_KEY)

export async function translateText(text: string | undefined) {
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", "en");
  encodedParams.set("target_language", "pt");
  encodedParams.set("text", text ? text : '');

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.QUOTES_API_KEY,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    return response.data.data
  } catch (err) {
    console.log(err);
  }
}
