const neetChemistryQuestions = {
    test1: [
        {
            id: 1,
            question: "The periodic table is arranged by increasing order of:",
            options: ["Atomic mass", "Atomic number", "Mass number", "Neutron number"],
            correct: 1,
            topic: "Periodic Table",
            difficulty: "easy",
            theory: "Modern periodic table is arranged in order of increasing atomic number.",
            explanation: "Arranged by atomic number."
        },
        {
            id: 2,
            question: "Which of the following is a non-metallic element?",
            options: ["Iron", "Copper", "Carbon", "Silver"],
            correct: 2,
            topic: "Elements",
            difficulty: "easy",
            theory: "Carbon is a non-metal. Iron, Copper, and Silver are all metals.",
            explanation: "Carbon is nonmetallic."
        },
        {
            id: 3,
            question: "The pH of a neutral solution at 25°C is:",
            options: ["0", "7", "14", "10"],
            correct: 1,
            topic: "Acid-Base Chemistry",
            difficulty: "easy",
            theory: "pH = 7 indicates neutral solution (10⁻⁷ H⁺ concentration).",
            explanation: "Neutral solution: pH = 7."
        },
        {
            id: 4,
            question: "A strong acid is one that:",
            options: ["Has low pH", "Fully ionizes in water", "Has high concentration", "Turns litmus red"],
            correct: 1,
            topic: "Acid-Base Chemistry",
            difficulty: "easy",
            theory: "Strong acids completely ionize in water (HCl, HNO₃, H₂SO₄ etc.).",
            explanation: "Strong acid fully ionizes."
        },
        {
            id: 5,
            question: "The hybridization of carbon in CO₂ is:",
            options: ["sp", "sp²", "sp³", "sp³d"],
            correct: 0,
            topic: "Chemical Bonding",
            difficulty: "medium",
            theory: "CO₂: C=O=C structure requires sp hybridization (linear geometry).",
            explanation: "CO₂ hybridization is sp."
        },
        {
            id: 6,
            question: "Water is a polar solvent because:",
            options: ["It contains hydrogen", "It is liquid", "It has uneven electron distribution", "It dissolves everything"],
            correct: 2,
            topic: "Molecular Properties",
            difficulty: "easy",
            theory: "Water is polar due to unequal sharing of electrons and angular shape.",
            explanation: "Polar due to electron distribution."
        },
        {
            id: 7,
            question: "The molar mass of oxygen is:",
            options: ["8 g/mol", "16 g/mol", "32 g/mol", "64 g/mol"],
            correct: 2,
            topic: "Atomic Masses",
            difficulty: "easy",
            theory: "O₂ molecule has molar mass = 2 × 16 = 32 g/mol.",
            explanation: "O₂ molar mass = 32 g/mol."
        },
        {
            id: 8,
            question: "The oxidation state of oxygen in H₂O₂ is:",
            options: ["-2", "-1", "+1", "+2"],
            correct: 1,
            topic: "Redox Reactions",
            difficulty: "medium",
            theory: "In H₂O₂: H is +1, O is -1. Total: 1(+1) + 2(-1) + 2(+1) = 0.",
            explanation: "O in H₂O₂ is -1."
        },
        {
            id: 9,
            question: "What is the charge on an electron?",
            options: ["+1.6×10⁻¹⁹ C", "-1.6×10⁻¹⁹ C", "+3.2×10⁻¹⁹ C", "0"],
            correct: 1,
            topic: "Atomic Structure",
            difficulty: "easy",
            theory: "Electron charge = -1.6×10⁻¹⁹ Coulombs.",
            explanation: "Electron charge = -1.6×10⁻¹⁹ C."
        },
        {
            id: 10,
            question: "The first ionization energy generally increases:",
            options: ["Down the group", "Across a period", "Both", "Neither"],
            correct: 1,
            topic: "Periodic Properties",
            difficulty: "medium",
            theory: "IE increases across period (increasing nuclear charge), decreases down group.",
            explanation: "Increases across period."
        }
    ],
    test2: [
        {
            id: 11,
            question: "Which is the lightest element?",
            options: ["Helium", "Hydrogen", "Lithium", "Boron"],
            correct: 1,
            topic: "Elements",
            difficulty: "easy",
            theory: "Hydrogen has atomic number 1, lightest element.",
            explanation: "Hydrogen is lightest."
        },
        {
            id: 12,
            question: "The maximum number of electrons in a d-orbital is:",
            options: ["2", "6", "10", "14"],
            correct: 2,
            topic: "Atomic Structure",
            difficulty: "medium",
            theory: "d-orbitals: 5 orbitals × 2 electrons max = 10 electrons.",
            explanation: "d-orbital: 10 electrons max."
        },
        {
            id: 13,
            question: "Which element has highest electronegativity?",
            options: ["Chlorine", "Fluorine", "Oxygen", "Nitrogen"],
            correct: 1,
            topic: "Periodic Properties",
            difficulty: "easy",
            theory: "Fluorine has highest electronegativity (3.98 Pauling scale).",
            explanation: "Fluorine highest electronegativity."
        },
        {
            id: 14,
            question: "The number of valence electrons in sulfur is:",
            options: ["2", "4", "6", "8"],
            correct: 2,
            topic: "Chemical Bonding",
            difficulty: "easy",
            theory: "S (1s² 2s² 2p⁶ 3s² 3p⁴) has 6 valence electrons.",
            explanation: "S valence electrons = 6."
        },
        {
            id: 15,
            question: "A covalent bond is formed between:",
            options: ["Metal and nonmetal", "Two nonmetals", "Metal and metal", "Ion and neutral atom"],
            correct: 1,
            topic: "Chemical Bonding",
            difficulty: "easy",
            theory: "Covalent bonds between two nonmetals (sharing electrons).",
            explanation: "Covalent: two nonmetals."
        },
        {
            id: 16,
            question: "The empirical formula of glucose is:",
            options: ["C₆H₁₂O₆", "CH₂O", "C₂H₄O₂", "C₃H₆O₃"],
            correct: 1,
            topic: "Organic Chemistry",
            difficulty: "medium",
            theory: "Empirical formula is simplest whole number ratio: C₆H₁₂O₆ → CH₂O.",
            explanation: "Empirical: CH₂O."
        },
        {
            id: 17,
            question: "Which of the following is a saturated hydrocarbon?",
            options: ["Benzene", "Ethene", "Ethane", "Acetylene"],
            correct: 2,
            topic: "Organic Chemistry",
            difficulty: "easy",
            theory: "Saturated: single bonds only. Ethane (C₂H₆) - saturated.",
            explanation: "Ethane is saturated."
        },
        {
            id: 18,
            question: "What is the functional group in alcohols?",
            options: ["-COOH", "-OH", "-NH₂", "-CHO"],
            correct: 1,
            topic: "Organic Chemistry",
            difficulty: "easy",
            theory: "Alcohol functional group: -OH (hydroxyl).",
            explanation: "Alcohol: -OH group."
        },
        {
            id: 19,
            question: "The rate of reaction increases with:",
            options: ["Decrease in concentration", "Decrease in temperature", "Addition of catalyst", "All above"],
            correct: 2,
            topic: "Chemical Kinetics",
            difficulty: "easy",
            theory: "Catalyst speeds up reaction without being consumed.",
            explanation: "Catalyst increases rate."
        },
        {
            id: 20,
            question: "Avogadro's number approximately equals:",
            options: ["6×10²¹", "6×10²²", "6×10²³", "6×10²⁴"],
            correct: 2,
            topic: "Moles and Stoichiometry",
            difficulty: "easy",
            theory: "Avogadro's number = 6.022×10²³.",
            explanation: "N_A ≈ 6×10²³."
        }
    ],
    test3: [
        {
            id: 21,
            question: "The characteristic color of chlorine gas is:",
            options: ["Colorless", "Yellow", "Yellow-green", "Brown"],
            correct: 2,
            topic: "Elements",
            difficulty: "easy",
            theory: "Chlorine gas is yellow-green in color.",
            explanation: "Cl₂ is yellow-green."
        },
        {
            id: 22,
            question: "Which is an example of exothermic reaction?",
            options: ["Melting ice", "Photosynthesis", "Combustion", "Dissolution of salt"],
            correct: 2,
            topic: "Thermochemistry",
            difficulty: "easy",
            theory: "Combustion releases heat (exothermic).",
            explanation: "Combustion is exothermic."
        },
        {
            id: 23,
            question: "The heat of neutralization of strong acid-strong base is:",
            options: ["Zero", "57 kJ/mol", "-57 kJ/mol", "Depends on acid"],
            correct: 2,
            topic: "Thermochemistry",
            difficulty: "medium",
            theory: "ΔH_neutralization ≈ -57 kJ/mol (constant for strong acid-base).",
            explanation: "Heat of neutralization ≈ -57 kJ/mol."
        },
        {
            id: 24,
            question: "The law of conservation of mass states:",
            options: ["Matter cannot change form", "Mass is not conserved", "Mass is conserved in reactions", "All matter is identical"],
            correct: 2,
            topic: "Chemical reactions",
            difficulty: "easy",
            theory: "Mass before reaction = mass after (in closed system).",
            explanation: "Mass conserved."
        },
        {
            id: 25,
            question: "What is the oxidation state of Cl in NaClO?",
            options: ["-1", "0", "+1", "+5"],
            correct: 2,
            topic: "Redox Reactions",
            difficulty: "medium",
            theory: "Na(+1) + Cl(x) + O(-2) = 0. x+1-2 = 0, x = +1.",
            explanation: "Cl in NaClO is +1."
        },
        {
            id: 26,
            question: "The reducing agent in a reaction is:",
            options: ["Oxidized", "Reduced", "Unchanged", "Catalyst"],
            correct: 0,
            topic: "Redox Reactions",
            difficulty: "easy",
            theory: "Reducing agent is oxidized (loses electrons).",
            explanation: "Reducing agent oxidized."
        },
        {
            id: 27,
            question: "Which element forms covalent compounds primarily?",
            options: ["Sodium", "Magnesium", "Carbon", "Calcium"],
            correct: 2,
            topic: "Chemical Bonding",
            difficulty: "easy",
            theory: "Carbon forms covalent bonds primarily.",
            explanation: "Carbon forms covalent bonds."
        },
        {
            id: 28,
            question: "The most electropositive element is:",
            options: ["Fluorine", "Chlorine", "Sodium", "Potassium"],
            correct: 2,
            topic: "Periodic Properties",
            difficulty: "easy",
            theory: "Sodium is highly electropositive (least electronegative among options).",
            explanation: "Sodium electropositive."
        },
        {
            id: 29,
            question: "What does the symbol ► denote in chemical equations?",
            options: ["Reversible reaction", "Irreversible reaction", "Very slow reaction", "Catalyst"],
            correct: 0,
            topic: "Chemical Equations",
            difficulty: "easy",
            theory: "⇌ or ► indicates reversible reaction.",
            explanation: "► denotes reversible."
        },
        {
            id: 30,
            question: "The benzene ring has how many π bonds?",
            options: ["3", "6", "9", "12"],
            correct: 0,
            topic: "Organic Chemistry",
            difficulty: "medium",
            theory: "Benzene: alternating single and double bonds, 3 π bonds total.",
            explanation: "Benzene has 3 π bonds."
        }
    ],
    test4: [
        {
            id: 31,
            question: "Which salt is formed from strong acid and weak base?",
            options: ["NaCl", "NH₄Cl", "NaOH", "KNO₃"],
            correct: 1,
            topic: "Acid-Base Chemistry",
            difficulty: "medium",
            theory: "NH₄Cl from strong HCl and weak NH₃ base.",
            explanation: "NH₄Cl acidic salt."
        },
        {
            id: 32,
            question: "The bond dissociation energy shows:",
            options: ["Formation energy", "Energy to break bond", "Energy of atoms", "Molecular stability"],
            correct: 1,
            topic: "Chemical Bonding",
            difficulty: "medium",
            theory: "BDE = energy required to break bond completely.",
            explanation: "Energy to break bond."
        },
        {
            id: 33,
            question: "Which shows the correct order of acidity?",
            options: ["HF < HCl < HBr < HI", "HF > HCl > HBr > HI", "HI > HF > HCl > HBr", "All equal"],
            correct: 0,
            topic: "Periodic Trends",
            difficulty: "hard",
            theory: "Hydracid acidity: HF < HCl < HBr < HI (bond strength decreases).",
            explanation: "HF < HCl < HBr < HI."
        },
        {
            id: 34,
            question: "The electronic configuration of K⁺ is same as:",
            options: ["Ca", "Ar", "Cl", "S"],
            correct: 1,
            topic: "Atomic Structure",
            difficulty: "medium",
            theory: "K (19) loses e⁻ → K⁺ (18) = Ar (18).",
            explanation: "K⁺ = Ar."
        },
        {
            id: 35,
            question: "What is meant by 'degree of unsaturation'?",
            options: ["Saturation level", "Number of π bonds + rings", "Oxygen content", "Hydrogen content"],
            correct: 1,
            topic: "Organic Chemistry",
            difficulty: "hard",
            theory: "Degree of unsaturation = total π bonds + rings in molecule.",
            explanation: "π bonds + rings."
        },
        {
            id: 36,
            question: "The IUPAC name of CH₃CH=CHCH₃ is:",
            options: ["But-1-ene", "But-2-ene", "Butene", "2-Butene"],
            correct: 3,
            topic: "Organic Nomenclature",
            difficulty: "medium",
            theory: "Double bond between C2-C3: but-2-ene.",
            explanation: "But-2-ene."
        },
        {
            id: 37,
            question: "The solubility of ionic compounds increases in:",
            options: ["Non-polar solvents", "Polar solvents", "Organic solvents", "Hydrophobic solvents"],
            correct: 1,
            topic: "Solutions",
            difficulty: "easy",
            theory: "Ionic compounds soluble in polar solvents (water).",
            explanation: "Soluble in polar solvents."
        },
        {
            id: 38,
            question: "The pH of a buffer solution containing weak acid and its salt:",
            options: ["Always 7", "pH = pKa", "pH > pKa", "pH given by Henderson-Hasselbalch"],
            correct: 3,
            topic: "Buffer Solutions",
            difficulty: "hard",
            theory: "pH = pKa + log([A⁻]/[HA]) (Henderson-Hasselbalch).",
            explanation: "Henderson-Hasselbalch equation."
        },
        {
            id: 39,
            question: "The oxidizing agent is the substance that:",
            options: ["Is oxidized", "Is reduced", "Gains electrons", "Remains unchanged"],
            correct: 1,
            topic: "Redox Reactions",
            difficulty: "easy",
            theory: "Oxidizing agent is reduced (gains electrons).",
            explanation: "Oxidizing agent reduced."
        },
        {
            id: 40,
            question: "Which lanthanide shows +2 oxidation state?",
            options: ["La", "Ce", "Eu", "Lu"],
            correct: 2,
            topic: "d-block Elements",
            difficulty: "hard",
            theory: "Europium (Eu) commonly shows +2 oxidation state.",
            explanation: "Eu shows +2 state."
        }
    ],
    test5: [
        {
            id: 41,
            question: "The Kelvin temperature of 25°C is:",
            options: ["248 K", "273 K", "298 K", "323 K"],
            correct: 2,
            topic: "States of Matter",
            difficulty: "easy",
            theory: "T(K) = T(°C) + 273.15 = 25 + 273 = 298 K.",
            explanation: "25°C = 298 K."
        },
        {
            id: 42,
            question: "The ideal gas law is:",
            options: ["PV = nT", "PV = RT", "PV = nRT", "PV² = nRT"],
            correct: 2,
            topic: "Gases",
            difficulty: "easy",
            theory: "Ideal gas law: PV = nRT.",
            explanation: "PV = nRT."
        },
        {
            id: 43,
            question: "The critical point is where:",
            options: ["Gas becomes liquid", "All states meet", "Pressure is infinite", "Temperature is zero"],
            correct: 1,
            topic: "States of Matter",
            difficulty: "medium",
            theory: "Critical point where gas/liquid distinction disappears.",
            explanation: "States distinction disappears."
        },
        {
            id: 44,
            question: "The heat capacity at constant pressure (Cp) is:",
            options: ["Equal to Cv", "Less than Cv", "Greater than Cv", "Always zero"],
            correct: 2,
            topic: "Thermodynamics",
            difficulty: "medium",
            theory: "Cp - Cv = R (always).",
            explanation: "Cp > Cv."
        },
        {
            id: 45,
            question: "The entropy of a system represents:",
            options: ["Order", "Disorder", "Energy", "Temperature"],
            correct: 1,
            topic: "Thermochemistry",
            difficulty: "easy",
            theory: "Entropy is measure of disorder/randomness.",
            explanation: "Entropy = disorder."
        },
        {
            id: 46,
            question: "The electrochemical series is arranged based on:",
            options: ["Atomic size", "Reduction potentials", "Ionization energy", "Electronegativity"],
            correct: 1,
            topic: "Electrochemistry",
            difficulty: "medium",
            theory: "Electrochemical series: ordered by standard reduction potentials.",
            explanation: "Based on reduction potentials."
        },
        {
            id: 47,
            question: "Which metal is most easily oxidized?",
            options: ["Cu", "Fe", "Na", "Au"],
            correct: 2,
            topic: "Electrochemistry",
            difficulty: "easy",
            theory: "Sodium has most negative reduction potential.",
            explanation: "Na easily oxidized."
        },
        {
            id: 48,
            question: "The osmotic pressure is related to:",
            options: ["Volume", "Molar concentration", "Temperature only", "A and B"],
            correct: 3,
            topic: "Colligative Properties",
            difficulty: "medium",
            theory: "π = iMRT (depends on concentration and temperature).",
            explanation: "π ∝ M and T."
        },
        {
            id: 49,
            question: "The boiling point elevation constant Kb is:",
            options: ["Same for all solvents", "Characteristic of solvent", "Dependent on solute", "Zero"],
            correct: 1,
            topic: "Colligative Properties",
            difficulty: "easy",
            theory: "Kb is property of solvent only, not solute.",
            explanation: "Solvent characteristic."
        },
        {
            id: 50,
            question: "The freezing point depression of a solution is due to:",
            options: ["Added solute", "Increased entropy", "Decreased particle interactions", "All above"],
            correct: 3,
            topic: "Colligative Properties",
            difficulty: "hard",
            theory: "FPD due to entropy increase from added solute.",
            explanation: "Entropy and solute effects."
        }
    ],
    test6: [
        {
            id: 51,
            question: "Which is a strong electrolyte:",
            options: ["Acetic acid", "Ammonia", "Sodium chloride", "Ethanol"],
            correct: 2,
            topic: "Solutions",
            difficulty: "easy",
            theory: "NaCl fully dissociates (strong electrolyte).",
            explanation: "NaCl strong electrolyte."
        },
        {
            id: 52,
            question: "The rate constant k depends on:",
            options: ["Concentration", "Temperature", "Pressure", "Both B and C"],
            correct: 1,
            topic: "Chemical Kinetics",
            difficulty: "medium",
            theory: "k depends on temperature (Arrhenius equation).",
            explanation: "k temperature dependent."
        },
        {
            id: 53,
            question: "The order of reaction is:",
            options: ["Sum of exponents in rate law", "Stoichiometric coefficient sum", "Molecular weight terms", "None"],
            correct: 0,
            topic: "Chemical Kinetics",
            difficulty: "medium",
            theory: "Order = sum of exponents in experimental rate law.",
            explanation: "Sum of rate law exponents."
        },
        {
            id: 54,
            question: "Catalysts increase reaction rate by:",
            options: ["Increasing activation energy", "Decreasing activation energy", "Increasing temperature", "Changing equilibrium"],
            correct: 1,
            topic: "Chemical Kinetics",
            difficulty: "easy",
            theory: "Catalyst lowers activation energy.",
            explanation: "Lowers activation energy."
        },
        {
            id: 55,
            question: "The law of mass action applies to:",
            options: ["All reactions", "Reversible reactions only", "Fast reactions", "Elementary reactions"],
            correct: 3,
            topic: "Equilibrium",
            difficulty: "hard",
            theory: "Mass action law strictly for elementary reactions.",
            explanation: "Elementary reactions only."
        },
        {
            id: 56,
            question: "The Kp and Kc relationship is:",
            options: ["Kp = Kc", "Kp = Kc(RT)ⁿ", "Kc = Kp(RT)ⁿ", "Depends on pressure"],
            correct: 1,
            topic: "Equilibrium",
            difficulty: "hard",
            theory: "Kp = Kc(RT)^Δn.",
            explanation: "Kp = Kc(RT)^Δn."
        },
        {
            id: 57,
            question: "Le Chatelier's principle states:",
            options: ["Equilibrium never shifts", "System opposes stress", "Reaction stops", "Temperature always increases"],
            correct: 1,
            topic: "Equilibrium",
            difficulty: "easy",
            theory: "System shifts to counteract applied change.",
            explanation: "Opposes applied stress."
        },
        {
            id: 58,
            question: "In a solution, the ion product of water is:",
            options: ["10⁻⁷", "10⁻¹⁴", "10⁻²¹", "Variable"],
            correct: 1,
            topic: "Acid-Base Chemistry",
            difficulty: "easy",
            theory: "Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25°C.",
            explanation: "Kw = 10⁻¹⁴."
        },
        {
            id: 59,
            question: "The functional group in aldehydes is:",
            options: ["-COOH", "-CHO", "-OH", "-NH₂"],
            correct: 1,
            topic: "Organic Chemistry",
            difficulty: "easy",
            theory: "Aldehyde group: -CHO (carbonyl).",
            explanation: "Aldehyde: -CHO."
        },
        {
            id: 60,
            question: "The functional group in ketones is:",
            options: ["-COOH", "-CHO", ">C=O", "-OH"],
            correct: 2,
            topic: "Organic Chemistry",
            difficulty: "easy",
            theory: "Ketone: >C=O (carbon in middle of chain).",
            explanation: "Ketone: >C=O."
        }
    ],
    test7: [
        {
            id: 61,
            question: "Which compound is an ether?",
            options: ["CH₃COOH", "CH₃CH₂OH", "CH₃-O-CH₃", "CH₃CHO"],
            correct: 2,
            topic: "Organic Chemistry",
            difficulty: "easy",
            theory: "Ether: R-O-R' (oxygen between carbon chains).",
            explanation: "Ether: -O- linkage."
        },
        {
            id: 62,
            question: "The esterification reaction produces:",
            options: ["Acid and alcohol", "Ester and water", "Alkene and acid", "Alkane and base"],
            correct: 1,
            topic: "Organic Chemistry",
            difficulty: "easy",
            theory: "Acid + Alcohol → Ester + Water.",
            explanation: "Ester + water."
        },
        {
            id: 63,
            question: "Aromatic compounds show stability due to:",
            options: ["Molecular size", "Resonance", "Polar bonds", "Chain length"],
            correct: 1,
            topic: "Organic Chemistry",
            difficulty: "medium",
            theory: "Resonance stabilization in aromatic rings.",
            explanation: "Resonance stability."
        },
        {
            id: 64,
            question: "The ortho-, meta-, para- isomerism is:",
            options: ["Structural isomerism", "Positional isomerism", "Functional isomerism", "Tautomerism"],
            correct: 1,
            topic: "Organic Chemistry",
            difficulty: "medium",
            theory: "o-, m-, p- isomers differ in substituent positions.",
            explanation: "Positional isomerism."
        },
        {
            id: 65,
            question: "Which polymer is thermoplastic?",
            options: ["Bakelite", "Formica", "Polyethylene", "Thermosetting plastic"],
            correct: 2,
            topic: "Polymers",
            difficulty: "easy",
            theory: "Polyethylene is thermoplastic (can be remelted).",
            explanation: "Polyethylene thermoplastic."
        },
        {
            id: 66,
            question: "The monomer of polyethylene is:",
            options: ["Acetylene", "Ethylene", "Benzene", "Propane"],
            correct: 1,
            topic: "Polymers",
            difficulty: "easy",
            theory: "Polyethylene from ethylene (C₂H₄).",
            explanation: "Monomer: ethylene."
        },
        {
            id: 67,
            question: "Which gas is produced when sodium reacts with water?",
            options: ["Oxygen", "Hydrogen", "Chlorine", "Nitrogen"],
            correct: 1,
            topic: "Alkali Metals",
            difficulty: "easy",
            theory: "2Na + 2H₂O → 2NaOH + H₂↑.",
            explanation: "Hydrogen gas."
        },
        {
            id: 68,
            question: "The solubility of alkali metal hydroxides increases:",
            options: ["Down the group", "Up the group", "Across the period", "No trend"],
            correct: 0,
            topic: "Periodic Trends",
            difficulty: "medium",
            theory: "Solubility of alkali metal hydroxides increases down the group.",
            explanation: "Increases down group."
        },
        {
            id: 69,
            question: "Which halogen is a liquid at room temperature?",
            options: ["Fluorine", "Chlorine", "Bromine", "Iodine"],
            correct: 2,
            topic: "Halogens",
            difficulty: "easy",
            theory: "Bromine is liquid at room temperature (reddish-brown).",
            explanation: "Bromine liquid."
        },
        {
            id: 70,
            question: "The reducing power of halogens increases:",
            options: ["F > Cl > Br > I", "I > Br > Cl > F", "All equal", "Depends on solvent"],
            correct: 1,
            topic: "Halogens",
            difficulty: "medium",
            theory: "Reducing power: I > Br > Cl > F.",
            explanation: "I > Br > Cl > F."
        }
    ],
    test8: [
        {
            id: 71,
            question: "Which gas reacts with limestone to form chalk?",
            options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Hydrogen"],
            correct: 2,
            topic: "Non-metals",
            difficulty: "easy",
            theory: "CO₂ forms CaCO₃ (chalk) with Ca(OH)₂.",
            explanation: "CO₂ forms chalk."
        },
        {
            id: 72,
            question: "The electronic configuration of transition elements involves:",
            options: ["s-orbitals only", "(n-1)d and ns orbitals", "p-orbitals only", "f-orbitals"],
            correct: 1,
            topic: "Transition Elements",
            difficulty: "easy",
            theory: "Transition elements: (n-1)d¹⁻¹⁰ ns¹⁻².",
            explanation: "(n-1)d and ns."
        },
        {
            id: 73,
            question: "Transition metal compounds are colored due to:",
            options: ["High atomic number", "d-d transitions", "s-p transitions", "Polarization"],
            correct: 1,
            topic: "Transition Elements",
            difficulty: "medium",
            theory: "Color from d-d electron transitions.",
            explanation: "d-d transitions."
        },
        {
            id: 74,
            question: "The magnetic moment of transition metals is due to:",
            options: ["Unpaired electrons", "Atomic size", "Nuclear charge", "Electronegativity"],
            correct: 0,
            topic: "Transition Elements",
            difficulty: "medium",
            theory: "Magnetic moment from unpaired d-electrons.",
            explanation: "Unpaired electrons."
        },
        {
            id: 75,
            question: "Which coordination number is most common in complexes?",
            options: ["2", "4", "6", "8"],
            correct: 2,
            topic: "Coordination Chemistry",
            difficulty: "easy",
            theory: "Coordination number 6 most common (octahedral).",
            explanation: "CN = 6 most common."
        },
        {
            id: 76,
            question: "The crystal field theory explains:",
            options: ["Bonding", "Color of complexes", "Molecular shape", "Only B"],
            correct: 3,
            topic: "Coordination Chemistry",
            difficulty: "hard",
            theory: "CFT explains color and stability of complexes.",
            explanation: "Color and stability."
        },
        {
            id: 77,
            question: "The chelating ligand forms:",
            options: ["One bond", "Two bonds", "Multiple bonds", "Hydrogen bonds"],
            correct: 2,
            topic: "Coordination Chemistry",
            difficulty: "medium",
            theory: "Chelate: ligand with multiple donor atoms.",
            explanation: "Multiple attachment bonds."
        },
        {
            id: 78,
            question: "The oxidation number is used to:",
            options: ["Predict color", "Track electron transfer", "Determine mass", "Calculate volume"],
            correct: 1,
            topic: "Redox Reactions",
            difficulty: "easy",
            theory: "Oxidation number tracks electrons in redox.",
            explanation: "Electron transfer tracking."
        },
        {
            id: 79,
            question: "The inner transition elements include:",
            options: ["Transition metals", "Lanthanides and actinides", "Halogens", "Alkali metals"],
            correct: 1,
            topic: "Inner Transition Elements",
            difficulty: "easy",
            theory: "Inner transition: f-block (lanthanides, actinides).",
            explanation: "Lanthanides/actinides."
        },
        {
            id: 80,
            question: "The lanthanide contraction is due to:",
            options: ["Poor shielding by f-electrons", "Increased nuclear charge", "Both A and B", "External electron addition"],
            correct: 2,
            topic: "Lanthanides",
            difficulty: "hard",
            theory: "Poor f-electron shielding + increasing nuclear charge.",
            explanation: "Shielding + nuclear charge."
        }
    ],
    test9: [
        {
            id: 81,
            question: "Bauxite is the ore of:",
            options: ["Iron", "Aluminum", "Gold", "Silver"],
            correct: 1,
            topic: "Metallurgy",
            difficulty: "easy",
            theory: "Bauxite (Al₂O₃·3H₂O) is primary aluminum ore.",
            explanation: "Bauxite aluminum ore."
        },
        {
            id: 82,
            question: "The main ore of iron is:",
            options: ["Limonite", "Magnetite", "Hematite", "Both B and C"],
            correct: 3,
            topic: "Metallurgy",
            difficulty: "easy",
            theory: "Main ores: Fe₃O₄ (magnetite), Fe₂O₃ (hematite).",
            explanation: "Magnetite and hematite."
        },
        {
            id: 83,
            question: "Allotropy is the property shown by:",
            options: ["Different compounds", "Different elements", "Same element different states", "Different phases"],
            correct: 2,
            topic: "Properties of Elements",
            difficulty: "easy",
            theory: "Allotropy: same element, different atomic arrangements.",
            explanation: "Same element, different forms."
        },
        {
            id: 84,
            question: "The allotropes of carbon include:",
            options: ["Diamond only", "Diamond and graphite", "Diamond, graphite, buckminsterfullerene", "Graphite only"],
            correct: 2,
            topic: "Carbon Chemistry",
            difficulty: "medium",
            theory: "Carbon allotropes: diamond, graphite, fullerenes, amorphous.",
            explanation: "Diamond, graphite, C₆₀."
        },
        {
            id: 85,
            question: "The hardest natural substance is:",
            options: ["Graphite", "Diamond", "Silicon carbide", "Tungsten carbide"],
            correct: 1,
            topic: "Carbon Chemistry",
            difficulty: "easy",
            theory: "Diamond hardest due to strong covalent bonding.",
            explanation: "Diamond hardest."
        },
        {
            id: 86,
            question: "Glass is a:",
            options: ["Crystalline solid", "Amorphous solid", "Liquid", "Gas"],
            correct: 1,
            topic: "Silicates",
            difficulty: "easy",
            theory: "Glass is amorphous (no long-range order).",
            explanation: "Amorphous solid."
        },
        {
            id: 87,
            question: "The main constituent of cement is:",
            options: ["SiO₂", "CaCO₃", "3CaO·SiO₂", "CaSiO₃"],
            correct: 2,
            topic: "Silicates",
            difficulty: "medium",
            theory: "Cement: tricalcium silicate 3CaO·SiO₂.",
            explanation: "3CaO·SiO₂."
        },
        {
            id: 88,
            question: "Water hardness is primarily due to:",
            options: ["NaCl", "Ca²⁺ and Mg²⁺ ions", "Al³⁺ ions", "K⁺ ions"],
            correct: 1,
            topic: "Water Chemistry",
            difficulty: "easy",
            theory: "Hardness from Ca²⁺ and Mg²⁺ ions.",
            explanation: "Ca²⁺ and Mg²⁺."
        },
        {
            id: 89,
            question: "Temporary hardness can be removed by:",
            options: ["Addition of salt", "Boiling water", "Passing through sand", "Addition of acid"],
            correct: 1,
            topic: "Water Chemistry",
            difficulty: "medium",
            theory: "Temporary hardness removed by heating.",
            explanation: "Removed by boiling."
        },
        {
            id: 90,
            question: "The pH of pure water at 25°C is:",
            options: ["0", "7", "14", "Neutral"],
            correct: 1,
            topic: "Acid-Base Chemistry",
            difficulty: "easy",
            theory: "Pure water neutral: pH = 7 at 25°C.",
            explanation: "pH = 7."
        }
    ],
    test10: [
        {
            id: 91,
            question: "Biochemistry deals with:",
            options: ["Living organisms chemistry", "Complex organic compounds", "Metabolic processes", "All above"],
            correct: 3,
            topic: "Biochemistry",
            difficulty: "easy",
            theory: "Biochemistry combines all aspects of living systems.",
            explanation: "All of above."
        },
        {
            id: 92,
            question: "Proteins are polymers of:",
            options: ["Glucose", "Amino acids", "Fatty acids", "Nucleotides"],
            correct: 1,
            topic: "Biochemistry",
            difficulty: "easy",
            theory: "Proteins made of amino acids linked by peptide bonds.",
            explanation: "Amino acids polymer."
        },
        {
            id: 93,
            question: "Carbohydrates have general formula:",
            options: ["CₓHᵧOᵤ", "Cₓ(H₂O)ᵧ", "CₓHₓOˣ/₂", "None"],
            correct: 1,
            topic: "Carbohydrates",
            difficulty: "easy",
            theory: "Carbohydrates: Cₓ(H₂O)ᵧ general formula.",
            explanation: "Cₓ(H₂O)ᵧ."
        },
        {
            id: 94,
            question: "Lipids are primarily composed of:",
            options: ["Carbon and oxygen", "Carbon and hydrogen", "Carbon, hydrogen, oxygen", "All elements"],
            correct: 1,
            topic: "Lipids",
            difficulty: "easy",
            theory: "Lipids: mostly C and H, some O.",
            explanation: "C and H mainly."
        },
        {
            id: 95,
            question: "RNA differs from DNA in:",
            options: ["Ribose vs deoxyribose", "Uracil vs thymine", "Single vs double stranded", "All above"],
            correct: 3,
            topic: "Nucleic Acids",
            difficulty: "medium",
            theory: "RNA: ribose, uracil, single-stranded.",
            explanation: "Multiple differences."
        },
        {
            id: 96,
            question: "Enzymes are primarily:",
            options: ["Carbohydrates", "Lipids", "Proteins", "Nucleic acids"],
            correct: 2,
            topic: "Enzymes",
            difficulty: "easy",
            theory: "Most enzymes are proteins.",
            explanation: "Proteins."
        },
        {
            id: 97,
            question: "The pH optimum of pepsin is around:",
            options: ["2", "7", "9", "12"],
            correct: 0,
            topic: "Enzymes",
            difficulty: "medium",
            theory: "Pepsin optimal pH ≈ 2 (stomach acid).",
            explanation: "pH ≈ 2."
        },
        {
            id: 98,
            question: "Vitamins are:",
            options: ["Carbohydrates", "Hormones", "Organic compounds needed in small amounts", "Enzymes"],
            correct: 2,
            topic: "Vitamins",
            difficulty: "easy",
            theory: "Vitamins: essential organic compounds in small quantities.",
            explanation: "Essential organics."
        },
        {
            id: 99,
            question: "Which vitamin is synthesized by body?",
            options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin B₁"],
            correct: 1,
            topic: "Vitamins",
            difficulty: "medium",
            theory: "Vitamin D synthesized in skin from sunlight.",
            explanation: "Vitamin D."
        },
        {
            id: 100,
            question: "Photosynthesis produces:",
            options: ["CO₂ and H₂O", "Glucose and O₂", "Only glucose", "Only oxygen"],
            correct: 1,
            topic: "Biochemistry",
            difficulty: "easy",
            theory: "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
            explanation: "Glucose and oxygen."
        }
    ]
};

module.exports = { neetChemistryQuestions };
