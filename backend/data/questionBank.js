// Import JEE subject questions
const { jeePhysicsQuestions } = require('./subjects/jee/physics');
const { jeeChemistryQuestions } = require('./subjects/jee/chemistry');
const { jeeMatematicsQuestions } = require('./subjects/jee/mathematics');

// Import NEET subject questions
const { neetPhysicsQuestions } = require('./subjects/neet/physics');
const { neetChemistryQuestions } = require('./subjects/neet/chemistry');
const { neetBiologyQuestions } = require('./subjects/neet/biology');

// Combine into a single question bank
const questionBank = {
    jee: {
        physics: jeePhysicsQuestions,
        chemistry: jeeChemistryQuestions,
        mathematics: jeeMatematicsQuestions
    },
    neet: {
        physics: neetPhysicsQuestions,
        chemistry: neetChemistryQuestions,
        biology: neetBiologyQuestions
    }
};

module.exports = { questionBank };
