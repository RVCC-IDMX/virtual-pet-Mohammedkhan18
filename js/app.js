/**
 * app.js
 *
 * Main application file that handles UI interactions and updates.
 * Import your Pet constructor and related constants from pet.js
 */


import { Pet, PetTypes, States } from './pet.js';

// Application state variables
let currentPet = null;
let updateInterval = null; 
const elements = {
  petDisplay: document.getElementById('pet-display'),
  statusDisplay: document.getElementById('status-display'),
  petSelector: document.getElementById('pet-selector'),
  nameInput: document.getElementById('pet-name'),
  createButton: document.getElementById('create-pet'),
  feedButton: document.getElementById('feed-pet'),
  resetButton: document.getElementById('reset-pet'),
  infoDisplay: document.getElementById('info-display'),
  moodBar: document.getElementById('mood-bar'),
};


/**
 * Initialize the application
 *
 * TODO: Implement this function to:
 * - Select and store DOM elements
 * - Populate the pet selector dropdown
 * - Set up event listeners
 * - Show the pet creation UI
 */
function initApp() {

  populatePetSelector();


  setupEventListeners();

  showCreationUI();
}

/**
 * Populate the pet selector dropdown
 *
 * TODO: Implement this function to:
 * - Add an option for each pet type
 * - Set a default selected type
 */
function populatePetSelector() {
  const selector = elements.petSelector;
  if (!selector) {
    return;
  }

  selector.innerHTML = '';

  Object.entries(PetTypes).forEach(([key, value]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = key.charAt(0) + key.slice(1).toLowerCase();
    selector.appendChild(option);
  });

  selector.value = PetTypes.COW;
}


/**
 * Set up event listeners for buttons and interactions
 *
 * TODO: Implement this function to:
 * - Add event listeners for the create, feed, and reset buttons
 */
function setupEventListeners() {
  elements.createButton?.addEventListener('click', createNewPet);
  elements.feedButton?.addEventListener('click', feedPet);
  elements.resetButton?.addEventListener('click', resetPet);
}

/**
 * Create a new pet based on form selections
 *
 * TODO: Implement this function to:
 * - Get the selected pet type and name
 * - Create a new Pet instance
 * - Update the UI to show the pet
 * - Start the update cycle
 */
function createNewPet() {
  const type = elements.petSelector?.value || PetTypes;
  let name = elements.nameInput?.value.trim() || '';

  if (!name) {
    name = type.charAt(0).toUpperCase() + type.slice(1);
  }

  currentPet = new Pet(name, type);

  hideCreationUI();
  updatePetDisplay();
  startUpdateCycle();
}

/**
 * Hide the pet creation UI and show the pet interaction UI
 */
function hideCreationUI() {
  document.getElementById('pet-creation')?.classList.add('hidden');
  document.getElementById('pet-interaction')?.classList.remove('hidden');
}

/**
 * Show the pet creation UI and hide the pet interaction UI
 */
function showCreationUI() {
  document.getElementById('pet-creation')?.classList.remove('hidden');
  document.getElementById('pet-interaction')?.classList.add('hidden');
}

/**
 * Update the pet display and status elements
 *
 * TODO: Implement this function to:
 * - Update the pet's visual representation
 * - Update the status message
 * - Update the mood indicator
 * - Update the information display
 */
function updatePetDisplay() {
  if (!currentPet) {
    return;
  }

  if (elements.petDisplay) {
    elements.petDisplay.textContent = currentPet.appearance;
    elements.petDisplay.className = `pet-display pet-${currentPet.state}`;
  }

  if (elements.statusDisplay) {
    elements.statusDisplay.textContent = currentPet.getStatusMessage();
  }

  updateMoodBar();
  updateInfoDisplay();
}

/**
 * Update the mood level display bar
 *
 * TODO: Implement this function to:
 * - Set the width of the mood bar based on the pet's mood level
 * - Change the color based on the mood level
 */
function updateMoodBar() {
  if (!elements.moodBar || !currentPet) {
    return;
  }

  elements.moodBar.style.width = `${currentPet.moodLevel}%`;

  if (currentPet.moodLevel >= 75) {
    elements.moodBar.style.backgroundColor = '#4caf50';
  } else if (currentPet.moodLevel >= 45) {
    elements.moodBar.style.backgroundColor = '#ff9800';
  } else {
    elements.moodBar.style.backgroundColor = '#ff4336';
  }

}

/**
 * Update the information display panel
 *
 * TODO: Implement this function to:
 * - Show the pet's name, type, state, etc.
 * - Display the mood level bar
 * - Show timestamps for creation and last feeding
 */
function updateInfoDisplay() {
  if (!elements.infoDisplay || !currentPet) {
    return;
  }

  const lastFedTime = currentPet.lastFed.toLocaleTimeString();
  const createdTime = currentPet.created.toLocaleTimeString();

  elements.infoDisplay.innerHTML = `
  Name:
  ${currentPet.name}

  Type:
  ${currentPet.type}


  Mood:
  ${currentPet.state} (${currentPet.moodLevel})

  Mood Level:


  Last Fed:
  ${lastFedTime}


  created
  ${createdTime}


  `;

  updateMoodBar();
}

/**
 * Feed the current pet
 *
 * TODO: Implement this function to:
 * - Call the pet's feed method
 * - Update the display with the new state
 */
function feedPet() {
  if (!currentPet) {
    return;
  }

  const message = currentPet.feed();

  if (elements.statusDisplay) {
    elements.statusDisplay.textContent = message;
  }

  updatePetDisplay();

}

/**
 * Reset the pet simulator
 *
 * TODO: Implement this function to:
 * - Clear the update interval
 * - Reset the current pet
 * - Clear the displays
 * - Show the creation UI
 */
function resetPet() {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }

  currentPet = null;

  if (elements.petDisplay) {
    elements.petDisplay.textContent = '';
  }
  if (elements.statusDisplay) {
    elements.statusDisplay.textContent = '';
  }
  if (elements.infoDisplay) {
    elements.infoDisplay.innerHTML = '';
  }
  if (elements.moodBar) {
    elements.moodBar.style.width = '0%';
    elements.moodBar.style.backgroundColor = '#CCC';
  }

  showCreationUI();

}

/**
 * Start the regular update cycle
 *
 * TODO: Implement this function to:
 * - Clear any existing update interval
 * - Set up a new interval that:
 *   - Updates the pet's state
 *   - Updates the display
 */
function startUpdateCycle() {
  if (updateInterval) {
    clearInterval(updateInterval);
  }

  updateInterval = setInterval(() => {
    if (currentPet) {
      currentPet.updateState();
      updatePetDisplay();
    }
  }, 1000);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
