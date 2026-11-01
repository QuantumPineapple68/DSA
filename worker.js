export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Serve static assets through the Cloudflare ASSETS binding
    const response = await env.ASSETS.fetch(request);
    
    // If found, return with caching headers
    if (response.status !== 404) {
      return response;
    }
    
    // Fallback to index.html for SPA routing if needed
    return env.ASSETS.fetch(new Request(new URL('/', request.url), request));
  }
};
