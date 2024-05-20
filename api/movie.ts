import fetch from 'node-fetch';
import { VercelRequest, VercelResponse } from '@vercel/node';

const { APIKEY } = process.env;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { title, page, id } = JSON.parse(request.body);
  const url = id
    ? `https://www.omdbapi.com/?apikey=${APIKEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${APIKEY}&s=${title}&page=${page}`;
  const res = await fetch(url);
  const json = await res.json();
  response.status(200).json(json);
}

// import fetch from 'node-fetch';

// const { aaAPIKEY } = process.env;

// export default async function handler(request, response) {
//   const { title, page, id } = JSON.parse(request.body);
//   const url = id
//     ? `https://omdbapi.com?apikey=${aaAPIKEY}&i=${id}&plot=full`
//     : `https://omdbapi.com?apikey=${aaAPIKEY}&s=${title}&page=${page}`;
//   const res = await fetch(url);
//   const json = await res.json();
//   response.status(200).json(json);
// }
