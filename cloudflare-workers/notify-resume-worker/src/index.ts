export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS handling
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const body = await request.json() as { clientAddress?: string };
      const clientAddress = body.clientAddress;

      if (!clientAddress) {
        // If clientAddress is not provided, just return a success response 
        // without sending a Telegram message. Or, you could return an error.
        // This depends on whether sending clientAddress is optional.
        // For now, we'll assume it's optional and proceed quietly.
        return new Response(JSON.stringify({ status: "Notification processed (no IP provided)" }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders(request.headers.get("Origin")) },
        });
      }
      
      const botToken = env.TELEGRAM_BOT_TOKEN;
      const chatId = env.MY_CHAT_ID;

      if (!botToken || !chatId) {
        console.error("TELEGRAM_BOT_TOKEN or MY_CHAT_ID is not set in environment variables for notify-resume-worker.");
        // Silently fail or log, but don't block the user action (e.g., resume download)
        return new Response(JSON.stringify({ status: "Notification service not configured" }), {
          status: 202, // Accepted, but not fully processed
          headers: { "Content-Type": "application/json", ...corsHeaders(request.headers.get("Origin")) },
        });
      }

      // Fetch IP data
      const ipApiResponse = await fetch(`http://ip-api.com/json/${clientAddress}`);
      if (!ipApiResponse.ok) {
        console.error(`Failed to fetch IP data: ${ipApiResponse.status} ${await ipApiResponse.text()}`);
        // Still return a success-ish response to the client as notification is best-effort
        return new Response(JSON.stringify({ status: "Notification attempted (IP lookup failed)" }), {
          status: 202,
          headers: { "Content-Type": "application/json", ...corsHeaders(request.headers.get("Origin")) },
        });
      }
      
      const ipData = await ipApiResponse.json() as IpData;
      
      // Using a simple text format for the message, YAML stringify can be added if preferred
      // Ensure any sensitive data from ipData is handled carefully before sending
      let messageText = `Resume downloaded by user at IP: ${ipData.query}\nLocation: ${ipData.city}, ${ipData.regionName}, ${ipData.countryCode}\nISP: ${ipData.isp}`;
      messageText = escapeMarkdown(messageText); // Escape for Telegram MarkdownV2

      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${messageText}&parse_mode=MarkdownV2`;
      
      const telegramRes = await fetch(telegramApiUrl, { method: 'POST' });

      if (!telegramRes.ok) {
        console.error("Failed to send Telegram message for resume notification:", await telegramRes.text());
        // Still return a success-ish response
         return new Response(JSON.stringify({ status: "Notification attempted (Telegram send failed)" }), {
          status: 202,
          headers: { "Content-Type": "application/json", ...corsHeaders(request.headers.get("Origin")) },
        });
      }

      return new Response(JSON.stringify({ status: "Owner notified" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders(request.headers.get("Origin")) },
      });

    } catch (error) {
      console.error("Error in notify-resume worker:", error);
      return new Response(JSON.stringify({ status: "Notification failed internally" }), {
        status: 500, // Internal Server Error
        headers: { "Content-Type": "application/json", ...corsHeaders(request.headers.get("Origin")) },
      });
    }
  },
};

const escapeMarkdown = (text: string) => {
  // Telegram's MarkdownV2 requires certain characters to be escaped.
  // Characters: _ * [ ] ( ) ~ ` > # + - = | { } . !
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
};

// Basic CORS handling - ensure this matches your site's needs
const allowedOrigins = ["YOUR_ASTRO_SITE_URL", "http://localhost:4321"]; // Add your Astro site's deployed URL

function corsHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
  }
  return {
    "Access-Control-Allow-Origin": "*", // More restrictive default if needed
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function handleOptions(request: Request) {
  const origin = request.headers.get("Origin");
  const headers = corsHeaders(origin);
  if (request.headers.get("Access-Control-Request-Method")) {
    return new Response(null, { status: 204, headers });
  }
  return new Response(null, { headers });
}

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  MY_CHAT_ID: string;
}

interface IpData {
  query: string;
  status: "success" | "fail";
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}
