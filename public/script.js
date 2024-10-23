// Function to set reminders and display them on the webpage
function setReminders(mealTimeInput, medicationInput, mealType) {
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
    let remindersHTML = `<p>Reminders for ${mealType} - ${medicationInput}:</p>`;
    
    if (beforeMealTime > currentTime) {
        const timeBeforeMeal = beforeMealTime - currentTime;
        console.log(`Setting reminder for ${medicationInput} before ${mealType} meal in ${timeBeforeMeal / 60000} minutes.`);
        setTimeout(() => sendNotification(`Take your ${medicationInput} before ${mealType}!`), timeBeforeMeal);
        remindersHTML += `<p>Reminder set for taking ${medicationInput} before ${mealType} at ${beforeMealTime.toLocaleTimeString()}.</p>`;
    } else {
        console.log(`Before ${mealType} meal time is in the past.`);
    }

    if (afterMealTime > currentTime) {
        const timeAfterMeal = afterMealTime - currentTime;
        console.log(`Setting reminder for ${medicationInput} after ${mealType} meal in ${timeAfterMeal / 60000} minutes.`);
        setTimeout(() => sendNotification(`Take your ${medicationInput} after ${mealType}!`), timeAfterMeal);
        remindersHTML += `<p>Reminder set for taking ${medicationInput} after ${mealType} at ${afterMealTime.toLocaleTimeString()}.</p>`;
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
document.getElementById('set-reminder').addEventListener('click', function() {
    const mealTimeInput = document.getElementById('meal-time').value;
    const medicationInput = document.getElementById('medication').value;
    
    console.log("Meal Time Input:", mealTimeInput);  // Log the meal time input value
    console.log("Medication Input:", medicationInput);  // Log the medication input value

    if (mealTimeInput && medicationInput) {
        setReminders(mealTimeInput, medicationInput, 'Breakfast');
    } else {
        document.getElementById('status').innerText = "Please fill out all fields.";
        console.log("Please fill out all fields.");
    }
});

// Subscribe the user to push notifications on page load
subscribeUserToPush();