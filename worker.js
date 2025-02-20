addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const SUPABASE_URL = "https://xievomvegvtskemkijno.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZXZvbXZlZ3Z0c2tlbWtpam5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTYzODAsImV4cCI6MjA1NTQ3MjM4MH0.Upq4QVSwzcfryUo0Twe0wiAmtZTEQv4JivSkiLON3ko";

  // Fetch all items
  if (url.pathname === "/items" && !url.searchParams.has("id")) {
    return fetchItems(SUPABASE_URL, SUPABASE_KEY);
  }

  // Fetch a single item by ID
  if (url.pathname === "/items" && url.searchParams.has("id")) {
    const itemId = url.searchParams.get("id");
    return fetchSingleItem(SUPABASE_URL, SUPABASE_KEY, itemId);
  }

  // Handle CORS Preflight (OPTIONS request)
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders() });
  }

  return new Response(JSON.stringify({ error: "requested path is invalid" }), {
    status: 404,
    headers: corsHeaders()
  });
}

// Fetch all items from Supabase
async function fetchItems(SUPABASE_URL, SUPABASE_KEY) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/items`, {
    headers: supabaseHeaders(SUPABASE_KEY)
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch items" }), {
      status: 500,
      headers: corsHeaders()
    });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), { headers: corsHeaders() });
}

// Fetch a single item by ID
async function fetchSingleItem(SUPABASE_URL, SUPABASE_KEY, itemId) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/items?id=eq.${itemId}`, {
    headers: supabaseHeaders(SUPABASE_KEY)
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Item not found" }), {
      status: 404,
      headers: corsHeaders()
    });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data[0] || {}), { headers: corsHeaders() });
}

// Function to return common headers for Supabase requests
function supabaseHeaders(SUPABASE_KEY) {
  return {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json"
  };
}

// Function to return CORS headers
function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };
}
