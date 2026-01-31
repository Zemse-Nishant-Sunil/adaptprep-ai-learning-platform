export const neetPhysicsQuestions = [
    {
        id: 1,
        question: "The SI unit of electric field intensity is:",
        options: ["N/C", "V/m", "Both A and B", "J/C"],
        correct: 2,
        topic: "Electrostatics",
        difficulty: "easy",
        theory: "Electric field intensity is defined as force per unit charge: E = F/q. The SI unit is N/C (Newton per Coulomb). It can also be expressed as V/m (Volt per meter) since V = J/C and J = N·m, so V/m = (J/C)/m = N/C. Both units are equivalent and represent the same quantity.",
        explanation: "Electric field intensity E = F/q. Units: N/C or V/m are equivalent. 1 V/m = 1 N/C."
    },
    {
        id: 2,
        question: "A lens of focal length f is cut into two equal halves. The focal length of each half is:",
        options: ["f/2", "f", "2f", "4f"],
        correct: 1,
        topic: "Optics",
        difficulty: "medium",
        theory: "When a lens is cut into two equal halves (usually along the optical axis), each half retains the same focal length as the original lens. The focal length of a lens depends on its radius of curvature and refractive index (from lens maker's formula). Cutting the lens doesn't change these properties, only the effective aperture changes. So each half still has focal length f.",
        explanation: "When a lens is cut into two halves along the optical axis, the focal length of each piece remains f. Only the light-gathering power (intensity) decreases."
    },
    {
        id: 3,
        question: "The ratio of speeds of sound in hydrogen and oxygen at STP is:",
        options: ["1:4", "4:1", "1:16", "16:1"],
        correct: 1,
        topic: "Waves",
        difficulty: "hard",
        theory: "Speed of sound in a gas is given by v = √(γRT/M), where γ is the adiabatic index, R is gas constant, T is temperature, and M is molar mass. At same temperature, v ∝ 1/√M. For hydrogen: M_H₂ = 2, for oxygen: M_O₂ = 32. Ratio = √(32/2) = √16 = 4. So v_H₂ : v_O₂ = 4:1.",
        explanation: "v ∝ 1/√M. Speed in H₂ : Speed in O₂ = √(M_O₂/M_H₂) = √(32/2) = √16 = 4:1."
    },
    {
        id: 4,
        question: "The magnetic field at the center of a circular coil of radius r carrying current I is:",
        options: ["μ₀I/2r", "μ₀I/r", "2μ₀I/r", "μ₀I/4r"],
        correct: 0,
        topic: "Magnetism",
        difficulty: "medium",
        theory: "The magnetic field at the center of a circular loop of radius r carrying current I is given by Biot-Savart law. After integration, the formula is B = μ₀I/(2r), where μ₀ = 4π × 10⁻⁷ T·m/A is the permeability of free space. This is the standard result for a single loop.",
        explanation: "Using Biot-Savart law for a circular loop, the magnetic field at center = μ₀I/(2r)."
    },
    {
        id: 5,
        question: "A body is thrown vertically upward with velocity u. The time taken to reach maximum height is:",
        options: ["u/g", "2u/g", "u²/2g", "u²/g"],
        correct: 0,
        topic: "Kinematics",
        difficulty: "easy",
        theory: "At maximum height, final velocity v = 0. Using the kinematic equation v = u - gt (negative because gravity opposes upward motion): 0 = u - gt → t = u/g. This is the time to reach maximum height from the point of projection.",
        explanation: "At max height, v = 0. Using v = u - gt: 0 = u - gt → t = u/g."
    }
];
