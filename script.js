let activities = [
  { id: 1, name: "Wake up early", completed: false },
  { id: 2, name: "Drink enough water", completed: false },
  { id: 3, name: "Exercise for 30 minutes", completed: false },
  { id: 4, name: "Study for 1 hour", completed: false },
  { id: 5, name: "Read a book", completed: false },
  { id: 6, name: "Sleep on time", completed: false }
];

const activityList = document.getElementById("activityList");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const doneMessage = document.getElementById("doneMessage");
const activityInput = document.getElementById("activityInput");
const addBtn = document.getElementById("addBtn");

function showActivities() {
  activityList.innerHTML = "";

  for (let i = 0; i < activities.length; i++) {
    let activity = activities[i];

    let card = document.createElement("div");
    card.classList.add("activity-card");

    if (activity.completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
      <div class="activity-info">
        <h3>${activity.name}</h3>
        <p class="status">${activity.completed ? "Completed" : "Pending"}</p>
      </div>
      <div class="button-group">
        <button class="complete-btn" onclick="completeActivity(${activity.id})">Mark as Completed</button>
        <button class="cancel-btn" onclick="cancelActivity(${activity.id})">Cancel</button>
        <button class="delete-btn" onclick="deleteActivity(${activity.id})">Delete</button>
      </div>
    `;

    activityList.appendChild(card);
  }

  updateProgress();
}

function completeActivity(id) {
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].id === id) {
      activities[i].completed = true;
    }
  }

  showActivities();
}

function cancelActivity(id) {
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].id === id) {
      activities[i].completed = false;
    }
  }

  showActivities();
}

function deleteActivity(id) {
  activities = activities.filter(function(activity) {
    return activity.id !== id;
  });

  showActivities();
}

function addActivity() {
  let newActivity = activityInput.value.trim();

  if (newActivity === "") {
    return;
  }

  let newId = Date.now();

  activities.push({
    id: newId,
    name: newActivity,
    completed: false
  });

  activityInput.value = "";
  showActivities();
}

function updateProgress() {
  let completedCount = 0;

  for (let i = 0; i < activities.length; i++) {
    if (activities[i].completed) {
      completedCount++;
    }
  }

  let total = activities.length;

  progressText.textContent = `${completedCount} out of ${total} activities completed`;

  let percentage = 0;

  if (total > 0) {
    percentage = (completedCount / total) * 100;
  }

  progressFill.style.width = percentage + "%";

  if (total > 0 && completedCount === total) {
    doneMessage.textContent = "🎉 All activities completed!";
  } else {
    doneMessage.textContent = "";
  }
}

addBtn.addEventListener("click", addActivity);

activityInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addActivity();
  }
});

showActivities();