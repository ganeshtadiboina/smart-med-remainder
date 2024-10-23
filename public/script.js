// Function to set reminders and display them on the webpage
function setReminders(mealTimeInput, beforeMedInput, afterMedInput, mealType) {
    const mealTime = new Date();
    const [hour, minute] = mealTimeInput.split(":");
    mealTime.setHours(hour);
    mealTime.setMinutes(minute);
    mealTime.setSeconds(0);

    // Get current time
    const currentTime = new Date();

    // Calculate time for notifications
    const beforeMealTime = new Date(mealTime.getTime() - 15 * 60000); // 15 minutes before meal
    const afterMealTime = new Date(mealTime.getTime() + 15 * 60000);  // 15 minutes after meal

    // Log times for debugging
    console.log(`${mealType} Meal Time:`, mealTime);
    console.log(`Before ${mealType} Meal Time:`, beforeMealTime);
    console.log(`After ${mealType} Meal Time:`, afterMealTime);
    console.log("Current Time:", currentTime);

    // Check if the times are in the future and set reminders
    let remindersHTML = `<p>Reminders for ${mealType}:</p>`;
    
    if (beforeMealTime > currentTime) {
        const timeBeforeMeal = beforeMealTime - currentTime;
        console.log(`Setting reminder for ${beforeMedInput} before ${mealType} in ${timeBeforeMeal / 60000} minutes.`);
        setTimeout(() => sendNotification(`Take your ${beforeMedInput} before ${mealType}!`), timeBeforeMeal);
        remindersHTML += `<p>Reminder set for taking ${beforeMedInput} before ${mealType} at ${beforeMealTime.toLocaleTimeString()}.</p>`;
    } else {
        console.log(`Before ${mealType} meal time is in the past.`);
    }

    if (afterMealTime > currentTime) {
        const timeAfterMeal = afterMealTime - currentTime;
        console.log(`Setting reminder for ${afterMedInput} after ${mealType} in ${timeAfterMeal / 60000} minutes.`);
        setTimeout(() => sendNotification(`Take your ${afterMedInput} after ${mealType}!`), timeAfterMeal);
        remindersHTML += `<p>Reminder set for taking ${afterMedInput} after ${mealType} at ${afterMealTime.toLocaleTimeString()}.</p>`;
    } else {
        console.log(`After ${mealType} meal time is in the past.`);
    }

    // Update the page to show reminders
    document.getElementById('status').innerText = "Reminders set!";
    document.getElementById('reminder-list').innerHTML = remindersHTML;
    console.log(`Reminders for ${mealType} set successfully.`);
}

// Function to send notifications
function sendNotification(message) {
    console.log(`Sending notification: ${message}`);  // Log the message being sent
    if (Notification.permission === 'granted') {
        new Notification(message);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(message);
            }
        });
    }
}

// Set up event listeners for the buttons
document.getElementById('set-breakfast-reminder').addEventListener('click', function() {
    const mealTimeInput = document.getElementById('breakfast-time').value;
    const beforeMedInput = document.getElementById('breakfast-before-med').value;
    const afterMedInput = document.getElementById('breakfast-after-med').value;

    console.log("Meal Time Input (Breakfast):", mealTimeInput);  // Log the meal time input value
    console.log("Medication Before Breakfast Input:", beforeMedInput);  // Log the medication input value
    console.log("Medication After Breakfast Input:", afterMedInput);  // Log the medication input value

    if (mealTimeInput && beforeMedInput && afterMedInput) {
        setReminders(mealTimeInput, beforeMedInput, afterMedInput, 'Breakfast');
    } else {
        document.getElementById('status').innerText = "Please fill out all fields.";
        console.log("Please fill out all fields.");
    }
});

document.getElementById('set-lunch-reminder').addEventListener('click', function() {
    const mealTimeInput = document.getElementById('lunch-time').value;
    const beforeMedInput = document.getElementById('lunch-before-med').value;
    const afterMedInput = document.getElementById('lunch-after-med').value;

    console.log("Meal Time Input (Lunch):", mealTimeInput);  // Log the meal time input value
    console.log("Medication Before Lunch Input:", beforeMedInput);  // Log the medication input value
    console.log("Medication After Lunch Input:", afterMedInput);  // Log the medication input value

    if (mealTimeInput && beforeMedInput && afterMedInput) {
        setReminders(mealTimeInput, beforeMedInput, afterMedInput, 'Lunch');
    } else {
        document.getElementById('status').innerText = "Please fill out all fields.";
        console.log("Please fill out all fields.");
    }
});

document.getElementById('set-dinner-reminder').addEventListener('click', function() {
    const mealTimeInput = document.getElementById('dinner-time').value;
    const beforeMedInput = document.getElementById('dinner-before-med').value;
    const afterMedInput = document.getElementById('dinner-after-med').value;

    console.log("Meal Time Input (Dinner):", mealTimeInput);  // Log the meal time input value
    console.log("Medication Before Dinner Input:", beforeMedInput);  // Log the medication input value
    console.log("Medication After Dinner Input:", afterMedInput);  // Log the medication input value

    if (mealTimeInput && beforeMedInput && afterMedInput) {
        setReminders(mealTimeInput, beforeMedInput, afterMedInput, 'Dinner');
    } else {
        document.getElementById('status').innerText = "Please fill out all fields.";
        console.log("Please fill out all fields.");
    }
});

// Subscribe the user to push notifications on page load
if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        }
    });
}