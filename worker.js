addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  if (url.pathname === "/items") {
    // Fetch data from Supabase
    const response = await fetch("https://xievomvegvtskemkijno.supabase.co", {
      headers: {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZXZvbXZlZ3Z0c2tlbWtpam5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTYzODAsImV4cCI6MjA1NTQ3MjM4MH0.Upq4QVSwzcfryUo0Twe0wiAmtZTEQv4JivSkiLON3ko"
      }
    });
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });
  }
  
  return new Response("Not Found", { status: 404 });
}
