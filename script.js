document.addEventListener('DOMContentLoaded', () => {

    // --- Interactive Reel Gallery ---
    const mainVideo = document.getElementById('main-video');
    const reelItems = document.querySelectorAll('.reel-item');

    reelItems.forEach(item => {
        // Play thumbnail videos on hover for a dynamic feel
        const thumbnailVideo = item.querySelector('video');
        item.addEventListener('mouseenter', () => {
            if (thumbnailVideo) {
                thumbnailVideo.play();
            }
        });
        item.addEventListener('mouseleave', () => {
            if (thumbnailVideo) {
                thumbnailVideo.pause();
            }
        });

        // Click to change the main video source
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video-src');
            if (videoSrc && mainVideo) {
                mainVideo.src = videoSrc;
                mainVideo.play(); // Autoplay the new video
            }
        });
    });

    // --- Copy to Clipboard Functionality ---
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSelector = button.dataset.clipboardTarget;
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                const textToCopy = targetElement.innerText;
                
                // Use a temporary textarea to copy text
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    // Visual feedback
                    const originalIcon = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    button.classList.add('copied');

                    setTimeout(() => {
                        button.innerHTML = originalIcon;
                        button.classList.remove('copied');
                    }, 2000); // Revert back after 2 seconds

                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    // You could show an error message to the user here
                }
                document.body.removeChild(textArea);
            }
        });
    });

});
