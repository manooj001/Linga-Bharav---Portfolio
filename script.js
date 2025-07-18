document.addEventListener('DOMContentLoaded', () => {
  // --- Hover playback for reel thumbnails ---
  const reelItems = document.querySelectorAll('.reel-item');

  reelItems.forEach(item => {
    const thumbnailVideo = item.querySelector('video');

    item.addEventListener('mouseenter', () => {
      if (thumbnailVideo) thumbnailVideo.play();
    });

    item.addEventListener('mouseleave', () => {
      if (thumbnailVideo) thumbnailVideo.pause();
    });
  });

  // --- Copy to clipboard functionality ---
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetSelector = button.dataset.clipboardTarget;
      const targetElement = document.querySelector(targetSelector);

      if (targetElement) {
        const textToCopy = targetElement.innerText;

        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
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
          console.error('Copy failed:', err);
        }

        document.body.removeChild(textArea);
      }
    });
  });
});
