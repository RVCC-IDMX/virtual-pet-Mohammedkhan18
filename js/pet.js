/**
 * pet.js
 *
 * This file should contain your Pet constructor function and prototype methods.
 * Export your Pet constructor and any necessary constants to be used in app.js.
 */

const PetTypes = {
  CAT: 'cat',
  DOG: 'dog',
  PARROT: 'parrot',
  FISH: 'fish',
  FISH: 'cow'
};



const States = {
  ECSTATIC: 'ecstatic',
  HAPPY: 'happy',
  CONTENT: 'content',
  NEUTRAL: 'neutral',
  BORED: 'bored',
  SAD: 'sad',
  MISERABLE: 'miserable'
};

const SpeechPhrases = {
  ecstatic: [
    'I\'m having the best day ever!',
    'This is amazing!',
    'I couldn\'t be happier!',
    'Best. Day. Ever!',
    'You\'re the greatest!'
  ],
  happy: [
    'I\'m so happy right now!',
    'What a wonderful day!',
    'You\'re awesome!',
    'Life is good!',
    'I\'m feeling great!'
  ],
  content: [
    'This is nice.',
    'I\'m pretty content.',
    'Things are going well.',
    'I\'m feeling good.',
    'No complaints here.'
  ],
  neutral: [
    'Just another day.',
    'I\'m okay, I guess.',
    'Nothing special happening.',
    'Meh, I\'m fine.',
    'Just hanging out.'
  ],
  bored: [
    'I\'m getting a bit bored...',
    'Is there anything to do?',
    'Kinda dull around here.',
    'I could use some attention.',
    'Not much going on.'
  ],
  sad: [
    'I\'m feeling a bit sad.',
    'Could use some cheering up.',
    'Having a rough day.',
    'I miss you.',
    'I could really use a snack.'
  ],
  miserable: [
    'I\'m really hungry...',
    'Please don\'t forget about me!',
    'I need some attention!',
    'I\'m not feeling well at all.',
    'Help! I need food!'
  ]
};

const petArt = {
  cat: {
    ecstatic: `
    ^_____^
    (=^-^=)`,
    happy: `
    ^_____^
    (=^_^=)`,
    content: `
    ^_____^
    (=o_o=)`,
    neutral: `
    ^_____^
    (=0_0=)`,
    bored: `
    ^_____^
    (=-_-=)`,
    sad: `
    ^_____^
    (=*-*=)`,
    miserable: `
    ^_____^
    (=T-T=)`,
  },
  dog: {
    ecstatic: `
    {(^w^)}`,
    happy: `
    {(^_^)}`,
    content: `
    {(^_o)}`,
    neutral: `
    {(o-o)}`,
    bored: `
    {(U-U)}`,
    sad: `
    {(0-0)}`,
    miserable: `
    {(T-T)}`,
  },
  fish: {
    ecstatic: `
    >{ B) )`,
    happy: `
    >{ ;) )`,
    content: `
    >{ :) )
    `,
    neutral: `
    >{ :| )`,
    bored: `
    >{ :\ )`,
    sad: `
    >{ :( )`,
    miserable: `
    >{ :,( )`
  },
  parrot: {
    ecstatic: `
   \\_
  (o>
 //\\
`.trim(),

    happy: `
   \\_
  (o>
 <))\\
`.trim(),

    content: `
   \\_
  (o>
 //
`.trim(),

    neutral: `
   \\_
  (o>
  /|
`.trim(),

    bored: `
   \\_
  (o.
  /|
`.trim(),

    sad: `
   \\_
  (._)
  /|
`.trim(),

    miserable: `
   \\_
  (;_;)
  /|
`.trim()
  }
};

/**
 * Pet constructor function
 *
 * TODO: Implement this constructor function that creates a virtual pet
 * Parameters should include type and name
 * Initialize properties for tracking mood, state, and timestamps
 */
function Pet(name, type) {
  this.name = name || 'Bubblie';
  this.type = type || PetTypes.FISH;


  this.moodLevel = 80;
  this.state = States.HAPPY;

  this.lastFed = new Date();
  this.created = new Date();



  this.isSpeaking = false;
  this.speechText = '';
  this.speechTimeout = null;

  this.updateAppearance();


}

/**
 * Feed the pet
 *
 * TODO: Implement this method to feed the pet, which should:
 * - Increase the pet's mood level
 * - Update the last fed timestamp
 * - Update the pet's state
 * - Return a message about the feeding
 */
