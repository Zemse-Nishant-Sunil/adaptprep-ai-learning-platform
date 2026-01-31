export const jeeMatematicsQuestions = [
    {
        id: 1,
        question: "The derivative of sin(x²) is:",
        options: ["2x cos(x²)", "cos(x²)", "2x sin(x²)", "x cos(x²)"],
        correct: 0,
        topic: "Calculus",
        difficulty: "easy",
        theory: "Using the chain rule: d/dx[sin(x²)] = cos(x²) × d/dx[x²] = cos(x²) × 2x = 2x cos(x²). The chain rule states that for composite functions f(g(x)), the derivative is f'(g(x)) × g'(x).",
        explanation: "Apply chain rule: d/dx[sin(x²)] = cos(x²) × d/dx[x²] = cos(x²) × 2x = 2x cos(x²)."
    },
    {
        id: 2,
        question: "If A and B are mutually exclusive events, then P(A∩B) is:",
        options: ["0", "1", "P(A)", "P(B)"],
        correct: 0,
        topic: "Probability",
        difficulty: "medium",
        theory: "Mutually exclusive events are events that cannot occur simultaneously. If A and B are mutually exclusive, they have no common outcomes. Therefore, the probability of both A and B occurring together is zero: P(A∩B) = 0. This is a fundamental property of mutually exclusive events.",
        explanation: "Mutually exclusive events cannot happen at the same time, so P(A∩B) = 0."
    },
    {
        id: 3,
        question: "The area of the region bounded by y = x² and y = x is:",
        options: ["1/6", "1/3", "1/2", "1"],
        correct: 0,
        topic: "Integration",
        difficulty: "hard",
        theory: "Find intersection points: x² = x → x² - x = 0 → x(x-1) = 0 → x = 0 or x = 1. Between x=0 and x=1, y=x is above y=x². Area = ∫₀¹(x - x²)dx = [x²/2 - x³/3]₀¹ = (1/2 - 1/3) - 0 = 3/6 - 2/6 = 1/6.",
        explanation: "Intersection points at x=0 and x=1. Area = ∫₀¹(x - x²)dx = [x²/2 - x³/3]₀¹ = 1/2 - 1/3 = 1/6."
    },
    {
        id: 4,
        question: "If |z₁| = |z₂|, then z₁ and z₂ lie on:",
        options: ["A circle", "A line", "An ellipse", "A parabola"],
        correct: 0,
        topic: "Complex Numbers",
        difficulty: "medium",
        theory: "In the complex plane, |z| represents the distance from the origin to the point z. If |z₁| = |z₂| = r, both z₁ and z₂ are at the same distance r from the origin. All points at distance r from the origin form a circle of radius r centered at the origin. Therefore, z₁ and z₂ lie on a circle.",
        explanation: "The modulus |z| is the distance from origin. If |z₁| = |z₂|, both lie at the same distance from origin, which forms a circle."
    },
    {
        id: 5,
        question: "The value of ∫₀^π sin x dx is:",
        options: ["0", "1", "2", "π"],
        correct: 2,
        topic: "Integration",
        difficulty: "easy",
        theory: "The antiderivative of sin x is -cos x. Therefore, ∫₀^π sin x dx = [-cos x]₀^π = -cos(π) - (-cos(0)) = -(-1) - (-1) = 1 + 1 = 2. This represents the area under the sine curve from 0 to π.",
        explanation: "∫sin x dx = -cos x. So ∫₀^π sin x dx = [-cos x]₀^π = -(-1) - (-1) = 2."
    }
];
