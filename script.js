document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Play/Pause video on hover for reel items
    document.querySelectorAll('.reel-item video').forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play();
        });
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0; // Reset video to start
        });
    });

    // Handle click on reel items to open video in a new tab
    document.querySelectorAll('.reel-item').forEach(item => {
        const reelLink = item.querySelector('a'); // Get the anchor tag within the reel item

        if (reelLink) {
            reelLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default download behavior of the <a> tag

                // Get the video URL from the 'data-video-url' attribute in the HTML
                const videoUrl = reelLink.getAttribute('data-video-url');

                if (videoUrl) {
                    // Open a blank new tab
                    const newWindow = window.open('', '_blank');

                    if (newWindow) {
                        // Dynamically write an HTML page into the new tab with a video element
                        newWindow.document.write(`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Linga Bhargav - Reel Playback</title>
                                <style>
                                    body {
                                        margin: 0;
                                        background-color: #000;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        min-height: 100vh;
                                        overflow: hidden; /* Prevent scrollbars */
                                    }
                                    video {
                                        max-width: 100%;
                                        max-height: 90vh; /* Adjust as needed, keeps aspect ratio */
                                        width: auto;
                                        height: auto;
                                    }
                                </style>
                            </head>
                            <body>
                                <video controls autoplay playsinline src="${videoUrl}"></video>
                            </body>
                            </html>
                        `);
                        newWindow.document.close(); // Close the document stream
                    } else {
                        console.error('Failed to open new window. Pop-up blocker might be active.');
                        // Fallback: If new window fails (e.g., due to pop-up blocker),
                        // try opening directly. This might still download depending on browser.
                        window.open(videoUrl, '_blank');
                    }
                }
            });
        }
    });
});
