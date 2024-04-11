// Get references to DOM elements
const stopwatch = document.getElementById('stopwatch'); // Reference to the stopwatch display
const playPauseButton = document.getElementById('play-pause'); // Reference to the play/pause button
const secondsSphere = document.getElementById('seconds-sphere'); // Reference to the rotating seconds sphere

// Variables to control the stopwatch
let stopwatchInterval; // Stores the interval for updating the stopwatch
let runningTime = 0; // Tracks the running time of the stopwatch

// Function to toggle play/pause state
const playPause = () => {
    const isPaused = !playPauseButton.classList.contains('running'); // Check if stopwatch is paused
    if (isPaused) { // If paused, start the stopwatch
        playPauseButton.classList.add('running'); // Add 'running' class to button to indicate it's running
        start(); // Start the stopwatch
    } else { // If running, pause the stopwatch
        playPauseButton.classList.remove('running'); // Remove 'running' class to indicate it's paused
        pause(); // Pause the stopwatch
    }
}

// Function to pause the stopwatch
const pause = () => {
    secondsSphere.style.animationPlayState = 'paused'; // Pause the animation of the seconds sphere
    clearInterval(stopwatchInterval); // Clear the interval to stop updating the stopwatch
}

// Function to stop the stopwatch
const stop = () => {
    secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)'; // Reset the position of the seconds sphere
    secondsSphere.style.animation = 'none'; // Stop the animation of the seconds sphere
    playPauseButton.classList.remove('running'); // Remove 'running' class to indicate it's stopped
    runningTime = 0; // Reset the running time
    clearInterval(stopwatchInterval); // Clear the interval to stop updating the stopwatch
    stopwatch.textContent = '00:00'; // Reset the stopwatch display to '00:00'
}

// Function to start the stopwatch
const start = () => {
    secondsSphere.style.animation = 'rotacion 60s linear infinite'; // Start the animation of the seconds sphere
    let startTime = Date.now() - runningTime; // Calculate start time based on current time and running time
    secondsSphere.style.animationPlayState = 'running'; // Set animation state to running
    stopwatchInterval = setInterval(() => { // Update stopwatch display every second
        runningTime = Date.now() - startTime; // Calculate running time
        stopwatch.textContent = calculateTime(runningTime); // Update stopwatch display
    }, 1000); // Interval set to 1000ms (1 second)
}

// Function to calculate time in minutes and seconds format
const calculateTime = runningTime => {
    const total_seconds = Math.floor(runningTime / 1000); // Calculate total seconds
    const total_minutes = Math.floor(total_seconds / 60); // Calculate total minutes

    const display_seconds = (total_seconds % 60).toString().padStart(2, '0'); // Calculate display seconds
    const display_minutes = total_minutes.toString().padStart(2, '0'); // Calculate display minutes

    return `${display_minutes}:${display_seconds}`; // Return formatted time string (MM:SS)
}
