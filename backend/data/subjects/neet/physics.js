const neetPhysicsQuestions = {
    test1: [
        {
            id: 1,
            question: "The SI unit of electric field intensity is:",
            options: ["N/C", "V/m", "Both A and B", "J/C"],
            correct: 2,
            topic: "Electrostatics",
            difficulty: "easy",
            theory: "Electric field intensity E = F/q. Units: N/C or V/m are equivalent. 1 V/m = 1 N/C.",
            explanation: "Electric field intensity units: N/C or V/m are same."
        },
        {
            id: 2,
            question: "A lens of focal length f is cut into two equal halves. The focal length of each half is:",
            options: ["f/2", "f", "2f", "4f"],
            correct: 1,
            topic: "Optics",
            difficulty: "medium",
            theory: "When a lens is cut into halves, focal length of each piece remains f.",
            explanation: "Focal length doesn't change when lens is cut."
        },
        {
            id: 3,
            question: "The ratio of speeds of sound in hydrogen and oxygen at STP is:",
            options: ["1:4", "4:1", "1:16", "16:1"],
            correct: 1,
            topic: "Waves",
            difficulty: "hard",
            theory: "v ∝ 1/√M. Speed in H₂ : O₂ = √(32/2) = 4:1.",
            explanation: "Speed ratio = √(M_O₂/M_H₂) = 4:1."
        },
        {
            id: 4,
            question: "The angle between two forces to get maximum resultant is:",
            options: ["0°", "45°", "90°", "180°"],
            correct: 0,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Resultant is maximum when angle between forces is 0°.",
            explanation: "Forces in same direction gives maximum resultant."
        },
        {
            id: 5,
            question: "The SI unit of pressure is:",
            options: ["Bar", "Dyne/cm²", "Pascal", "Kg/m"],
            correct: 2,
            topic: "Fluid Mechanics",
            difficulty: "easy",
            theory: "Pressure = Force/Area. SI unit: N/m² = Pascal.",
            explanation: "SI unit of pressure is Pascal (Pa)."
        },
        {
            id: 6,
            question: "The acceleration due to gravity on Moon is approximately:",
            options: ["10 m/s²", "5 m/s²", "1.6 m/s²", "0.5 m/s²"],
            correct: 2,
            topic: "Gravitation",
            difficulty: "easy",
            theory: "Moon's g = 1/6 × Earth's g = 10/6 ≈ 1.6 m/s².",
            explanation: "Moon's acceleration ≈ 1.6 m/s²."
        },
        {
            id: 7,
            question: "The frequency of AC current in India is:",
            options: ["50 Hz", "60 Hz", "100 Hz", "120 Hz"],
            correct: 0,
            topic: "Electricity",
            difficulty: "easy",
            theory: "Standard AC frequency in India = 50 Hz.",
            explanation: "India uses 50 Hz AC."
        },
        {
            id: 8,
            question: "The number of electrons in a neutral atom of argon (Ar, Z=18) is:",
            options: ["9", "18", "36", "8"],
            correct: 1,
            topic: "Atomic Structure",
            difficulty: "easy",
            theory: "Neutral atom has electrons = atomic number = 18.",
            explanation: "Ar has 18 electrons."
        },
        {
            id: 9,
            question: "The most penetrating type of radiation is:",
            options: ["Alpha", "Beta", "Gamma", "X-rays"],
            correct: 2,
            topic: "Nuclear Physics",
            difficulty: "medium",
            theory: "Gamma rays have highest energy and penetrating power.",
            explanation: "Gamma rays most penetrating."
        },
        {
            id: 10,
            question: "The temperature at which water boils at 1 atm pressure is:",
            options: ["80°C", "90°C", "100°C", "110°C"],
            correct: 2,
            topic: "Thermodynamics",
            difficulty: "easy",
            theory: "Water boils at 100°C at 1 atm pressure.",
            explanation: "Boiling point = 100°C at 1 atm."
        }
    ],
    test2: [
        {
            id: 11,
            question: "The speed of light in vacuum is:",
            options: ["2×10⁸ m/s", "3×10⁸ m/s", "4×10⁸ m/s", "5×10⁸ m/s"],
            correct: 1,
            topic: "Optics",
            difficulty: "easy",
            theory: "Speed of light c = 3×10⁸ m/s.",
            explanation: "c = 3×10⁸ m/s."
        },
        {
            id: 12,
            question: "The phenomenon of bending of light at the interface is called:",
            options: ["Reflection", "Refraction", "Diffraction", "Interference"],
            correct: 1,
            topic: "Optics",
            difficulty: "easy",
            theory: "Refraction is bending of light at the boundary of two media.",
            explanation: "Refraction is bending of light."
        },
        {
            id: 13,
            question: "The total internal reflection occurs when light travels from:",
            options: ["Rarer to denser medium", "Denser to rarer medium", "Same medium", "Any medium to vacuum"],
            correct: 1,
            topic: "Optics",
            difficulty: "medium",
            theory: "TIR occurs when light goes from denser to rarer medium at angle > critical angle.",
            explanation: "TIR: denser → rarer medium."
        },
        {
            id: 14,
            question: "The power dissipated in a resistor is:",
            options: ["I/V", "V/I", "I²R", "R/I²"],
            correct: 2,
            topic: "Electricity",
            difficulty: "easy",
            theory: "Power P = I²R = VI = V²/R.",
            explanation: "Power P = I²R."
        },
        {
            id: 15,
            question: "The magnetic field inside a long solenoid is:",
            options: ["Zero", "Uniform", "Non-uniform", "Infinite"],
            correct: 1,
            topic: "Magnetism",
            difficulty: "easy",
            theory: "Inside a solenoid, magnetic field is uniform and parallel to axis.",
            explanation: "Field inside solenoid is uniform."
        },
        {
            id: 16,
            question: "The frequency of X-rays is approximately:",
            options: ["10¹⁵ Hz", "10¹⁸ Hz", "10²⁰ Hz", "10⁹ Hz"],
            correct: 1,
            topic: "Modern Physics",
            difficulty: "medium",
            theory: "X-ray frequency ≈ 10¹⁶ - 10¹⁹ Hz.",
            explanation: "X-ray frequency ≈ 10¹⁸ Hz."
        },
        {
            id: 17,
            question: "The conservation of energy principle states:",
            options: ["Energy is created", "Energy is destroyed", "Energy is conserved", "Energy increases"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Energy cannot be created or destroyed, only transformed.",
            explanation: "Energy is conserved."
        },
        {
            id: 18,
            question: "The dimension of pressure is:",
            options: ["[ML²T⁻²]", "[ML⁻¹T⁻²]", "[LT⁻²]", "[M⁻¹L⁻¹T²]"],
            correct: 1,
            topic: "Mechanics",
            difficulty: "medium",
            theory: "Pressure = Force/Area. [MLT⁻²]/[L²] = [ML⁻¹T⁻²].",
            explanation: "Pressure dimensions: [ML⁻¹T⁻²]."
        },
        {
            id: 19,
            question: "The process of converting kinetic energy to heat is:",
            options: ["Conduction", "Friction", "Radiation", "Convection"],
            correct: 1,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Friction converts kinetic energy to heat.",
            explanation: "Friction converts KE to heat."
        },
        {
            id: 20,
            question: "The SI unit of temperature is:",
            options: ["Celsius", "Fahrenheit", "Kelvin", "Rankine"],
            correct: 2,
            topic: "Thermodynamics",
            difficulty: "easy",
            theory: "SI unit of temperature is Kelvin (K).",
            explanation: "Temperature SI unit is Kelvin."
        }
    ],
    test3: [
        {
            id: 21,
            question: "The formula for kinetic energy is:",
            options: ["mgh", "½kx²", "½mv²", "Fd"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "KE = ½mv² where m is mass and v is velocity.",
            explanation: "KE = ½mv²."
        },
        {
            id: 22,
            question: "The potential energy stored in a spring is:",
            options: ["½kx", "kx²", "½kx²", "kx"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Spring PE = ½kx² where k is spring constant and x is displacement.",
            explanation: "Spring PE = ½kx²."
        },
        {
            id: 23,
            question: "The angle of incidence equals angle of reflection in:",
            options: ["Refraction", "Diffraction", "Reflection", "Interference"],
            correct: 2,
            topic: "Optics",
            difficulty: "easy",
            theory: "Law of reflection: angle of incidence = angle of reflection.",
            explanation: "Reflection law."
        },
        {
            id: 24,
            question: "The pitch of a sound depends on its:",
            options: ["Amplitude", "Frequency", "Wavelength", "Velocity"],
            correct: 1,
            topic: "Waves",
            difficulty: "easy",
            theory: "Pitch depends on frequency of sound wave.",
            explanation: "Pitch depends on frequency."
        },
        {
            id: 25,
            question: "The loudness of sound depends on its:",
            options: ["Frequency", "Amplitude", "Wavelength", "Period"],
            correct: 1,
            topic: "Waves",
            difficulty: "easy",
            theory: "Loudness depends on amplitude of sound wave.",
            explanation: "Loudness depends on amplitude."
        },
        {
            id: 26,
            question: "The velocity of sound in air at 0°C is approximately:",
            options: ["240 m/s", "330 m/s", "400 m/s", "500 m/s"],
            correct: 1,
            topic: "Waves",
            difficulty: "medium",
            theory: "Sound velocity at 0°C ≈ 330 m/s.",
            explanation: "Sound velocity ≈ 330 m/s at 0°C."
        },
        {
            id: 27,
            question: "The escape velocity from Earth is approximately:",
            options: ["8.5 km/s", "9.8 km/s", "11.2 km/s", "15 km/s"],
            correct: 2,
            topic: "Gravitation",
            difficulty: "medium",
            theory: "Escape velocity = √(2GM/R) ≈ 11.2 km/s.",
            explanation: "Earth escape velocity ≈ 11.2 km/s."
        },
        {
            id: 28,
            question: "The phenomenon where light bends around edges is:",
            options: ["Reflection", "Refraction", "Diffraction", "Polarization"],
            correct: 2,
            topic: "Optics",
            difficulty: "easy",
            theory: "Diffraction is bending of light around edges.",
            explanation: "Diffraction bends light around edges."
        },
        {
            id: 29,
            question: "The SI unit of energy is:",
            options: ["Erg", "Calorie", "Joule", "Watt"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "SI unit of energy is Joule (J).",
            explanation: "Energy unit is Joule."
        },
        {
            id: 30,
            question: "The momentum of an object is:",
            options: ["m + v", "m - v", "m/v", "mv"],
            correct: 3,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Momentum p = mv.",
            explanation: "p = mv."
        }
    ],
    test4: [
        {
            id: 31,
            question: "The average velocity is:",
            options: ["Total distance/time", "Total displacement/time", "Maximum/minimum velocity", "Final + initial velocity"],
            correct: 1,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Average velocity = displacement/time.",
            explanation: "Average velocity = displacement/time."
        },
        {
            id: 32,
            question: "The centripetal acceleration is directed:",
            options: ["Tangent to circle", "Away from center", "Toward center", "Perpendicular"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Centripetal acceleration points toward center.",
            explanation: "Centered toward center."
        },
        {
            id: 33,
            question: "The coefficient of static friction is generally:",
            options: ["Less than kinetic", "Equal to kinetic", "Greater than kinetic", "Zero"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "medium",
            theory: "μ_s > μ_k typically.",
            explanation: "μ_s > μ_k."
        },
        {
            id: 34,
            question: "The first law of motion states an object in motion:",
            options: ["Always accelerates", "Continues unless acted upon", "Decelerates slowly", "Moves upward"],
            correct: 1,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Newton's first law: object continues unless external force acts.",
            explanation: "First law of motion."
        },
        {
            id: 35,
            question: "The second law of motion is represented as:",
            options: ["F = ma", "F = mv", "F = m/a", "F = a/m"],
            correct: 0,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "F = ma (Newton's second law).",
            explanation: "F = ma."
        },
        {
            id: 36,
            question: "The reaction pair to weight is:",
            options: ["Normal force", "Gravitational pull by object on Earth", "Friction", "Air resistance"],
            correct: 1,
            topic: "Mechanics",
            difficulty: "hard",
            theory: "Weight is pull of Earth on object. Reaction is pull of object on Earth.",
            explanation: "Gravitational pull by object on Earth."
        },
        {
            id: 37,
            question: "The elasticity of a material is measured by:",
            options: ["Hardness", "Young's modulus", "Density", "Melting point"],
            correct: 1,
            topic: "Mechanics",
            difficulty: "medium",
            theory: "Young's modulus measures elasticity.",
            explanation: "Young's modulus measures elasticity."
        },
        {
            id: 38,
            question: "The specific heat capacity is highest for:",
            options: ["Iron", "Water", "Lead", "Copper"],
            correct: 1,
            topic: "Thermodynamics",
            difficulty: "medium",
            theory: "Water has highest specific heat among common substances.",
            explanation: "Water has highest specific heat."
        },
        {
            id: 39,
            question: "The latent heat of fusion is the energy needed to:",
            options: ["Melt solid", "Vaporize liquid", "Heat liquid", "Cool gas"],
            correct: 0,
            topic: "Thermodynamics",
            difficulty: "easy",
            theory: "Latent heat of fusion is for melting solid to liquid.",
            explanation: "Latent heat of fusion melts solid."
        },
        {
            id: 40,
            question: "The critical angle for total internal reflection depends on:",
            options: ["Color", "Refractive index", "Wavelength", "Frequency"],
            correct: 1,
            topic: "Optics",
            difficulty: "medium",
            theory: "Critical angle θ_c = sin⁻¹(n₂/n₁), depends on refractive index.",
            explanation: "Critical angle depends on refractive index."
        }
    ],
    test5: [
        {
            id: 41,
            question: "The focal length of a plane mirror is:",
            options: ["0", "f", "∞", "2f"],
            correct: 2,
            topic: "Optics",
            difficulty: "easy",
            theory: "Plane mirror has infinite focal length.",
            explanation: "Plane mirror: f = ∞."
        },
        {
            id: 42,
            question: "The magnification produced by a concave mirror when object is at center of curvature is:",
            options: ["-1", "-2", "0", "1"],
            correct: 0,
            topic: "Optics",
            difficulty: "medium",
            theory: "When u = 2f, m = -v/u = -1.",
            explanation: "Magnification = -1."
        },
        {
            id: 43,
            question: "The virtual image formed by a convex lens is:",
            options: ["Possible always", "Never possible", "When object in between focus and lens", "When object at focus"],
            correct: 1,
            topic: "Optics",
            difficulty: "hard",
            theory: "Convex lens never forms virtual image.",
            explanation: "Convex lens never forms virtual image."
        },
        {
            id: 44,
            question: "The refractive index of a medium is constant for:",
            options: ["All colors", "Only red light", "All wavelengths in that medium", "All lights at same frequency"],
            correct: 2,
            topic: "Optics",
            difficulty: "hard",
            theory: "Refractive index varies with wavelength (dispersion).",
            explanation: "n varies with wavelength."
        },
        {
            id: 45,
            question: "The phenomenon of beats occurs when:",
            options: ["Single frequency changes", "Two frequencies are close", "Sound amplitude large", "Sound travels far"],
            correct: 1,
            topic: "Waves",
            difficulty: "medium",
            theory: "Beats occur from superposition of close frequencies.",
            explanation: "Beats from two close frequencies."
        },
        {
            id: 46,
            question: "The Doppler shift formula for observer moving is:",
            options: ["f' = f(v/v+v_o)", "f' = f(v+v_o)/v", "f' = f(v-v_o)/v", "f' = f(v)/(v-v_o)"],
            correct: 1,
            topic: "Waves",
            difficulty: "hard",
            theory: "f' = f(v + v_observer)/v for observer toward source.",
            explanation: "Doppler formula for moving observer."
        },
        {
            id: 47,
            question: "The wavelength of de Broglie is given by:",
            options: ["λ = h/p", "λ = p/h", "λ = hv", "λ = ph"],
            correct: 0,
            topic: "Modern Physics",
            difficulty: "medium",
            theory: "λ = h/p (de Broglie wavelength).",
            explanation: "de Broglie: λ = h/p."
        },
        {
            id: 48,
            question: "The photoelectric effect demonstrates:",
            options: ["Wave nature of light", "Particle nature of light", "Duality", "Diffraction"],
            correct: 1,
            topic: "Modern Physics",
            difficulty: "easy",
            theory: "Photoelectric effect shows particles (photons) with energy hf.",
            explanation: "Shows particle nature of light."
        },
        {
            id: 49,
            question: "The stopping potential in photoelectric effect is:",
            options: ["Independent of frequency", "Increases with frequency", "Decreases with frequency", "Zero always"],
            correct: 1,
            topic: "Modern Physics",
            difficulty: "medium",
            theory: "V_s increases with frequency f.",
            explanation: "V_s increases with frequency."
        },
        {
            id: 50,
            question: "The Bohr's radius is approximately:",
            options: ["0.53 nm", "0.53 Å", "0.053 nm", "5.3 nm"],
            correct: 1,
            topic: "Modern Physics",
            difficulty: "medium",
            theory: "Bohr radius a₀ ≈ 0.53 Å = 0.053 nm.",
            explanation: "a₀ ≈ 0.53 Å."
        }
    ],
    test6: [
        {
            id: 51,
            question: "The minimum number of satellites for global coverage is:",
            options: ["3", "2", "4", "6"],
            correct: 0,
            topic: "Gravitation",
            difficulty: "medium",
            theory: "Minimum 3 geostationary satellites at 120° apart.",
            explanation: "3 satellites for global coverage."
        },
        {
            id: 52,
            question: "The binding energy of nucleus is:",
            options: ["Same for all nuclei", "Maximum for Fe-56", "Minimum for heavy nuclei", "Zero"],
            correct: 1,
            topic: "Nuclear Physics",
            difficulty: "medium",
            theory: "Binding energy per nucleon max at Fe-56.",
            explanation: "Maximum at Fe-56."
        },
        {
            id: 53,
            question: "The half-life of a radioactive substance is the time for:",
            options: ["Complete decay", "Half to decay", "Decay by half", "Activity to double"],
            correct: 1,
            topic: "Nuclear Physics",
            difficulty: "easy",
            theory: "Half-life is time for half the sample to decay.",
            explanation: "Half remaining after half-life."
        },
        {
            id: 54,
            question: "The ionization energy of hydrogen atom is:",
            options: ["3.4 eV", "6.8 eV", "13.6 eV", "27.2 eV"],
            correct: 2,
            topic: "Atomic Physics",
            difficulty: "easy",
            theory: "Ionization energy of H = 13.6 eV.",
            explanation: "H ionization = 13.6 eV."
        },
        {
            id: 55,
            question: "The forbidden energy gap is smallest in:",
            options: ["Conductors", "Semiconductors", "Insulators", "Superconductors"],
            correct: 1,
            topic: "Semiconductors",
            difficulty: "medium",
            theory: "Semiconductors have small band gap.",
            explanation: "Semiconductors have smallest gap."
        },
        {
            id: 56,
            question: "The rectification efficiency of half-wave rectifier is approximately:",
            options: ["90%", "81%", "50%", "33%"],
            correct: 2,
            topic: "Electronics",
            difficulty: "hard",
            theory: "HWR efficiency ≈ 40.6%, approximately 33% given.",
            explanation: "HWR efficiency ≈ 40%."
        },
        {
            id: 57,
            question: "The capacitive reactance decreases with:",
            options: ["Decrease in frequency", "Increase in capacitance", "Both A and B", "Increase in voltage"],
            correct: 2,
            topic: "AC Circuits",
            difficulty: "medium",
            theory: "X_C = 1/(2πfC), decreases with f or C.",
            explanation: "X_C ∝ 1/(fC)."
        },
        {
            id: 58,
            question: "The resonant frequency of LC circuit is:",
            options: ["f = 1/(2π√LC)", "f = 2π√LC", "f = √LC", "f = LC"],
            correct: 0,
            topic: "AC Circuits",
            difficulty: "medium",
            theory: "f₀ = 1/(2π√LC).",
            explanation: "Resonance frequency formula."
        },
        {
            id: 59,
            question: "The quality factor Q of a circuit is:",
            options: ["R/(ωL)", "ωL/R", "1+R", "R-L"],
            correct: 1,
            topic: "AC Circuits",
            difficulty: "hard",
            theory: "Q = ωL/R (at resonance).",
            explanation: "Quality factor Q = ωL/R."
        },
        {
            id: 60,
            question: "The bandwidth of a resonant circuit is related to Q as:",
            options: ["BW = f₀/Q", "BW = f₀×Q", "BW = Q", "BW = 1/Q"],
            correct: 0,
            topic: "AC Circuits",
            difficulty: "hard",
            theory: "Bandwidth = f₀/Q.",
            explanation: "BW = f₀/Q."
        }
    ],
    test7: [
        {
            id: 61,
            question: "The thermal conductivity is highest for:",
            options: ["Wood", "Glass", "Silver", "Water"],
            correct: 2,
            topic: "Thermodynamics",
            difficulty: "easy",
            theory: "Silver has highest thermal conductivity among common materials.",
            explanation: "Silver highest thermal conductivity."
        },
        {
            id: 62,
            question: "The internal resistance of a cell becomes zero when:",
            options: ["Cell is new", "Cell is never zero", "Current is infinite", "Load resistance is infinite"],
            correct: 1,
            topic: "Electricity",
            difficulty: "medium",
            theory: "Internal resistance can never be zero.",
            explanation: "Never zero."
        },
        {
            id: 63,
            question: "The efficiency of a heat engine is always:",
            options: ["Less than 100%", "Can be 100%", "More than 100%", "Equal to 50%"],
            correct: 0,
            topic: "Thermodynamics",
            difficulty: "easy",
            theory: "No heat engine can have 100% efficiency (Carnot limit).",
            explanation: "Always less than 100%."
        },
        {
            id: 64,
            question: "The Carnot engine operates between:",
            options: ["Two fixed temperatures", "Variable temperatures", "Same temperature", "One temperature"],
            correct: 0,
            topic: "Thermodynamics",
            difficulty: "easy",
            theory: "Carnot engine between two fixed temperature reservoirs.",
            explanation: "Two fixed temperatures."
        },
        {
            id: 65,
            question: "The entropy of an isolated system:",
            options: ["Decreases", "Increases", "Remains constant", "Becomes zero"],
            correct: 1,
            topic: "Thermodynamics",
            difficulty: "medium",
            theory: "Entropy of isolated system increases (2nd law).",
            explanation: "Entropy increases."
        },
        {
            id: 66,
            question: "The coefficient of linear expansion is denoted by:",
            options: ["β", "γ", "α", "δ"],
            correct: 2,
            topic: "Thermodynamics",
            difficulty: "easy",
            theory: "Linear expansion coefficient = α.",
            explanation: "α is linear expansion."
        },
        {
            id: 67,
            question: "The relationship between α, β, γ is:",
            options: ["β = 2α", "β = 3α", "γ = 3α", "γ = 2α"],
            correct: 2,
            topic: "Thermodynamics",
            difficulty: "medium",
            theory: "Volumetric α = 3×linear α.",
            explanation: "γ = 3α."
        },
        {
            id: 68,
            question: "The absolute zero temperature is:",
            options: ["0°C", "-273°C", "-273.15°C", "-100°C"],
            correct: 2,
            topic: "Thermodynamics",
            difficulty: "easy",
            theory: "Absolute zero = -273.15°C ≈ 0 K.",
            explanation: "Absolute zero ≈ -273.15°C."
        },
        {
            id: 69,
            question: "The black body radiation follows law:",
            options: ["Stefan-Boltzmann", "Wien's displacement", "Planck's law", "All"],
            correct: 3,
            topic: "Modern Physics",
            difficulty: "hard",
            theory: "Black body follows all three laws.",
            explanation: "All radiation laws apply."
        },
        {
            id: 70,
            question: "The characteristic X-rays are produced by:",
            options: ["Beta particles", "Gamma rays", "Fast electrons", "Slow electrons"],
            correct: 2,
            topic: "Modern Physics",
            difficulty: "medium",
            theory: "Fast electrons hitting target produce X-rays.",
            explanation: "Fast electrons produce X-rays."
        }
    ],
    test8: [
        {
            id: 71,
            question: "The mass defect is the difference between:",
            options: ["Initial and final mass", "Protons and neutrons", "Sum of nucleon masses and nucleus mass", "Atomic and nuclear mass"],
            correct: 2,
            topic: "Nuclear Physics",
            difficulty: "medium",
            theory: "Mass defect = Σ(masses of nucleons) - nucleus mass.",
            explanation: "Mass defect definition."
        },
        {
            id: 72,
            question: "The time period of a simple pendulum depends on:",
            options: ["Mass", "Amplitude for small angles", "Length of string", "A and C"],
            correct: 3,
            topic: "Mechanics",
            difficulty: "medium",
            theory: "T depends on length L, not mass for small angles.",
            explanation: "T = 2π√(L/g)."
        },
        {
            id: 73,
            question: "The resonance occurs when:",
            options: ["Natural frequency = driving frequency", "Natural frequency > driving frequency", "Natural frequency < driving frequency", "No specific condition"],
            correct: 0,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Resonance when f_natural = f_driving.",
            explanation: "Resonance condition."
        },
        {
            id: 74,
            question: "The viscosity of gases with temperature:",
            options: ["Decreases", "Increases", "Remains constant", "First increases then decreases"],
            correct: 1,
            topic: "Mechanics",
            difficulty: "medium",
            theory: "Gas viscosity increases with temperature (unlike liquids).",
            explanation: "Increases with temperature."
        },
        {
            id: 75,
            question: "Archimedes' principle states:",
            options: ["Buoyant force = weight of object", "Buoyant force = weight of displaced fluid", "Pressure = force/area", "Energy is conserved"],
            correct: 1,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Buoyant force equals weight of displaced fluid.",
            explanation: "Buoyancy principle."
        },
        {
            id: 76,
            question: "The terminal velocity is reached when:",
            options: ["Gravity = air resistance", "Velocity is maximum", "Acceleration becomes zero", "All of above"],
            correct: 3,
            topic: "Mechanics",
            difficulty: "medium",
            theory: "Terminal velocity when all forces balance.",
            explanation: "Terminal velocity reached."
        },
        {
            id: 77,
            question: "The angular momentum of a rotating body is:",
            options: ["L = Iω", "L = mω", "L = Iα", "L = mα"],
            correct: 0,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Angular momentum L = Iω.",
            explanation: "L = Iω."
        },
        {
            id: 78,
            question: "The torque is given by:",
            options: ["τ = F×r", "τ = F·r", "τ = F+r", "τ = F/r"],
            correct: 0,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Torque τ = F × r (cross product).",
            explanation: "τ = F×r."
        },
        {
            id: 79,
            question: "The mechanical advantage of a pulley system is:",
            options: ["Number of supporting ropes", "2 times number of pulleys", "Weight ratio", "Force ratio"],
            correct: 0,
            topic: "Mechanics",
            difficulty: "medium",
            theory: "MA = number of ropes supporting load.",
            explanation: "MA equals supporting ropes."
        },
        {
            id: 80,
            question: "The ideal mechanical advantage of a lever is:",
            options: ["Load/effort", "Effort arm/load arm", "Load arm/effort arm", "Load × effort"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "medium",
            theory: "IMA = load arm / effort arm.",
            explanation: "IMA definition."
        }
    ],
    test9: [
        {
            id: 81,
            question: "The principle of moments states:",
            options: ["Sum of forces = 0", "Sum of moments = 0 for equilibrium", "Moment = force × distance", "All above"],
            correct: 1,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "For rotational equilibrium, sum of torques = 0.",
            explanation: "Moments balance."
        },
        {
            id: 82,
            question: "The coefficient of restitution is:",
            options: ["Always < 1", "Always > 1", "Between 0 and 1", "Always = 1"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "medium",
            theory: "e = relative velocity after / before. 0 ≤ e ≤ 1.",
            explanation: "0 ≤ e ≤ 1."
        },
        {
            id: 83,
            question: "The conservation of linear momentum requires:",
            options: ["No external force", "Constant velocity", "Gravity absent", "All zero"],
            correct: 0,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Momentum conserved when net external force = 0.",
            explanation: "Conserved with no external force."
        },
        {
            id: 84,
            question: "The angular velocity is related to linear velocity by:",
            options: ["v = ω/r", "v = ωr", "v = ω + r", "v = r/ω"],
            correct: 1,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "v = ωr where r is radius.",
            explanation: "v = ωr."
        },
        {
            id: 85,
            question: "The centripetal force is always:",
            options: ["Tangent to path", "Parallel to velocity", "Toward center", "Away from center"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Centripetal force directed toward center.",
            explanation: "Toward center."
        },
        {
            id: 86,
            question: "The work done by centripetal force is:",
            options: ["Maximum", "Positive", "Zero", "Negative"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "medium",
            theory: "Centripetal force perpendicular to displacement, W = 0.",
            explanation: "Work = 0."
        },
        {
            id: 87,
            question: "The potential energy of a stretched spring compared to natural state is:",
            options: ["Negative", "Zero", "Positive", "Equal to kinetic"],
            correct: 2,
            topic: "Mechanics",
            difficulty: "easy",
            theory: "Stretched spring has positive PE.",
            explanation: "PE positive."
        },
        {
            id: 88,
            question: "The gravitational potential at infinity is:",
            options: ["Zero", "Negative infinity", "Positive infinity", "Undefined"],
            correct: 0,
            topic: "Gravitation",
            difficulty: "easy",
            theory: "V = 0 at infinity (reference point).",
            explanation: "V = 0 at ∞."
        },
        {
            id: 89,
            question: "The electric field due to uniform positive charge is:",
            options: ["Toward charge", "Away from charge", "Perpendicular", "Zero"],
            correct: 1,
            topic: "Electrostatics",
            difficulty: "easy",
            theory: "E field points away from positive charge.",
            explanation: "Away from positive."
        },
        {
            id: 90,
            question: "The equipotential surfaces due to point charge are:",
            options: ["Planes", "Cylinders", "Spheres", "Lines"],
            correct: 2,
            topic: "Electrostatics",
            difficulty: "medium",
            theory: "Equipotentials are spheres around point charge.",
            explanation: "Spherical surfaces."
        }
    ],
    test10: [
        {
            id: 91,
            question: "The electrostatic force follows law:",
            options: ["Newton's law", "Coulomb's law", "Gauss's law", "Ampere's law"],
            correct: 1,
            topic: "Electrostatics",
            difficulty: "easy",
            theory: "F = kQ₁Q₂/r² (Coulomb's law).",
            explanation: "Coulomb's law."
        },
        {
            id: 92,
            question: "The dielectric constant of vacuum is:",
            options: ["0", "1", "∞", "Not defined"],
            correct: 1,
            topic: "Electrostatics",
            difficulty: "easy",
            theory: "Dielectric constant K = 1 for vacuum.",
            explanation: "K = 1."
        },
        {
            id: 93,
            question: "The capacitance depends on:",
            options: ["Charge only", "Voltage only", "Geometry and material", "Current"],
            correct: 2,
            topic: "Electricity",
            difficulty: "easy",
            theory: "C depends on area, separation, and dielectric.",
            explanation: "Depends on geometry."
        },
        {
            id: 94,
            question: "The current in series circuit is:",
            options: ["Different in each element", "Same throughout", "Depends on resistance", "Always 1 A"],
            correct: 1,
            topic: "Electricity",
            difficulty: "easy",
            theory: "Series: same current everywhere.",
            explanation: "Same current."
        },
        {
            id: 95,
            question: "The voltage across resistors in parallel is:",
            options: ["Different", "Same", "Depends on resistance", "Always zero"],
            correct: 1,
            topic: "Electricity",
            difficulty: "easy",
            theory: "Parallel: voltage same across all branches.",
            explanation: "Same voltage."
        },
        {
            id: 96,
            question: "The mutual inductance between coils:",
            options: ["Independent of relative position", "Depends on relative position", "Always zero", "Always same"],
            correct: 1,
            topic: "Magnetism",
            difficulty: "medium",
            theory: "MI depends on relative position, orientation of coils.",
            explanation: "Depends on position."
        },
        {
            id: 97,
            question: "The self-inductance of a solenoid increases with:",
            options: ["Number of turns squared", "Length squared", "Cross-sectional area", "Wire resistance"],
            correct: 0,
            topic: "Magnetism",
            difficulty: "medium",
            theory: "L ∝ N² (turns squared).",
            explanation: "L ∝ N²."
        },
        {
            id: 98,
            question: "The drift velocity of electrons in a conductor is:",
            options: ["Very high", "Very low (mm/s)", "Speed of light", "Zero"],
            correct: 1,
            topic: "Electricity",
            difficulty: "medium",
            theory: "Drift velocity is very slow (mm/s), not signal speed.",
            explanation: "Very low."
        },
        {
            id: 99,
            question: "The superconductivity occurs at:",
            options: ["Room temperature", "Low temperature", "High temperature", "Absolute zero only"],
            correct: 1,
            topic: "Semiconductors",
            difficulty: "easy",
            theory: "Superconductivity below critical temperature (varies).",
            explanation: "Low temperature."
        },
        {
            id: 100,
            question: "The breakdown voltage of a zener diode is:",
            options: ["Very high", "Very low", "Zero", "Reverse bias characteristic"],
            correct: 3,
            topic: "Electronics",
            difficulty: "medium",
            theory: "Zener breakdown in reverse bias is defined voltage.",
            explanation: "Reverse characteristic."
        }
    ]
};

module.exports = { neetPhysicsQuestions };
