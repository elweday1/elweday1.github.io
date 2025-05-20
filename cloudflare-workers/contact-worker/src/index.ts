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
      const formData = await request.formData();
      const messageType = formData.get("message-type") as string;
      const email = formData.get("email") as string;
      const message = formData.get("message") as string;

      if (!messageType || !email || !message) {
        return new Response(JSON.stringify({ title: "Error", message: "Missing form data.", status: 400 }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(request.headers.get("Origin")) },
        });
      }

      const botToken = env.TELEGRAM_BOT_TOKEN;
      const chatId = env.MY_CHAT_ID;

      if (!botToken || !chatId) {
        console.error("TELEGRAM_BOT_TOKEN or MY_CHAT_ID is not set in environment variables.");
        return new Response(JSON.stringify({ title: "Server Error", message: "Notification service not configured.", status: 500 }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders(request.headers.get("Origin")) },
        });
      }
      
      const messageBody = formatTelegramMessage(messageType, email, message);
      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${messageBody}&parse_mode=MarkdownV2`;
      
      const res = await fetch(telegramApiUrl, { method: 'POST' });

      if (!res.ok) {
        console.error("Failed to send Telegram message:", await res.text());
        throw new Error("Failed to send message to Telegram");
      }
      
      // Assuming MESSAGE_OPTIONS was defined in your Astro site, 
      // you might need to simplify this or pass it from the client.
      // For now, sending a generic success message.
      const successResponse = {
        title: "Message Sent!",
        message: "Thanks for contacting me, I'll get back to you soon.",
        status: 200
      };

      return new Response(JSON.stringify(successResponse), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders(request.headers.get("Origin")) },
      });

    } catch (error) {
      console.error("Error in contact worker:", error);
      return new Response(JSON.stringify({ title: "Something went Wrong!!", message: "Please try again later.", status: 501 }), {
        status: 501,
        headers: { "Content-Type": "application/json", ...corsHeaders(request.headers.get("Origin")) },
      });
    }
  },
};

function formatTelegramMessage(messageType: string, email: string, message: string): string {
  // Telegram's MarkdownV2 requires certain characters to be escaped.
  const escapeMarkdown = (text: string) => text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
  
  const safeMessageType = escapeMarkdown(messageType);
  const safeEmail = escapeMarkdown(email);
  const safeMessage = escapeMarkdown(message);

  return `*New ${safeMessageType} from ${safeEmail}*%0A%0A${safeMessage}`;
}

// Basic CORS handling
const allowedOrigins = ["YOUR_ASTRO_SITE_URL", "http://localhost:4321"]; // Add your Astro site's deployed URL and localhost for dev

function corsHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
  }
  return { // Fallback for restricted or unknown origins
      "Access-Control-Allow-Origin": "*", // Or a more restrictive default
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
  };
}

function handleOptions(request: Request) {
  const origin = request.headers.get("Origin");
  const headers = corsHeaders(origin);
  if (request.headers.get("Access-Control-Request-Method")) {
    // Handle preflight CORS requests.
    return new Response(null, {
      status: 204,
      headers,
    });
  }
  // Handle simple CORS requests.
  return new Response(null, { headers });
}

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  MY_CHAT_ID: string;
}
