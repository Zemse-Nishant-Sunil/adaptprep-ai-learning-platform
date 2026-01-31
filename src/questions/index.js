// JEE Questions
import { jeePhysicsQuestions } from './jee/physics';
import { jeeChemistryQuestions } from './jee/chemistry';
import { jeeMatematicsQuestions } from './jee/mathematics';

// NEET Questions
import { neetPhysicsQuestions } from './neet/physics';
import { neetChemistryQuestions } from './neet/chemistry';
import { neetBiologyQuestions } from './neet/biology';

export const questionBank = {
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
