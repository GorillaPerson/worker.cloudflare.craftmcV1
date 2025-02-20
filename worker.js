addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === "/items") {
    // Replace with your Supabase API URL & Key
    const SUPABASE_URL = "https://xievomvegvtskemkijno.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZXZvbXZlZ3Z0c2tlbWtpam5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTYzODAsImV4cCI6MjA1NTQ3MjM4MH0.Upq4QVSwzcfryUo0Twe0wiAmtZTEQv4JivSkiLON3ko";

    const response = await fetch(`${SUPABASE_URL}/rest/v1/items`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ error: "requested path is invalid" }), { status: 404 });
}
