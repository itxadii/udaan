document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-background video');
    
    // Function to handle video playback
    function handleVideoPlayback() {
        // Try to play the video
        const playPromise = video.play();
        
        // Handle the play promise
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Playback started successfully
                console.log('Video playback started');
            })
            .catch(error => {
                // Auto-play was prevented
                console.log('Auto-play was prevented:', error);
                
                // Add a play button for user interaction
                const playButton = document.createElement('button');
                playButton.className = 'video-play-button';
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                document.querySelector('.video-background').appendChild(playButton);
                
                // Play video on button click
                playButton.addEventListener('click', function() {
                    video.play();
                    playButton.style.display = 'none';
                });
            });
        }
    }
    
    // Handle video playback
    handleVideoPlayback();
    
    // Handle visibility change (when user switches tabs)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            handleVideoPlayback();
        } else {
            video.pause();
        }
    });
});