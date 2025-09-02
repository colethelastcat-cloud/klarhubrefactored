import React, { useState, useEffect } from 'react';

const DiscordCounter = () => {
    const [onlineCount, setOnlineCount] = useState(null);
    const serverId = '1357439616877072545'; // Your Server ID

    useEffect(() => {
        const fetchCount = () => {
            // NOTE: This uses a public CORS proxy which can be unreliable.
            // For production, it's better to create your own serverless function.
            const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://discord.com/api/guilds/${serverId}/widget.json`)}`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok.');
                    return response.json();
                })
                .then(data => {
                    const discordData = JSON.parse(data.contents);
                    if (discordData.presence_count !== undefined) {
                        setOnlineCount(discordData.presence_count);
                    } else {
                        setOnlineCount('N/A');
                    }
                })
                .catch(error => {
                    console.error("Error fetching Discord data:", error);
                    setOnlineCount('Error');
                });
        };

        fetchCount();
        const interval = setInterval(fetchCount, 60000); // Fetch every minute

        return () => clearInterval(interval);
    }, [serverId]);

    return (
        <div className="mt-4 text-lg text-theme-secondary">
            Join <span className="font-bold text-klar">{onlineCount === null ? '...' : onlineCount}</span> members online now!
        </div>
    );
};

export default DiscordCounter;
