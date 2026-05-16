import type { APIRoute } from "astro";
import { MY_SHOWS } from "@config";
import getShowsData from "@utils/shows";

export const prerender = false;

const CACHE_MS = 1000 * 60 * 60 * 24;
const headers = {
  "content-type": "application/json; charset=utf-8",
  "cache-control":
    "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
};

let memoryCache:
  | {
      body: string;
      createdAt: number;
    }
  | undefined;

export const GET: APIRoute = async () => {
  if (memoryCache && Date.now() - memoryCache.createdAt < CACHE_MS) {
    return new Response(memoryCache.body, { headers });
  }

  const shows = await getShowsData("50788f34", MY_SHOWS);
  const payload = shows.map(({ imdbID, Poster, Title, Plot }) => ({
    imdbID,
    Poster,
    Title,
    Plot,
  }));
  const body = JSON.stringify(payload);
  memoryCache = { body, createdAt: Date.now() };

  return new Response(body, { headers });
};
