document.addEventListener('DOMContentLoaded', () => {
    // --- Hover playback for reel thumbnails ---
    const reelItems = document.querySelectorAll('.reel-item');

    reelItems.forEach(item => {
        const thumbnailVideo = item.querySelector('video');

        item.addEventListener('mouseenter', () => {
            if (thumbnailVideo) {
                thumbnailVideo.currentTime = 0; // Reset video to start
                thumbnailVideo.play();
            }
        });

        item.addEventListener('mouseleave', () => {
            if (thumbnailVideo) thumbnailVideo.pause();
        });

        // --- Handle click to play reel in new tab ---
        const reelLink = item.querySelector('a'); // Get the anchor tag within the reel item
        if (reelLink) {
            reelLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default download behavior of the <a> tag

                const videoUrl = reelLink.getAttribute('data-video-url'); // Get the video URL from the data attribute

                if (videoUrl) {
                    // Create a new tab and dynamically add a video element to it
                    const newWindow = window.open('', '_blank'); // Open a blank new tab
                    if (newWindow) {
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
                        // Fallback: If new window fails, try opening directly in a new tab (might still download)
                        // This fallback is less ideal but better than nothing
                        window.open(videoUrl, '_blank');
                    }
                }
            });
        }
    });

    // --- Copy to clipboard functionality ---
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSelector = button.dataset.clipboardTarget;
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                const textToCopy = targetElement.innerText;

                // Use the modern Clipboard API for better practice
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy)
                        .then(() => {
                            button.innerHTML = '<i class="fas fa-check"></i>';
                            button.classList.add('copied');
                            setTimeout(() => {
                                button.innerHTML = '<i class="fas fa-copy"></i>';
                                button.classList.remove('copied');
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Copy failed (Clipboard API):', err);
                            // Fallback to old method if Clipboard API fails
                            fallbackCopyTextToClipboard(textToCopy, button);
                        });
                } else {
                    // Fallback for older browsers
                    fallbackCopyTextToClipboard(textToCopy, button);
                }
            }
        });
    });

    function fallbackCopyTextToClipboard(textToCopy, button) {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed'; // Prevent scrolling to bottom of page in iOS.
        textArea.style.opacity = '0'; // Hide the textarea
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.classList.add('copied');
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i>';
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Copy failed (execCommand):', err);
        }
        document.body.removeChild(textArea);
    }
});
