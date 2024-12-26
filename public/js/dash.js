// const dateSection = document.getElementById('date-section');
// const resetSection = document.getElementById('reset-section');
// const countdownValue = document.getElementById('a');
// let targetDate;
// let interval;

// // Function to handle custom date logic
// function setCustomDate() {
//     const customDateInput = document.getElementById('custom-date').value;

//     if (customDateInput) {
//         targetDate = new Date(customDateInput).getTime();

//         if (interval) {
//             clearInterval(interval);
//         }

//         interval = setInterval(updateCountdown, 1000);

//         // Hide the date input field and show the Reset button
//         dateSection.style.display = 'none';
//         resetSection.style.display = 'block';
//     } else {
//         alert('Please select a valid date.');
//     }
// }

// // Countdown logic
// function formatTime(number) {
//     return number < 10 ? `0${number}` : number;
// }

// function updateCountdown() {
//     if (!targetDate) {
//         countdownValue.innerHTML = `
//             <h2>00</h2>
//             <p>Days</p>
//         `;
//         return;
//     }

//     const now = new Date().getTime();
//     const timeLeft = targetDate - now;

//     if (timeLeft <= 0) {
//         countdownValue.innerHTML = `
//             <h2>00</h2>
//             <p>Event Over</p>
//         `;
//         clearInterval(interval);
//     } else {
//         const daysLeft = Math.floor(timeLeft / 1000 / 60 / 60 / 24);

//         countdownValue.innerHTML = `
//             <h2>${formatTime(daysLeft)}</h2>
//             <p>Days</p>
//         `;
//     }
// }

// // Reset Countdown Logic
// function resetCountdown() {
//     clearInterval(interval); // Stop the countdown interval
//     interval = null;
//     targetDate = null;

//     // Show the date input field and hide the reset button
//     dateSection.style.display = 'flex';
//     resetSection.style.display = 'none';

//     countdownValue.innerHTML = `
//         <h2>00</h2>
//         <p>Days</p>
//     `;
// }


const dateSection = document.getElementById('date-section');
const resetSection = document.getElementById('reset-section');
const countdownValue = document.getElementById('a');
let targetDate;
let interval;

// Function to handle custom date logic
function setCustomDate() {
    const customDateInput = document.getElementById('custom-date').value;

    if (customDateInput) {
        targetDate = new Date(customDateInput).getTime();
        if (interval) {
            clearInterval(interval);
        }

        interval = setInterval(updateCountdown, 1000);

        // Hide the date input field and show the Reset button
        dateSection.style.display = 'none';
        resetSection.style.display = 'block';
    } else {
        alert('Please select a valid date.');
    }
}

// Countdown logic
function formatTime(number) {
    return number < 10 ? `0${number}` : number;
}

function updateCountdown() {
    if (!targetDate) {
        countdownValue.innerHTML = `
            <h2>00</h2>
            <p>Days</p>
        `;
        return;
    }

    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        countdownValue.innerHTML = `
            <h2>00</h2>
            <p>Event Over</p>
        `;
        clearInterval(interval);
    } else {
        const daysLeft = Math.floor(timeLeft / 1000 / 60 / 60 / 24);

        countdownValue.innerHTML = `
            <h2>${formatTime(daysLeft)}</h2>
            <p>Days</p>
        `;
        countdownValue.style.color = '#ff5733';
    }
}

// Reset Countdown Logic
function resetCountdown() {
    clearInterval(interval); // Stop the countdown interval
    interval = null;
    targetDate = null;

    // Show the date input field and hide the reset button
    dateSection.style.display = 'flex';
    resetSection.style.display = 'none';

    countdownValue.innerHTML = `
        <h2>00</h2>
        <p>Days</p>
    `;
}
