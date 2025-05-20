import satori, { type SatoriOptions } from "satori";
import { SITE } from "@config";
import { Resvg } from "@resvg/resvg-js";
import generateOG from "./og-templates/cover";
import siteOgImage from "./og-templates/site";
import { type Collection } from "../types"; 



const options: SatoriOptions = {
  width: 1200,
  height: 630,
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOGImage(entry: Collection) {
  const svg = await satori(await generateOG(entry), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
