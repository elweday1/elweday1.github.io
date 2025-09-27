import type { APIRoute } from "astro";
import { RESUME } from "@config";

const resumeUrl = RESUME.normal;
const notifyWorkerUrl = "https://notify-resume-worker.elweday.workers.dev/";

export const GET: APIRoute = async ({ clientAddress, redirect }) => {
  try {
    // We don't want to block the redirect, so we don't await the fetch
    fetch(notifyWorkerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientAddress }),
    }).catch(err => console.warn("Error sending resume download notification:", err));
  } catch (err) {
    console.warn("Error sending resume download notification:", err);
  }

  return redirect(resumeUrl, 307);
};