Pet.prototype.feed = function () {
  this.moodLevel = Math.min(100, this.moodLevel + 20);
  this.lastFed = new Date();
  this.updateState();
  this.speak('Yum! That food was delicious!');
  return `${this.name} has been fed and is ${this.state}`;
};


/**
 * Check if the pet is hungry
 *
 * TODO: Implement this method to determine if the pet is hungry based on
 * how much time has passed since it was last fed
 */
Pet.prototype.isHungry = function () {
  const now = new Date();
  const timeSinceLastFed = now - this.lastFed;
  const hungerTime = 60 * 1000;
  return timeSinceLastFed > hungerTime;
};

/**
 * Update the pet's state based on mood level
 *
 * TODO: Implement this method to:
 * - Update the pet's mood based on time passed
 * - Set the appropriate state based on mood level
 * - Occasionally trigger random thoughts
 * - Update the pet's appearance
 */
Pet.prototype.updateState = function () {
  if (this.isHungry()) {
    this.moodLevel = Math.max(0, this.moodLevel - 2);
  }
  if (this.moodLevel >= 90) {
    this.state = States.ECSTATIC;
  } else if (this.moodLevel >= 75) {
    this.state = States.HAPPY;
  } else if (this.moodLevel >= 60) {
    this.state = States.CONTENT;
  } else if (this.moodLevel >= 45) {
    this.state = States.NEUTRAL;
  } else if (this.moodLevel >= 30) {
    this.state = States.BORED;
  } else if (this.moodLevel >= 15) {
    this.state = States.SAD;
  } else {
    this.state = States.MISERABLE;
  }

  if (Math.random() < 0.15 && !this.isSpeaking) {
    this.speakRandomThought();
  }

  this.updateAppearance();

  return this.state;
};


/**
 * Make the pet speak a random thought based on its mood
 *
 * TODO: Implement this method to have the pet express a random thought
 * appropriate to its current mood
 */
Pet.prototype.speakRandomThought = function () {
  const phrases = SpeechPhrases[this.state.toLowerCase()] || speechPhrases.neutral;

  const randomIndex = Math.floor(Math.random() * phrases.length);
  const phrase = phrases[randomIndex];

  this.speak(phrase)
};

/**
 * Make the pet say something
 *
 * TODO: Implement this method to display a speech bubble with text
 * and clear it after a few seconds
 */
Pet.prototype.speak = function (text) {
  if (this.speechTimeout) {
    clearTimeout(this.speechTimeout);
  }

  this.isSpeaking = true;
  this.speechText = text;

  this.speechTimeout = setTimeout(() => {
    this.isSpeaking = false;
    this.speechText = '';
    this.updateAppearance();
  }, 4000);

  this.updateAppearance();
};


/**
 * Get a status message based on the pet's current state
 *
 * TODO: Implement this method to return an appropriate message
 * describing the pet's current mood state
 */
Pet.prototype.getStatusMessage = function () {
  switch (this.state) {
    case States.ECSTATIC:
      return `${this.name} is absolutely ecstatic!`;
    case States.HAPPY:
      return `${this.name} is very happy!`;
    case States.CONTENT:
      return `${this.name} is content.`;
    case States.NEUTRAL:
      return `${this.name} is doing okay.`;
    case States.BORED:
      return `${this.name} seems a bit bored.`;
    case States.SAD:
      return `${this.name} is feeling sad.`;
    case States.MISERABLE:
      return `${this.name} is miserable and very hungry!`;
    default:
      return `${this.name} is here.`;
  }
};

/**
 * Update the pet's appearance based on its type and state
 *
 * TODO: Implement this method to set the pet's appearance property
 * based on its current type and state
 * Include speech bubble if the pet is speaking
 */
Pet.prototype.updateAppearance = function () {
  const typeArt = petArt[this.type] || petArt[PetTypes.FISH];
  const art = typeArt[this.state] || typeArt[States.HAPPY];

  if (this.isSpeaking && this.speechText) {
    const bubbleWidth = Math.min(40, Math.max(this.speechText.length + 4, 10));
    const topBubble = ' ' + '_'.repeat(bubbleWidth);
    const bottomBubble = ' ' + '-'.repeat(bubbleWidth);
    const textLine = '| ' + this.speechText.padEnd(bubbleWidth - 2, ' ') + ' |';

    this.appearance = `${topBubble}\n${textLine}\n${bottomBubble}\n \\\n  ${art}`;
  } else {
    this.appearance = art;
  }
};


export {
  Pet,
  PetTypes,
  States
};
