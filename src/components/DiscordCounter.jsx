import React, { useState, useEffect } from 'react';

const DiscordCounter = () => {
    const [onlineCount, setOnlineCount] = useState(null);

    useEffect(() => {
        const fetchCount = () => {
            // This is the new, reliable URL that points to the function we just made.
            const apiUrl = '/api/discord-widget';

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok.');
                    return response.json();
                })
                .then(data => {
                    if (data.presence_count !== undefined) {
                        setOnlineCount(data.presence_count);
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
    }, []);

    return (
        <div className="mt-4 text-lg text-theme-secondary">
            Join <span className="font-bold text-klar">{onlineCount === null ? '...' : onlineCount}</span> members online now!
        </div>
    );
};

export default DiscordCounter;
