const neetBiologyQuestions = {
    test1: [
        {
            id: 1,
            question: "The powerhouse of the cell is:",
            options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
            correct: 1,
            topic: "Cell Biology",
            difficulty: "easy",
            theory: "Mitochondria is the powerhouse producing ATP through cellular respiration.",
            explanation: "Mitochondria produces ATP."
        },
        {
            id: 2,
            question: "Photosynthesis takes place in:",
            options: ["Mitochondria", "Chloroplast", "Nucleus", "Cytoplasm"],
            correct: 1,
            topic: "Photosynthesis",
            difficulty: "easy",
            theory: "Photosynthesis occurs in chloroplasts.",
            explanation: "Chloroplasts site of photosynthesis."
        },
        {
            id: 3,
            question: "The normal blood pressure in humans is:",
            options: ["120/80 mmHg", "140/90 mmHg", "100/60 mmHg", "160/100 mmHg"],
            correct: 0,
            topic: "Physiology",
            difficulty: "easy",
            theory: "Normal blood pressure = 120/80 mmHg.",
            explanation: "Normal BP = 120/80."
        },
        {
            id: 4,
            question: "DNA replication is:",
            options: ["Conservative", "Semi-conservative", "Dispersive", "Random"],
            correct: 1,
            topic: "Molecular Biology",
            difficulty: "medium",
            theory: "DNA replication is semi-conservative (one old, one new strand).",
            explanation: "Semi-conservative replication."
        },
        {
            id: 5,
            question: "The process of breaking down glucose is called:",
            options: ["Photosynthesis", "Cellular respiration", "Fermentation", "Transcription"],
            correct: 1,
            topic: "Respiration",
            difficulty: "easy",
            theory: "Cellular respiration breaks down glucose for energy.",
            explanation: "Glucose breakdown."
        },
        {
            id: 6,
            question: "The functional unit of life is:",
            options: ["Tissue", "Cell", "Organ", "Organism"],
            correct: 1,
            topic: "Cell Biology",
            difficulty: "easy",
            theory: "Cell is the functional unit of all living organisms.",
            explanation: "Cell is functional unit."
        },
        {
            id: 7,
            question: "Which organelle is involved in protein synthesis?",
            options: ["Golgi apparatus", "Ribosome", "Endoplasmic reticulum", "Nucleus"],
            correct: 1,
            topic: "Cell Biology",
            difficulty: "easy",
            theory: "Ribosomes synthesize proteins.",
            explanation: "Ribosomes make proteins."
        },
        {
            id: 8,
            question: "The control center of the cell is:",
            options: ["Mitochondria", "Ribosome", "Nucleus", "Lysosome"],
            correct: 2,
            topic: "Cell Biology",
            difficulty: "easy",
            theory: "Nucleus controls cell activities and stores genetic material.",
            explanation: "Nucleus is control center."
        },
        {
            id: 9,
            question: "Photosynthesis equation is:",
            options: ["C₆H₁₂O₆ + O₂ → CO₂ + H₂O", "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", "O₂ → CO₂ + H₂O", "C₆H₁₂O₆ → CO₂ + H₂O"],
            correct: 1,
            topic: "Photosynthesis",
            difficulty: "easy",
            theory: "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
            explanation: "Photosynthesis equation."
        },
        {
            id: 10,
            question: "Which vitamin is synthesized in skin?",
            options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
            correct: 3,
            topic: "Nutrition",
            difficulty: "medium",
            theory: "Vitamin D is synthesized in skin from sunlight.",
            explanation: "Vitamin D from sunlight."
        }
    ],
    test2: [
        {
            id: 11,
            question: "The stage of meiosis where homologous chromosomes separate is:",
            options: ["Prophase I", "Metaphase I", "Anaphase I", "Telophase I"],
            correct: 2,
            topic: "Genetics",
            difficulty: "medium",
            theory: "Anaphase I: homologous chromosomes separate.",
            explanation: "Anaphase I separation."
        },
        {
            id: 12,
            question: "Red blood cells in humans are produced in:",
            options: ["Liver", "Spleen", "Bone marrow", "Thymus"],
            correct: 2,
            topic: "Physiology",
            difficulty: "easy",
            theory: "Red blood cells produced in bone marrow.",
            explanation: "RBCs from bone marrow."
        },
        {
            id: 13,
            question: "The structural protein in hair and nails is:",
            options: ["Collagen", "Elastin", "Keratin", "Actin"],
            correct: 2,
            topic: "Proteins",
            difficulty: "easy",
            theory: "Keratin is structural protein in hair and nails.",
            explanation: "Keratin in hair/nails."
        },
        {
            id: 14,
            question: "The number of chambers in human heart is:",
            options: ["2", "3", "4", "5"],
            correct: 2,
            topic: "Physiology",
            difficulty: "easy",
            theory: "Human heart has 4 chambers: 2 atria, 2 ventricles.",
            explanation: "4 chambers."
        },
        {
            id: 15,
            question: "The hormone regulating blood sugar is:",
            options: ["Glucagon", "Insulin", "Thyroxine", "Cortisol"],
            correct: 1,
            topic: "Physiology",
            difficulty: "easy",
            theory: "Insulin regulates blood glucose.",
            explanation: "Insulin controls glucose."
        },
        {
            id: 16,
            question: "The human skeleton is composed of:",
            options: ["Cartilage only", "Bone only", "Bone and cartilage", "Muscle"],
            correct: 2,
            topic: "Anatomy",
            difficulty: "easy",
            theory: "Skeleton: bone and cartilage.",
            explanation: "Bone and cartilage."
        },
        {
            id: 17,
            question: "The light-independent reactions of photosynthesis occur in:",
            options: ["Thylakoid", "Stroma", "Grana", "Inner membrane"],
            correct: 1,
            topic: "Photosynthesis",
            difficulty: "hard",
            theory: "Calvin cycle (light-independent) in stroma.",
            explanation: "Stroma Calvin cycle."
        },
        {
            id: 18,
            question: "The process of DNA to mRNA is:",
            options: ["Translation", "Transcription", "Replication", "Mutation"],
            correct: 1,
            topic: "Molecular Biology",
            difficulty: "easy",
            theory: "Transcription: DNA → mRNA.",
            explanation: "Transcription process."
        },
        {
            id: 19,
            question: "The nitrogenous base unique to DNA is:",
            options: ["Uracil", "Thymine", "Adenine", "Guanine"],
            correct: 1,
            topic: "Molecular Biology",
            difficulty: "easy",
            theory: "Thymine unique to DNA (Uracil in RNA).",
            explanation: "Thymine in DNA."
        },
        {
            id: 20,
            question: "The enzyme that breaks down starch is:",
            options: ["Lipase", "Protease", "Amylase", "Nuclease"],
            correct: 2,
            topic: "Digestion",
            difficulty: "easy",
            theory: "Amylase breaks down starch.",
            explanation: "Amylase starch enzyme."
        }
    ],
    test3: [
        {
            id: 21,
            question: "The total number of chromosomes in human cell is:",
            options: ["23", "46", "48", "92"],
            correct: 1,
            topic: "Genetics",
            difficulty: "easy",
            theory: "Humans have 46 chromosomes (23 pairs).",
            explanation: "46 chromosomes."
        },
        {
            id: 22,
            question: "The type of inheritance where both alleles are expressed:",
            options: ["Dominant", "Recessive", "Codominant", "Incomplete dominant"],
            correct: 2,
            topic: "Genetics",
            difficulty: "medium",
            theory: "Codominance: both alleles expressed equally.",
            explanation: "Codominant expression."
        },
        {
            id: 23,
            question: "The vessel that carries oxygenated blood from lungs is:",
            options: ["Pulmonary artery", "Pulmonary vein", "Aorta", "Vena cava"],
            correct: 1,
            topic: "Physiology",
            difficulty: "medium",
            theory: "Pulmonary veins carry oxygenated blood.",
            explanation: "Pulmonary veins."
        },
        {
            id: 24,
            question: "The lining of the small intestine has finger-like projections called:",
            options: ["Villi", "Microvilli", "Cilia", "Flagella"],
            correct: 0,
            topic: "Digestion",
            difficulty: "medium",
            theory: "Villi increase surface area for absorption.",
            explanation: "Villi in intestine."
        },
        {
            id: 25,
            question: "The smallest unit of classification is:",
            options: ["Genus", "Species", "Family", "Kingdom"],
            correct: 1,
            topic: "Classification",
            difficulty: "easy",
            theory: "Species is the basic unit of classification.",
            explanation: "Species basic unit."
        },
        {
            id: 26,
            question: "Which type of leukocyte is involved in antibody production?",
            options: ["Neutrophil", "Lymphocyte", "Monocyte", "Basophil"],
            correct: 1,
            topic: "Immunity",
            difficulty: "medium",
            theory: "B-lymphocytes produce antibodies.",
            explanation: "Lymphocytes antibodies."
        },
        {
            id: 27,
            question: "The hormone promoting growth in plants is:",
            options: ["Ethylene", "Auxin", "Gibberellin", "All above"],
            correct: 3,
            topic: "Plant Physiology",
            difficulty: "medium",
            theory: "Multiple hormones promote growth.",
            explanation: "Plant growth hormones."
        },
        {
            id: 28,
            question: "The process of water loss from plants is:",
            options: ["Photosynthesis", "Transpiration", "Respiration", "Digestion"],
            correct: 1,
            topic: "Plant Physiology",
            difficulty: "easy",
            theory: "Transpiration: water loss from leaves.",
            explanation: "Transpiration water loss."
        },
        {
            id: 29,
            question: "The genetic material in prokaryotes is:",
            options: ["DNA in nucleus", "Circular DNA", "Double helix DNA", "Linear DNA"],
            correct: 1,
            topic: "Cell Biology",
            difficulty: "medium",
            theory: "Prokaryotes: circular DNA not in nucleus.",
            explanation: "Circular DNA."
        },
        {
            id: 30,
            question: "The type of reproduction in bacteria is:",
            options: ["Sexual", "Asexual", "Binary fission", "Both B and C"],
            correct: 3,
            topic: "Microbiology",
            difficulty: "easy",
            theory: "Bacteria reproduce via asexual methods (binary fission).",
            explanation: "Asexual reproduction."
        }
    ],
    test4: [
        {
            id: 31,
            question: "The enzyme responsible for DNA replication is:",
            options: ["DNA ligase", "DNA polymerase", "Helicase", "Primase"],
            correct: 1,
            topic: "Molecular Biology",
            difficulty: "medium",
            theory: "DNA polymerase synthesizes new DNA strand.",
            explanation: "DNA polymerase."
        },
        {
            id: 32,
            question: "The process of photolysis is:",
            options: ["Breaking of glucose", "Breaking of water", "Breaking of CO₂", "Breaking of O₂"],
            correct: 1,
            topic: "Photosynthesis",
            difficulty: "hard",
            theory: "Photolysis: water split in light reactions.",
            explanation: "Water splitting."
        },
        {
            id: 33,
            question: "The nerve impulse transmission across synapse is:",
            options: ["Electrical", "Chemical", "Both", "Mechanical"],
            correct: 1,
            topic: "Physiology",
            difficulty: "medium",
            theory: "Synaptic transmission: chemical (neurotransmitters).",
            explanation: "Chemical transmission."
        },
        {
            id: 34,
            question: "The part of brain controlling balance is:",
            options: ["Cerebrum", "Cerebellum", "Medulla", "Pons"],
            correct: 1,
            topic: "Anatomy",
            difficulty: "easy",
            theory: "Cerebellum controls balance and coordination.",
            explanation: "Cerebellum balance."
        },
        {
            id: 35,
            question: "The skin layer containing melanin is:",
            options: ["Epidermis", "Dermis", "Hypodermis", "Stratum corneum"],
            correct: 0,
            topic: "Anatomy",
            difficulty: "easy",
            theory: "Epidermis produces melanin.",
            explanation: "Epidermis melanin."
        },
        {
            id: 36,
            question: "The muscular wall of heart is:",
            options: ["Endocardium", "Myocardium", "Epicardium", "Pericardium"],
            correct: 1,
            topic: "Anatomy",
            difficulty: "medium",
            theory: "Myocardium: muscular layer of heart.",
            explanation: "Myocardium."
        },
        {
            id: 37,
            question: "The immune response involving T-cells is:",
            options: ["Humoral", "Cellular", "Both", "Non-specific"],
            correct: 1,
            topic: "Immunity",
            difficulty: "medium",
            theory: "Cellular immunity: T-cell mediated.",
            explanation: "Cellular immunity."
        },
        {
            id: 38,
            question: "The 'fight or flight' hormone is:",
            options: ["Insulin", "Glucagon", "Adrenaline", "Cortisol"],
            correct: 2,
            topic: "Physiology",
            difficulty: "easy",
            theory: "Adrenaline (epinephrine) triggers fight-or-flight.",
            explanation: "Adrenaline response."
        },
        {
            id: 39,
            question: "The process of breaking down amino acids is:",
            options: ["Deamination", "Transamination", "Oxidation", "Reduction"],
            correct: 0,
            topic: "Metabolism",
            difficulty: "hard",
            theory: "Deamination: amino group removal from amino acids.",
            explanation: "Deamination process."
        },
        {
            id: 40,
            question: "The percentage of oxygen in air is approximately:",
            options: ["21%", "78%", "1%", "100%"],
            correct: 0,
            topic: "Environment",
            difficulty: "easy",
            theory: "Air composition: ~21% O₂, ~78% N₂, ~1% others.",
            explanation: "21% oxygen."
        }
    ],
    test5: [
        {
            id: 41,
            question: "The first law of thermodynamics is:",
            options: ["Energy created", "Energy destroyed", "Energy conserved", "Energy lost"],
            correct: 2,
            topic: "Bioenergetics",
            difficulty: "hard",
            theory: "First law: energy cannot be created/destroyed.",
            explanation: "Energy conserved."
        },
        {
            id: 42,
            question: "The process of converting ammonia to nitrate is:",
            options: ["Nitrogen fixation", "Nitrification", "Denitrification", "Ammonification"],
            correct: 1,
            topic: "Ecology",
            difficulty: "hard",
            theory: "Nitrification: ammonia → nitrite → nitrate.",
            explanation: "Nitrification process."
        },
        {
            id: 43,
            question: "The succession starting from bare rock is:",
            options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
            correct: 0,
            topic: "Ecology",
            difficulty: "medium",
            theory: "Primary succession starts from bare rock.",
            explanation: "Primary succession."
        },
        {
            id: 44,
            question: "The type of natural selection favoring extreme phenotypes:",
            options: ["Stabilizing", "Directional", "Disruptive", "Artificial"],
            correct: 2,
            topic: "Evolution",
            difficulty: "hard",
            theory: "Disruptive selection favors extremes.",
            explanation: "Disruptive selection."
        },
        {
            id: 45,
            question: "The evidence of evolution from similar structures is called:",
            options: ["Vestigial", "Homologous", "Analogous", "Fossil"],
            correct: 1,
            topic: "Evolution",
            difficulty: "medium",
            theory: "Homologous structures indicate evolution.",
            explanation: "Homologous structures."
        },
        {
            id: 46,
            question: "The largest biome is:",
            options: ["Tundra", "Desert", "Ocean", "Grassland"],
            correct: 2,
            topic: "Ecology",
            difficulty: "easy",
            theory: "Oceans cover most of Earth.",
            explanation: "Ocean largest biome."
        },
        {
            id: 47,
            question: "The process of converting genetic code to protein is:",
            options: ["Replication", "Transcription", "Translation", "Mutation"],
            correct: 2,
            topic: "Molecular Biology",
            difficulty: "easy",
            theory: "Translation: mRNA → protein.",
            explanation: "Translation process."
        },
        {
            id: 48,
            question: "The genetic code has how many codons:",
            options: ["20", "32", "64", "128"],
            correct: 2,
            topic: "Genetics",
            difficulty: "medium",
            theory: "64 codons (3 nucleotides each).",
            explanation: "64 codons."
        },
        {
            id: 49,
            question: "The mutation that has no effect is:",
            options: ["Silent", "Missense", "Nonsense", "Frameshift"],
            correct: 0,
            topic: "Genetics",
            difficulty: "medium",
            theory: "Silent mutation: no change in protein.",
            explanation: "Silent mutation."
        },
        {
            id: 50,
            question: "The ratio of species diversity to genetic diversity is:",
            options: ["1:1", "1:10", "10:1", "Variable"],
            correct: 3,
            topic: "Biodiversity",
            difficulty: "hard",
            theory: "Ratio varies, no fixed value.",
            explanation: "Variable ratio."
        }
    ],
    test6: [
        {
            id: 51,
            question: "The plant tissue responsible for transport of water is:",
            options: ["Phloem", "Xylem", "Cambium", "Cork"],
            correct: 1,
            topic: "Plant Anatomy",
            difficulty: "easy",
            theory: "Xylem transports water and minerals.",
            explanation: "Xylem water transport."
        },
        {
            id: 52,
            question: "The conversion of glucose to pyruvate is:",
            options: ["Krebs cycle", "Glycolysis", "ETC", "Fermentation"],
            correct: 1,
            topic: "Respiration",
            difficulty: "easy",
            theory: "Glycolysis breaks glucose into pyruvate.",
            explanation: "Glycolysis process."
        },
        {
            id: 53,
            question: "The molecule that carries electrons in photosynthesis is:",
            options: ["ATP", "NADPH", "FADH₂", "Cytochrome"],
            correct: 1,
            topic: "Photosynthesis",
            difficulty: "hard",
            theory: "NADPH carries electrons in light reactions.",
            explanation: "NADPH electron carrier."
        },
        {
            id: 54,
            question: "The condition where alleles have different effects is:",
            options: ["Dominance", "Penetrance", "Epistasis", "Complementation"],
            correct: 2,
            topic: "Genetics",
            difficulty: "hard",
            theory: "Epistasis: one gene masks another.",
            explanation: "Epistasis interaction."
        },
        {
            id: 55,
            question: "The study of human population is:",
            options: ["Ecology", "Demography", "Epidemiology", "Anthropology"],
            correct: 1,
            topic: "Sociology",
            difficulty: "easy",
            theory: "Demography studies population.",
            explanation: "Demography."
        },
        {
            id: 56,
            question: "The blood type determined by codominance is:",
            options: ["Type A", "Type B", "Type AB", "Type O"],
            correct: 2,
            topic: "Genetics",
            difficulty: "medium",
            theory: "Type AB: both A and B antigens (codominant).",
            explanation: "Type AB codominance."
        },
        {
            id: 57,
            question: "The gland producing thyroid hormone is in:",
            options: ["Neck", "Brain", "Abdomen", "Chest"],
            correct: 0,
            topic: "Anatomy",
            difficulty: "easy",
            theory: "Thyroid in neck.",
            explanation: "Thyroid location."
        },
        {
            id: 58,
            question: "The enzyme in stomach is:",
            options: ["Trypsin", "Pepsin", "Lipase", "Amylase"],
            correct: 1,
            topic: "Digestion",
            difficulty: "easy",
            theory: "Pepsin breaks down proteins in stomach.",
            explanation: "Pepsin enzyme."
        },
        {
            id: 59,
            question: "The type of bone marrow producing blood cells is:",
            options: ["Yellow", "Red", "White", "Brown"],
            correct: 1,
            topic: "Anatomy",
            difficulty: "medium",
            theory: "Red bone marrow produces blood cells.",
            explanation: "Red marrow."
        },
        {
            id: 60,
            question: "The virus that causes COVID-19 is:",
            options: ["SARS-CoV-2", "MERS", "SARS", "H1N1"],
            correct: 0,
            topic: "Microbiology",
            difficulty: "easy",
            theory: "SARS-CoV-2 causes COVID-19 pandemic.",
            explanation: "SARS-CoV-2."
        }
    ],
    test7: [
        {
            id: 61,
            question: "The organelle involved in intracellular digestion is:",
            options: ["Peroxisome", "Lysosome", "Ribosome", "Centrosome"],
            correct: 1,
            topic: "Cell Biology",
            difficulty: "medium",
            theory: "Lysosomes contain digestive enzymes.",
            explanation: "Lysosome digestion."
        },
        {
            id: 62,
            question: "The process where excess glucose is stored as glycogen:",
            options: ["Gluconeogenesis", "Glycogenesis", "Glycogenolysis", "Glycolysis"],
            correct: 1,
            topic: "Metabolism",
            difficulty: "medium",
            theory: "Glycogenesis: glucose → glycogen.",
            explanation: "Glycogenesis."
        },
        {
            id: 63,
            question: "The hormone produced by pancreas for glucose regulation:",
            options: ["Glucagon", "Insulin", "Both", "Amylase"],
            correct: 2,
            topic: "Physiology",
            difficulty: "easy",
            theory: "Both insulin and glucagon regulate glucose.",
            explanation: "Glucose regulators."
        },
        {
            id: 64,
            question: "The type of reproduction in fern sporophyte generation is:",
            options: ["Sexual", "Asexual", "Binary fission", "Budding"],
            correct: 0,
            topic: "Botany",
            difficulty: "hard",
            theory: "Fern sporophyte undergoes sexual reproduction.",
            explanation: "Fern sexual reproduction."
        },
        {
            id: 65,
            question: "The theory explaining origin of life from non-living matter:",
            options: ["Special creation", "Biogenesis", "Abiogenesis", "Evolution"],
            correct: 2,
            topic: "Biology Origin",
            difficulty: "hard",
            theory: "Abiogenesis: life from non-living matter.",
            explanation: "Abiogenesis theory."
        },
        {
            id: 66,
            question: "The type of symbiosis where both organisms benefit:",
            options: ["Mutualism", "Parasitism", "Commensalism", "Predation"],
            correct: 0,
            topic: "Ecology",
            difficulty: "easy",
            theory: "Mutualism: both benefit (+/+).",
            explanation: "Mutualism symbiosis."
        },
        {
            id: 67,
            question: "The vessel carrying deoxygenated blood from body is:",
            options: ["Pulmonary artery", "Aorta", "Superior vena cava", "Pulmonary vein"],
            correct: 2,
            topic: "Physiology",
            difficulty: "medium",
            theory: "Superior vena cava collects deoxygenated blood.",
            explanation: "Vena cava."
        },
        {
            id: 68,
            question: "The percentage of genetic similarity between humans is:",
            options: ["90%", "95%", "99%", "100%"],
            correct: 2,
            topic: "Genetics",
            difficulty: "medium",
            theory: "Humans share ~99% genetic similarity.",
            explanation: "99% similarity."
        },
        {
            id: 69,
            question: "The most abundant element in living organisms is:",
            options: ["Nitrogen", "Oxygen", "Carbon", "Hydrogen"],
            correct: 2,
            topic: "Chemistry",
            difficulty: "medium",
            theory: "Carbon basis of all organic molecules.",
            explanation: "Carbon abundant."
        },
        {
            id: 70,
            question: "The process of adaptation to environment over time:",
            options: ["Mutation", "Evolution", "Speciation", "Adaptation"],
            correct: 1,
            topic: "Evolution",
            difficulty: "easy",
            theory: "Evolution: change and adaptation.",
            explanation: "Evolution process."
        }
    ],
    test8: [
        {
            id: 71,
            question: "The compound providing energy in cells is:",
            options: ["GTP", "ATP", "CTP", "UTP"],
            correct: 1,
            topic: "Bioenergetics",
            difficulty: "easy",
            theory: "ATP primary energy currency.",
            explanation: "ATP energy."
        },
        {
            id: 72,
            question: "The stage where spindle fibers attach is:",
            options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
            correct: 1,
            topic: "Cell Division",
            difficulty: "medium",
            theory: "Metaphase: chromosomes align at spindle.",
            explanation: "Metaphase alignment."
        },
        {
            id: 73,
            question: "The phenomenon of heterozygote showing intermediate phenotype:",
            options: ["Dominance", "Incomplete", "Codominance", "Epistasis"],
            correct: 1,
            topic: "Genetics",
            difficulty: "medium",
            theory: "Incomplete dominance: intermediate phenotype.",
            explanation: "Incomplete dominance."
        },
        {
            id: 74,
            question: "The membrane structure has protein percentage:",
            options: ["25%", "50%", "75%", "100%"],
            correct: 2,
            topic: "Cell Biology",
            difficulty: "hard",
            theory: "Cell membrane: ~50% protein, ~50% lipid.",
            explanation: "Membrane composition."
        },
        {
            id: 75,
            question: "The process of water uptake by root is:",
            options: ["Osmosis", "Diffusion", "Active transport", "Endocytosis"],
            correct: 0,
            topic: "Plant Physiology",
            difficulty: "medium",
            theory: "Roots absorb water by osmosis.",
            explanation: "Root osmosis."
        },
        {
            id: 76,
            question: "The hormone responsible for menstrual cycle is:",
            options: ["Insulin", "Estrogen", "FSH", "Prolactin"],
            correct: 2,
            topic: "Physiology",
            difficulty: "hard",
            theory: "FSH (Follicle Stimulating Hormone) controls cycle.",
            explanation: "FSH hormone."
        },
        {
            id: 77,
            question: "The waste products of anaerobic respiration in muscle:",
            options: ["CO₂ and H₂O", "Lactate", "Ethanol", "Acetyl-CoA"],
            correct: 1,
            topic: "Respiration",
            difficulty: "medium",
            theory: "Anaerobic: glucose → lactate.",
            explanation: "Lactate production."
        },
        {
            id: 78,
            question: "The chromosome number in gametes is:",
            options: ["Haploid", "Diploid", "Triploid", "Tetraphoid"],
            correct: 0,
            topic: "Genetics",
            difficulty: "easy",
            theory: "Gametes are haploid (n).",
            explanation: "Haploid gametes."
        },
        {
            id: 79,
            question: "The process of fossil fuel formation is:",
            options: ["Photosynthesis", "Decay over time", "Fossilization", "Metamorphosis"],
            correct: 1,
            topic: "Evolution",
            difficulty: "medium",
            theory: "Fossil fuels from ancient organism decay.",
            explanation: "Fossil fuel formation."
        },
        {
            id: 80,
            question: "The pH of human blood is approximately:",
            options: ["6.8", "7.0", "7.4", "7.8"],
            correct: 2,
            topic: "Physiology",
            difficulty: "easy",
            theory: "Blood pH ≈ 7.4 (slightly alkaline).",
            explanation: "Blood pH 7.4."
        }
    ],
    test9: [
        {
            id: 81,
            question: "The pathway of electron transport chain yields:",
            options: ["2 ATP", "30-32 ATP", "36-38 ATP", "40 ATP"],
            correct: 2,
            topic: "Respiration",
            difficulty: "hard",
            theory: "ETC produces ~30-32 ATP (or 36-38 with optimized efficiency).",
            explanation: "ETC ATP yield."
        },
        {
            id: 82,
            question: "The receptor for light in eye is:",
            options: ["Rods", "Cones", "Both", "Cornea"],
            correct: 2,
            topic: "Sensory Organs",
            difficulty: "medium",
            theory: "Both rods and cones detect light.",
            explanation: "Light receptors."
        },
        {
            id: 83,
            question: "The phenomenon of retardation of gametes maturation is:",
            options: ["Menopause", "Dormancy", "Diapause", "Arrest"],
            correct: 1,
            topic: "Reproduction",
            difficulty: "hard",
            theory: "Dormancy or arrest of gamete development.",
            explanation: "Gamete arrest."
        },
        {
            id: 84,
            question: "The biological pigment in leaf is:",
            options: ["Carotenoid", "Chlorophyll", "Anthocyanin", "All"],
            correct: 3,
            topic: "Plant Anatomy",
            difficulty: "easy",
            theory: "Leaves contain multiple pigments.",
            explanation: "Leaf pigments."
        },
        {
            id: 85,
            question: "The ion necessary for muscle contraction is:",
            options: ["Sodium", "Potassium", "Calcium", "Magnesium"],
            correct: 2,
            topic: "Physiology",
            difficulty: "medium",
            theory: "Ca²⁺ triggers muscle contraction.",
            explanation: "Calcium muscle."
        },
        {
            id: 86,
            question: "The type of muscle under voluntary control:",
            options: ["Smooth", "Cardiac", "Skeletal", "Visceral"],
            correct: 2,
            topic: "Anatomy",
            difficulty: "easy",
            theory: "Skeletal muscle voluntary (striated).",
            explanation: "Skeletal voluntary."
        },
        {
            id: 87,
            question: "The substance that increases surface tension of water is:",
            options: ["Soap", "Oil", "Surfactant", "None"],
            correct: 3,
            topic: "Chemistry",
            difficulty: "hard",
            theory: "Soap/oil decreases surface tension.",
            explanation: "Surface tension."
        },
        {
            id: 88,
            question: "The branched glucose polymer in plants is:",
            options: ["Starch", "Glycogen", "Amylopectin", "Cellulose"],
            correct: 2,
            topic: "Biochemistry",
            difficulty: "medium",
            theory: "Amylopectin: branched starch component.",
            explanation: "Amylopectin."
        },
        {
            id: 89,
            question: "The immune antibody most abundant in blood is:",
            options: ["IgA", "IgG", "IgM", "IgE"],
            correct: 1,
            topic: "Immunity",
            difficulty: "medium",
            theory: "IgG most abundant immunoglobulin.",
            explanation: "IgG antibody."
        },
        {
            id: 90,
            question: "The process of fruit ripening involves:",
            options: ["Gibberellin", "Ethylene", "Auxin", "Cytokinin"],
            correct: 1,
            topic: "Plant Physiology",
            difficulty: "medium",
            theory: "Ethylene promotes fruit ripening.",
            explanation: "Ethylene ripening."
        }
    ],
    test10: [
        {
            id: 91,
            question: "The process where embryo remains dormant:",
            options: ["Hibernation", "Estivation", "Quiescence", "Diapause"],
            correct: 3,
            topic: "Ecology",
            difficulty: "hard",
            theory: "Diapause: programmed developmental arrest.",
            explanation: "Diapause."
        },
        {
            id: 92,
            question: "The limiting factor in photosynthesis can be:",
            options: ["Light", "CO₂", "Temperature", "All"],
            correct: 3,
            topic: "Photosynthesis",
            difficulty: "hard",
            theory: "Any factor can be limiting.",
            explanation: "Limiting factors."
        },
        {
            id: 93,
            question: "The fossil showing intermediate characteristics is:",
            options: ["Lucy", "Archaeopteryx", "Homo erectus", "Neanderthal"],
            correct: 1,
            topic: "Evolution",
            difficulty: "medium",
            theory: "Archaeopteryx: dinosaur-bird intermediate.",
            explanation: "Archaeopteryx."
        },
        {
            id: 94,
            question: "The genetic code is almost universal except in:",
            options: ["Bacteria", "Viruses", "Mitochondria", "Ribosomes"],
            correct: 2,
            topic: "Molecular Biology",
            difficulty: "hard",
            theory: "Mitochondrial genetic code differs slightly.",
            explanation: "Mitochondrial code."
        },
        {
            id: 95,
            question: "The process of vegetative propagation in strawberry is:",
            options: ["Seed", "Runner", "Tuber", "Fragmentation"],
            correct: 1,
            topic: "Botany",
            difficulty: "easy",
            theory: "Strawberry reproduces via runners.",
            explanation: "Strawberry runner."
        },
        {
            id: 96,
            question: "The condition where species occupies similar niche:",
            options: ["Predation", "Parasitism", "Competition", "Mutualism"],
            correct: 2,
            topic: "Ecology",
            difficulty: "medium",
            theory: "Competition: same niche species.",
            explanation: "Competition niche."
        },
        {
            id: 97,
            question: "The waste nitrogenous compound in birds is:",
            options: ["Urea", "Ammonia", "Uric acid", "Creatinine"],
            correct: 2,
            topic: "Physiology",
            difficulty: "medium",
            theory: "Birds excrete uric acid.",
            explanation: "Uric acid."
        },
        {
            id: 98,
            question: "The compound providing coenzyme NAD⁺ is:",
            options: ["Vitamin A", "Vitamin B3", "Vitamin C", "Vitamin E"],
            correct: 1,
            topic: "Nutrition",
            difficulty: "hard",
            theory: "Niacin (B3) forms NAD⁺.",
            explanation: "Niacin NAD."
        },
        {
            id: 99,
            question: "The phenomenon where traits skip generation is:",
            options: ["Segregation", "Linkage", "Recessive expression", "Mutation"],
            correct: 2,
            topic: "Genetics",
            difficulty: "medium",
            theory: "Recessive traits skip when heterozygous.",
            explanation: "Recessive skipping."
        },
        {
            id: 100,
            question: "The age of Earth is approximately:",
            options: ["1 billion years", "2 billion years", "4.5 billion years", "10 billion years"],
            correct: 2,
            topic: "Geology",
            difficulty: "easy",
            theory: "Earth formed ~4.5 billion years ago.",
            explanation: "Earth 4.5 billion years."
        }
    ]
};

module.exports = { neetBiologyQuestions };
