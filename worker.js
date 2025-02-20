export default {
  async fetch(request) {
    const url = 'https://xievomvegvtskemkijno.supabase.co';
    const headers = {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZXZvbXZlZ3Z0c2tlbWtpam5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTYzODAsImV4cCI6MjA1NTQ3MjM4MH0.Upq4QVSwzcfryUo0Twe0wiAmtZTEQv4JivSkiLON3ko',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZXZvbXZlZ3Z0c2tlbWtpam5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTYzODAsImV4cCI6MjA1NTQ3MjM4MH0.Upq4QVSwzcfryUo0Twe0wiAmtZTEQv4JivSkiLON3ko',
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, { headers });
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
