export const jeeChemistryQuestions = [
    {
        id: 1,
        question: "What is the IUPAC name of CH₃-CH(CH₃)-CH₂-CH₃?",
        options: ["2-methylbutane", "3-methylbutane", "Isopentane", "Neopentane"],
        correct: 0,
        topic: "Organic Chemistry",
        difficulty: "easy",
        theory: "In IUPAC nomenclature, we identify the longest carbon chain and number it from the end that gives the substituent the lowest number. Here, the longest chain has 4 carbons (butane), and the methyl group is at position 2. Hence, the IUPAC name is 2-methylbutane. Both 2-methylbutane and isopentane refer to the same compound, but IUPAC name is 2-methylbutane.",
        explanation: "The compound has a 4-carbon main chain with a methyl group at position 2. IUPAC name = 2-methylbutane."
    },
    {
        id: 2,
        question: "The oxidation state of Cr in K₂Cr₂O₇ is:",
        options: ["+3", "+6", "+7", "+2"],
        correct: 1,
        topic: "Redox Reactions",
        difficulty: "medium",
        theory: "To find the oxidation state of Cr in K₂Cr₂O₇: K has +1 oxidation state, O has -2 oxidation state. Let Cr have oxidation state x. Then: 2(+1) + 2(x) + 7(-2) = 0. Therefore, 2 + 2x - 14 = 0, which gives 2x = 12, so x = +6. Chromium is in +6 oxidation state in dichromate ions.",
        explanation: "In K₂Cr₂O₇, using oxidation state rules: K(+1) + Cr(x) + O(-2). Sum: 2(+1) + 2x + 7(-2) = 0 → 2x = 12 → x = +6."
    },
    {
        id: 3,
        question: "Which of the following is the most acidic?",
        options: ["Phenol", "Ethanol", "Water", "Acetic acid"],
        correct: 3,
        topic: "Organic Chemistry",
        difficulty: "medium",
        theory: "Acidity is determined by the ease of donating a proton. Acetic acid (CH₃COOH) is a carboxylic acid with Ka ≈ 1.8×10⁻⁵. Phenol has Ka ≈ 1.0×10⁻¹⁰, water has Ka ≈ 1.0×10⁻¹⁴, and ethanol is extremely weak. The smaller the Ka, the weaker the acid. Since acetic acid has the largest Ka value, it is the strongest acid among these.",
        explanation: "Acetic acid (carboxylic acid) is the most acidic because its Ka is the largest. Carboxylic acids are much more acidic than phenols, water, or alcohols."
    },
    {
        id: 4,
        question: "The shape of SF₄ molecule is:",
        options: ["Tetrahedral", "Square planar", "See-saw", "Trigonal bipyramidal"],
        correct: 2,
        topic: "Chemical Bonding",
        difficulty: "hard",
        theory: "SF₄ has S (central atom) with 6 valence electrons. With 4 fluorine atoms bonded, S has 4 bonding pairs and 1 lone pair (steric number = 5). According to VSEPR theory, 5 electron pairs arrange themselves in trigonal bipyramidal geometry. With 1 lone pair, the molecular shape becomes see-saw (or distorted tetrahedral).",
        explanation: "SF₄: S has 6 valence electrons, forms 4 bonds with F, leaving 1 lone pair. Electron geometry is trigonal bipyramidal, but molecular shape is see-saw due to the lone pair."
    },
    {
        id: 5,
        question: "What is the pH of a 0.01 M HCl solution?",
        options: ["1", "2", "3", "7"],
        correct: 1,
        topic: "Acids and Bases",
        difficulty: "easy",
        theory: "HCl is a strong acid that completely dissociates. pH = -log[H⁺]. For 0.01 M HCl, [H⁺] = 0.01 = 10⁻² M. Therefore, pH = -log(10⁻²) = 2. This represents a moderately acidic solution.",
        explanation: "HCl completely dissociates: [H⁺] = 0.01 M = 10⁻² M. pH = -log(10⁻²) = 2."
    }
];
