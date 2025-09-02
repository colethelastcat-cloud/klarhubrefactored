// This function runs on Vercel's servers, not in the browser.
export default async function handler(request, response) {
  const serverId = '1357439616877072545'; // Your Discord Server ID
  const discordApiUrl = `https://discord.com/api/guilds/${serverId}/widget.json`;

  try {
    // Fetch the data from Discord's official API
    const discordResponse = await fetch(discordApiUrl);
    
    if (!discordResponse.ok) {
      // If Discord returns an error, pass it along
      return response.status(discordResponse.status).json({ error: 'Failed to fetch data from Discord.' });
    }
    
    // Get the JSON data from Discord's response
    const data = await discordResponse.json();
    
    // Set the caching policy (tells browsers to cache for 5 minutes)
    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    
    // Send the data back to your website
    return response.status(200).json(data);

  } catch (error) {
    console.error('Error fetching Discord widget:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
