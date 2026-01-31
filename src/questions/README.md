# Question Bank Structure

The mock test questions have been organized into separate files for better maintainability and scalability.

## Directory Structure

```
src/data/questions/
├── index.js                    # Main export file for all questions
├── jee/
│   ├── physics.js             # JEE Physics questions
│   ├── chemistry.js           # JEE Chemistry questions
│   └── mathematics.js         # JEE Mathematics questions
└── neet/
    ├── physics.js             # NEET Physics questions
    ├── chemistry.js           # NEET Chemistry questions
    └── biology.js             # NEET Biology questions
```

## How to Use

### In MockTest Component

The questions are imported automatically:

```jsx
import { questionBank } from '../data/questions';

// Access questions like this:
const subjectQuestions = questionBank[user.examType][selectedSubject];
```

### Question Format

Each question file exports an array of question objects with the following structure:

```javascript
export const jeePhysicsQuestions = [
    {
        id: 1,                                    // Unique ID
        question: "Question text here?",          // The question
        options: ["Option A", "Option B", ...],   // Multiple choice options
        correct: 0,                               // Index of correct answer
        topic: "Mechanics",                       // Topic classification
        difficulty: "easy"                        // Difficulty level (easy/medium/hard)
    },
    // ... more questions
];
```

## Adding New Questions

1. **For JEE**: Add questions to the appropriate subject file in `src/data/questions/jee/`
2. **For NEET**: Add questions to the appropriate subject file in `src/data/questions/neet/`
3. **Update index.js**: If adding a new exam type or subject, update `src/data/questions/index.js`

### Example: Adding a new JEE Physics question

```javascript
// src/data/questions/jee/physics.js

{
    id: 6,
    question: "Your new question here?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 2,
    topic: "Thermodynamics",
    difficulty: "medium"
}
```

## Benefits of This Structure

✅ **Better Organization**: Questions are separated by exam type and subject  
✅ **Easy Maintenance**: Easier to update and add new questions  
✅ **Scalability**: Can easily add more exam types (AIEE, NATA, etc.)  
✅ **Code Cleanliness**: MockTest component is now cleaner and more focused  
✅ **Reusability**: Question data can be used in other components  
✅ **Modular**: Each subject is independent and can be modified without affecting others

## Current Questions Count

- **JEE**: 15 questions total (5 per subject)
  - Physics: 5 questions
  - Chemistry: 5 questions
  - Mathematics: 5 questions

- **NEET**: 15 questions total (5 per subject)
  - Physics: 5 questions
  - Chemistry: 5 questions
  - Biology: 5 questions
