const jeeMatematicsQuestions = {
    test1: [
        {
            id: 1,
            question: "The derivative of sin(x²) is:",
            options: ["2x cos(x²)", "cos(x²)", "2x sin(x²)", "x cos(x²)"],
            correct: 0,
            topic: "Calculus",
            difficulty: "easy",
            theory: "Using the chain rule: d/dx[sin(x²)] = cos(x²) × d/dx[x²] = cos(x²) × 2x = 2x cos(x²).",
            explanation: "Apply chain rule: d/dx[sin(x²)] = cos(x²) × 2x = 2x cos(x²)."
        },
        {
            id: 2,
            question: "If A and B are mutually exclusive events, then P(A∩B) is:",
            options: ["0", "1", "P(A)", "P(B)"],
            correct: 0,
            topic: "Probability",
            difficulty: "medium",
            theory: "Mutually exclusive events cannot occur simultaneously. P(A∩B) = 0.",
            explanation: "Mutually exclusive events cannot happen at the same time, so P(A∩B) = 0."
        },
        {
            id: 3,
            question: "The area of the region bounded by y = x² and y = x is:",
            options: ["1/6", "1/3", "1/2", "1"],
            correct: 0,
            topic: "Integration",
            difficulty: "hard",
            theory: "Area = ∫₀¹(x - x²)dx = [x²/2 - x³/3]₀¹ = 1/6.",
            explanation: "Intersection at x=0, x=1. Area = ∫₀¹(x - x²)dx = 1/6."
        },
        {
            id: 4,
            question: "If |z₁| = |z₂|, then z₁ and z₂ lie on:",
            options: ["A circle", "A line", "An ellipse", "A parabola"],
            correct: 0,
            topic: "Complex Numbers",
            difficulty: "medium",
            theory: "Equal moduli means equal distance from origin. This forms a circle.",
            explanation: "Points with equal moduli form a circle centered at origin."
        },
        {
            id: 5,
            question: "The value of ∫₀^π sin x dx is:",
            options: ["0", "1", "2", "π"],
            correct: 2,
            topic: "Integration",
            difficulty: "easy",
            theory: "∫sin x dx = -cos x. ∫₀^π sin x dx = [-cos x]₀^π = 2.",
            explanation: "∫₀^π sin x dx = [-cos x]₀^π = 2."
        },
        {
            id: 6,
            question: "The limit of (sin x)/x as x→0 is:",
            options: ["0", "1", "∞", "undefined"],
            correct: 1,
            topic: "Limits",
            difficulty: "medium",
            theory: "This is a fundamental limit: lim(x→0) (sin x)/x = 1. Proved using L'Hôpital's rule or Taylor series.",
            explanation: "lim(x→0) (sin x)/x = 1 is a standard limit."
        },
        {
            id: 7,
            question: "The sum of first n natural numbers is:",
            options: ["n(n+1)/2", "n²", "n(n-1)/2", "2n"],
            correct: 0,
            topic: "Series and Sequences",
            difficulty: "easy",
            theory: "1 + 2 + 3 + ... + n = n(n+1)/2. This is the formula for sum of arithmetic sequence.",
            explanation: "Sum of 1 to n = n(n+1)/2."
        },
        {
            id: 8,
            question: "The intersection of two lines with slopes m₁ and m₂ (m₁ ≠ m₂) is:",
            options: ["No point", "One point", "Two points", "Infinite points"],
            correct: 1,
            topic: "Coordinate Geometry",
            difficulty: "easy",
            theory: "Two non-parallel lines (different slopes) intersect at exactly one point.",
            explanation: "Non-parallel lines intersect at exactly one point."
        },
        {
            id: 9,
            question: "Which is a solution to tan(x) = 1?",
            options: ["π/2", "π/4", "π/3", "π/6"],
            correct: 1,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "tan(π/4) = 1. Also tan(π/4 + nπ) = 1 for any integer n.",
            explanation: "tan(π/4) = 1."
        },
        {
            id: 10,
            question: "The derivative of e^x is:",
            options: ["x·e^(x-1)", "e^x", "e^(x+1)", "1/x"],
            correct: 1,
            topic: "Calculus",
            difficulty: "easy",
            theory: "d/dx(e^x) = e^x. This is unique among exponential functions.",
            explanation: "d/dx(e^x) = e^x."
        }
    ],
    test2: [
        {
            id: 11,
            question: "The modulus of (3 + 4i) is:",
            options: ["3", "4", "5", "7"],
            correct: 2,
            topic: "Complex Numbers",
            difficulty: "easy",
            theory: "For complex number a + bi, modulus = √(a² + b²) = √(9 + 16) = √25 = 5.",
            explanation: "|3 + 4i| = √(3² + 4²) = 5."
        },
        {
            id: 12,
            question: "The equation x² - 5x + 6 = 0 has roots:",
            options: ["1, 2", "2, 3", "1, 6", "1, 5"],
            correct: 1,
            topic: "Algebra",
            difficulty: "easy",
            theory: "Factoring: (x - 2)(x - 3) = 0. Roots are x = 2 and x = 3.",
            explanation: "x² - 5x + 6 = (x-2)(x-3) = 0. Roots: 2, 3."
        },
        {
            id: 13,
            question: "The value of sin(90°) is:",
            options: ["0", "1/2", "1", "√3/2"],
            correct: 2,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "sin(90°) = sin(π/2) = 1.",
            explanation: "sin(90°) = 1."
        },
        {
            id: 14,
            question: "The inverse of matrix [[1,2],[3,4]] exists if:",
            options: ["Determinant = 0", "Determinant ≠ 0", "Matrix is singular", "Always exists"],
            correct: 1,
            topic: "Matrices",
            difficulty: "medium",
            theory: "A matrix has an inverse if and only if its determinant is non-zero (det ≠ 0).",
            explanation: "Inverse exists iff determinant ≠ 0."
        },
        {
            id: 15,
            question: "The nth term of sequence 2, 4, 6, 8, ... is:",
            options: ["n", "2n", "n+1", "n²"],
            correct: 1,
            topic: "Sequences",
            difficulty: "easy",
            theory: "This is an arithmetic sequence with first term a=2 and common difference d=2. nth term = a + (n-1)d = 2 + 2(n-1) = 2n.",
            explanation: "nth term with a=2, d=2 is aₙ = 2n."
        },
        {
            id: 16,
            question: "The sum of infinite geometric series with |r| < 1 is:",
            options: ["a/(1-r)", "a/(1+r)", "ar/(1-r)", "Cannot converge"],
            correct: 0,
            topic: "Series",
            difficulty: "medium",
            theory: "For geometric series with first term a and ratio r (|r| < 1): S = a/(1-r).",
            explanation: "Infinite geometric series: S = a/(1-r) when |r| < 1."
        },
        {
            id: 17,
            question: "The range of function f(x) = x² is:",
            options: ["All real numbers", "[0, ∞)", "(-∞, 0]", "[1, ∞)"],
            correct: 1,
            topic: "Functions",
            difficulty: "medium",
            theory: "Since x² ≥ 0 for all real x, and we can achieve any value in [0, ∞), the range is [0, ∞).",
            explanation: "f(x) = x² has range [0, ∞)."
        },
        {
            id: 18,
            question: "The second derivative test helps identify:",
            options: ["Domain", "Range", "Local extrema", "Asymptotes"],
            correct: 2,
            topic: "Calculus",
            difficulty: "medium",
            theory: "If f''(c) > 0, x = c is a local minimum. If f''(c) < 0, x = c is a local maximum.",
            explanation: "Second derivative test identifies local maxima/minima."
        },
        {
            id: 19,
            question: "The angle between lines y = 2x and y = 3x is:",
            options: ["0°", "45°", "tan⁻¹(1/5)", "90°"],
            correct: 2,
            topic: "Coordinate Geometry",
            difficulty: "hard",
            theory: "Angle between lines with slopes m₁ and m₂: tan(θ) = |(m₁ - m₂)/(1 + m₁m₂)| = |(2 - 3)/(1 + 6)| = 1/7.",
            explanation: "tan(θ) = |m₁ - m₂|/(1 + m₁m₂) = 1/7. θ = tan⁻¹(1/7)."
        },
        {
            id: 20,
            question: "The determinant of [[1,0],[0,1]] is:",
            options: ["0", "1", "2", "-1"],
            correct: 1,
            topic: "Matrices",
            difficulty: "easy",
            theory: "Determinant of identity matrix = 1. For 2×2 matrix [[a,b],[c,d]], det = ad - bc = 1(1) - 0(0) = 1.",
            explanation: "Determinant of identity matrix = 1."
        }
    ],
    test3: [
        {
            id: 21,
            question: "The number of permutations of n objects taken r at a time is:",
            options: ["n!/(n-r)!", "n!/r!", "n!/[(n-r)!r!]", "n·r"],
            correct: 0,
            topic: "Combinatorics",
            difficulty: "medium",
            theory: "Permutations P(n,r) = n!/(n-r)!. Order matters in permutations.",
            explanation: "nPr = n!/(n-r)!"
        },
        {
            id: 22,
            question: "The combination C(n,r) is equal to:",
            options: ["n!/(n-r)!", "n!/(r!(n-r)!)", "n!/r!", "P(n,r)/r!"],
            correct: 1,
            topic: "Combinatorics",
            difficulty: "medium",
            theory: "Combinations C(n,r) = n!/(r!(n-r)!). Order doesn't matter.",
            explanation: "nCr = n!/[r!(n-r)!]"
        },
        {
            id: 23,
            question: "The equation of a line with slope m and y-intercept c is:",
            options: ["y = mx + c", "y = m + cx", "x = my + c", "y² = mx + c"],
            correct: 0,
            topic: "Coordinate Geometry",
            difficulty: "easy",
            theory: "Slope-intercept form of a line is y = mx + c where m is slope and c is y-intercept.",
            explanation: "Slope-intercept form: y = mx + c."
        },
        {
            id: 24,
            question: "The general solution of sin(x) = 1/2 is:",
            options: ["x = π/6", "x = π/6 + 2πn", "x = π/6 + 2πn or x = 5π/6 + 2πn", "x = π/3"],
            correct: 2,
            topic: "Trigonometry",
            difficulty: "hard",
            theory: "sin(x) = 1/2 at x = π/6 and x = 5π/6 in [0, 2π]. General solution is x = π/6 + 2πn or x = 5π/6 + 2πn.",
            explanation: "General solution: x = π/6 + 2πn or 5π/6 + 2πn."
        },
        {
            id: 25,
            question: "The equation of a circle with center (h,k) and radius r is:",
            options: ["x² + y² = r²", "(x-h)² + (y-k)² = r²", "x + y = r", "(x-h) + (y-k) = r"],
            correct: 1,
            topic: "Coordinate Geometry",
            difficulty: "easy",
            theory: "(x-h)² + (y-k)² = r² is the standard form of circle equation.",
            explanation: "Circle equation: (x-h)² + (y-k)² = r²."
        },
        {
            id: 26,
            question: "The integral of 1/x is:",
            options: ["-1/x²", "ln|x| + C", "-ln|x| + C", "x + C"],
            correct: 1,
            topic: "Calculus",
            difficulty: "easy",
            theory: "∫(1/x)dx = ln|x| + C, where C is the constant of integration.",
            explanation: "∫(1/x)dx = ln|x| + C."
        },
        {
            id: 27,
            question: "The equation x² + y² + 2x - 4y + 1 = 0 represents:",
            options: ["Circle", "Ellipse", "Parabola", "Hyperbola"],
            correct: 0,
            topic: "Coordinate Geometry",
            difficulty: "medium",
            theory: "Rewriting: (x+1)² + (y-2)² = 4. This is a circle with center (-1, 2) and radius 2.",
            explanation: "Can be rewritten as (x+1)² + (y-2)² = 4, a circle."
        },
        {
            id: 28,
            question: "The coefficient of x² in (1+x)⁵ is:",
            options: ["5", "10", "15", "20"],
            correct: 1,
            topic: "Binomial Theorem",
            difficulty: "medium",
            theory: "Using binomial expansion, coefficient of x² = C(5,2) = 5!/(2!3!) = 10.",
            explanation: "Coefficient of x² = C(5,2) = 10."
        },
        {
            id: 29,
            question: "The scalar product of vectors a = [1,2,3] and b = [4,5,6] is:",
            options: ["15", "22", "32", "45"],
            correct: 2,
            topic: "Vectors",
            difficulty: "medium",
            theory: "Dot product = 1(4) + 2(5) + 3(6) = 4 + 10 + 18 = 32.",
            explanation: "a·b = 1(4) + 2(5) + 3(6) = 32."
        },
        {
            id: 30,
            question: "The value of log₁₀(100) is:",
            options: ["1", "2", "10", "100"],
            correct: 1,
            topic: "Logarithms",
            difficulty: "easy",
            theory: "log₁₀(100) = log₁₀(10²) = 2.",
            explanation: "log₁₀(100) = log₁₀(10²) = 2."
        }
    ],
    test4: [
        {
            id: 31,
            question: "The mean of 2, 4, 6, 8, 10 is:",
            options: ["4", "5", "6", "7"],
            correct: 2,
            topic: "Statistics",
            difficulty: "easy",
            theory: "Mean = (2+4+6+8+10)/5 = 30/5 = 6.",
            explanation: "Mean = 30/5 = 6."
        },
        {
            id: 32,
            question: "The median of 1, 3, 5, 7, 9 is:",
            options: ["3", "5", "6", "7"],
            correct: 1,
            topic: "Statistics",
            difficulty: "easy",
            theory: "Median is the middle value when numbers are arranged in order. Middle value = 5.",
            explanation: "Median is the middle value = 5."
        },
        {
            id: 33,
            question: "The mode of 1, 1, 2, 2, 2, 3, 4 is:",
            options: ["1", "2", "3", "No mode"],
            correct: 1,
            topic: "Statistics",
            difficulty: "easy",
            theory: "Mode is the most frequently occurring value. 2 appears 3 times, which is most frequent.",
            explanation: "Mode is most frequent value = 2."
        },
        {
            id: 34,
            question: "The gradient of the line joining (1,2) and (3,6) is:",
            options: ["1", "2", "3", "4"],
            correct: 1,
            topic: "Coordinate Geometry",
            difficulty: "easy",
            theory: "Slope = (6-2)/(3-1) = 4/2 = 2.",
            explanation: "Slope = (y₂-y₁)/(x₂-x₁) = 4/2 = 2."
        },
        {
            id: 35,
            question: "The value of C(6,3) is:",
            options: ["18", "20", "24", "30"],
            correct: 1,
            topic: "Combinatorics",
            difficulty: "medium",
            theory: "C(6,3) = 6!/(3!3!) = (6×5×4)/(3×2×1) = 120/6 = 20.",
            explanation: "C(6,3) = 6!/(3!3!) = 20."
        },
        {
            id: 36,
            question: "The sum ∑ᵢ₌₁⁵ i² is:",
            options: ["20", "25", "30", "55"],
            correct: 3,
            topic: "Series",
            difficulty: "medium",
            theory: "1² + 2² + 3² + 4² + 5² = 1 + 4 + 9 + 16 + 25 = 55.",
            explanation: "Sum of squares = 55."
        },
        {
            id: 37,
            question: "If cos(x) = 1/2, then x equals:",
            options: ["π/6", "π/4", "π/3", "π/2"],
            correct: 2,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "cos(π/3) = 1/2.",
            explanation: "cos(π/3) = 1/2."
        },
        {
            id: 38,
            question: "The value of e (Euler's number) is approximately:",
            options: ["2.17", "2.71", "3.14", "1.41"],
            correct: 1,
            topic: "Mathematics",
            difficulty: "easy",
            theory: "e ≈ 2.71828. It's the base of natural logarithm.",
            explanation: "e ≈ 2.71828."
        },
        {
            id: 39,
            question: "The roots of ax² + bx + c = 0 are real if:",
            options: ["b² - 4ac > 0", "b² - 4ac = 0", "b² - 4ac < 0", "Always real"],
            correct: 0,
            topic: "Algebra",
            difficulty: "medium",
            theory: "Real roots if discriminant Δ = b² - 4ac > 0. If Δ < 0, roots are complex.",
            explanation: "Real roots when b² - 4ac > 0 (positive discriminant)."
        },
        {
            id: 40,
            question: "The value of P(5,2) is:",
            options: ["10", "15", "20", "30"],
            correct: 2,
            topic: "Combinatorics",
            difficulty: "medium",
            theory: "P(5,2) = 5!/(5-2)! = 5!/3! = 5×4 = 20.",
            explanation: "P(5,2) = 5×4 = 20."
        }
    ],
    test5: [
        {
            id: 41,
            question: "The eccentricity of a circle is:",
            options: ["0", "1", "between 0 and 1", "> 1"],
            correct: 0,
            topic: "Conic Sections",
            difficulty: "medium",
            theory: "Eccentricity (e) = 0 for a circle. For ellipse: 0 < e < 1, parabola: e = 1, hyperbola: e > 1.",
            explanation: "Circle has eccentricity = 0."
        },
        {
            id: 42,
            question: "The asymptotes of hyperbola x²/a² - y²/b² = 1 are:",
            options: ["y = ±(a/b)x", "y = ±(b/a)x", "x = ±a", "y = ±b"],
            correct: 1,
            topic: "Conic Sections",
            difficulty: "hard",
            theory: "For hyperbola x²/a² - y²/b² = 1, asymptotes are y = ±(b/a)x.",
            explanation: "Asymptotes: y = ±(b/a)x."
        },
        {
            id: 43,
            question: "The expectation E[X] of a discrete random variable is:",
            options: ["Mode", "Mean", "Variance", "Standard deviation"],
            correct: 1,
            topic: "Probability",
            difficulty: "medium",
            theory: "Expected value E[X] = ∑ x·P(x) is the mean of the distribution.",
            explanation: "E[X] is the mean of the distribution."
        },
        {
            id: 44,
            question: "The variance formula is:",
            options: ["E[X] - median", "E[X²] - (E[X])²", "√(E[X])", "E[X] + E[Y]"],
            correct: 1,
            topic: "Probability",
            difficulty: "hard",
            theory: "Variance Var(X) = E[X²] - (E[X])².",
            explanation: "Var(X) = E[X²] - (E[X])²."
        },
        {
            id: 45,
            question: "The cross product of vectors gives:",
            options: ["Scalar", "Vector perpendicular to both", "Parallel vector", "Zero always"],
            correct: 1,
            topic: "Vectors",
            difficulty: "medium",
            theory: "Cross product a × b gives a vector perpendicular to both a and b.",
            explanation: "Cross product: vector perpendicular to both."
        },
        {
            id: 46,
            question: "The angle between two perpendicular vectors is:",
            options: ["0°", "45°", "90°", "180°"],
            correct: 2,
            topic: "Vectors",
            difficulty: "easy",
            theory: "Perpendicular vectors have a 90° angle between them.",
            explanation: "Perpendicular vectors: 90° angle."
        },
        {
            id: 47,
            question: "The partial derivative ∂f/∂x of f(x,y) = x²y is:",
            options: ["2xy", "x²", "2x", "y"],
            correct: 0,
            topic: "Calculus",
            difficulty: "medium",
            theory: "∂f/∂x = 2xy (treating y as constant).",
            explanation: "∂(x²y)/∂x = 2xy."
        },
        {
            id: 48,
            question: "The Cauchy-Schwarz inequality states:",
            options: ["a² + b² = c²", "|a·b| ≤ |a||b|", "a + b ≥ 2√(ab)", "All above"],
            correct: 1,
            topic: "Algebra",
            difficulty: "hard",
            theory: "Cauchy-Schwarz: |a·b| ≤ |a||b| for vectors a and b.",
            explanation: "|a·b| ≤ |a||b| is Cauchy-Schwarz inequality."
        },
        {
            id: 49,
            question: "The area under a curve y = f(x) from a to b is:",
            options: ["f(b) - f(a)", "∫ₐᵇ f(x)dx", "f((a+b)/2)", "Maximum of f(x)"],
            correct: 1,
            topic: "Calculus",
            difficulty: "easy",
            theory: "Area = ∫ₐᵇ f(x)dx by definition of definite integral.",
            explanation: "Area = ∫ₐᵇ f(x)dx."
        },
        {
            id: 50,
            question: "The vertex of parabola y = ax² + bx + c is at x =:",
            options: ["-b/2a", "-b/a", "b/2a", "2a/b"],
            correct: 0,
            topic: "Coordinate Geometry",
            difficulty: "medium",
            theory: "The vertex is at x = -b/(2a).",
            explanation: "Vertex x-coordinate = -b/(2a)."
        }
    ],
    test6: [
        {
            id: 51,
            question: "The limit of (x² - 1)/(x - 1) as x → 1 is:",
            options: ["0", "1", "2", "Undefined"],
            correct: 2,
            topic: "Calculus",
            difficulty: "medium",
            theory: "Factoring: (x²-1)/(x-1) = (x+1)(x-1)/(x-1) = x+1. As x→1, limit = 2.",
            explanation: "Simplify to (x+1), limit as x→1 is 2."
        },
        {
            id: 52,
            question: "The antiderivative of x² is:",
            options: ["2x", "x³", "x³/3", "x³/3 + C"],
            correct: 3,
            topic: "Calculus",
            difficulty: "easy",
            theory: "∫x² dx = x³/3 + C.",
            explanation: "∫x² dx = x³/3 + C."
        },
        {
            id: 53,
            question: "The rank of a matrix is:",
            options: ["Number of rows", "Number of columns", "Maximum number of linearly independent rows/columns", "Determinant"],
            correct: 2,
            topic: "Linear Algebra",
            difficulty: "hard",
            theory: "Rank is the dimension of the vector space spanned by its rows or columns.",
            explanation: "Rank = max number of linearly independent rows/columns."
        },
        {
            id: 54,
            question: "The covariance between independent variables is:",
            options: ["Positive", "Negative", "Zero", "One"],
            correct: 2,
            topic: "Probability",
            difficulty: "medium",
            theory: "If X and Y are independent, Cov(X,Y) = 0.",
            explanation: "Independent variables have covariance = 0."
        },
        {
            id: 55,
            question: "The sum of angles in a triangle is:",
            options: ["90°", "180°", "270°", "360°"],
            correct: 1,
            topic: "Geometry",
            difficulty: "easy",
            theory: "The sum of interior angles of any triangle = 180°.",
            explanation: "Triangle sum = 180°."
        },
        {
            id: 56,
            question: "The value of arcsin(1) is:",
            options: ["0", "π/4", "π/2", "π"],
            correct: 2,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "arcsin(1) = π/2 because sin(π/2) = 1.",
            explanation: "sin(π/2) = 1, so arcsin(1) = π/2."
        },
        {
            id: 57,
            question: "The distance from point (x₀, y₀) to line ax + by + c = 0 is:",
            options: ["ax₀ + by₀ + c", "|ax₀ + by₀ + c|", "|ax₀ + by₀ + c|/√(a² + b²)", "√(x₀² + y₀²)"],
            correct: 2,
            topic: "Coordinate Geometry",
            difficulty: "medium",
            theory: "Distance = |ax₀ + by₀ + c|/√(a² + b²).",
            explanation: "Point-to-line distance formula."
        },
        {
            id: 58,
            question: "The value of tan(45°) is:",
            options: ["0", "1/√3", "1", "√3"],
            correct: 2,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "tan(45°) = 1.",
            explanation: "tan(45°) = 1."
        },
        {
            id: 59,
            question: "The standard normal distribution has mean and variance:",
            options: ["-1, 1", "0, 0", "0, 1", "1, 1"],
            correct: 2,
            topic: "Statistics",
            difficulty: "easy",
            theory: "Standard normal distribution has mean μ = 0 and variance σ² = 1.",
            explanation: "Standard normal: N(0, 1)."
        },
        {
            id: 60,
            question: "The trace of a square matrix is:",
            options: ["Determinant", "Sum of diagonal elements", "Sum of all elements", "Product of diagonal elements"],
            correct: 1,
            topic: "Linear Algebra",
            difficulty: "medium",
            theory: "Trace of a matrix = sum of all diagonal elements.",
            explanation: "Trace = sum of diagonal elements."
        }
    ],
    test7: [
        {
            id: 61,
            question: "The cofactor of element a₁₁ in a matrix is:",
            options: ["(-1)¹⁺¹M₁₁", "(-1)⁰M₁₁", "M₁₁", "(-1)²M₁₁"],
            correct: 0,
            topic: "Matrices",
            difficulty: "hard",
            theory: "Cofactor C₁₁ = (-1)¹⁺¹M₁₁ = M₁₁ where M₁₁ is the minor.",
            explanation: "Cofactor C_ij = (-1)^(i+j) M_ij."
        },
        {
            id: 62,
            question: "The function f(x) = |x| is:",
            options: ["Continuous everywhere", "Differentiable everywhere", "Neither", "Differentiable except at x=0"],
            correct: 3,
            topic: "Functions",
            difficulty: "medium",
            theory: "f(x) = |x| is continuous everywhere but not differentiable at x = 0 (sharp corner).",
            explanation: "|x| not differentiable at x = 0."
        },
        {
            id: 63,
            question: "The Rolle's theorem requires:",
            options: ["f continuous on [a,b]", "f differentiable on (a,b)", "f(a) = f(b)", "All of above"],
            correct: 3,
            topic: "Calculus",
            difficulty: "hard",
            theory: "Rolle's theorem requires all three conditions for some c in (a,b): f'(c) = 0.",
            explanation: "Rolle's theorem: continuous + differentiable + f(a)=f(b)."
        },
        {
            id: 64,
            question: "The center of the circle x² + y² - 4x - 6y + 9 = 0 is:",
            options: ["(2, 3)", "(4, 6)", "(-2, -3)", "(0, 0)"],
            correct: 0,
            topic: "Coordinate Geometry",
            difficulty: "medium",
            theory: "Rewriting: (x-2)² + (y-3)² = 4. Center = (2, 3).",
            explanation: "Complete the square: (x-2)² + (y-3)² = 4."
        },
        {
            id: 65,
            question: "The angle of intersection of two curves is defined by:",
            options: ["Difference of slopes", "tan⁻¹|(m₁-m₂)/(1+m₁m₂)|", "m₁ × m₂", "m₁ + m₂"],
            correct: 1,
            topic: "Coordinate Geometry",
            difficulty: "hard",
            theory: "Angle between curves θ = tan⁻¹|(m₁-m₂)/(1+m₁m₂)|.",
            explanation: "Intersection angle formula."
        },
        {
            id: 66,
            question: "The solution to 2^x = 8 is:",
            options: ["1", "2", "3", "4"],
            correct: 2,
            topic: "Exponential Equations",
            difficulty: "easy",
            theory: "2³ = 8, so x = 3.",
            explanation: "2³ = 8, so x = 3."
        },
        {
            id: 67,
            question: "The value of log₂(16) is:",
            options: ["2", "4", "8", "16"],
            correct: 1,
            topic: "Logarithms",
            difficulty: "easy",
            theory: "2⁴ = 16, so log₂(16) = 4.",
            explanation: "log₂(16) = log₂(2⁴) = 4."
        },
        {
            id: 68,
            question: "The principal value of arctan(√3) is:",
            options: ["π/6", "π/4", "π/3", "π/2"],
            correct: 2,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "tan(π/3) = √3, so arctan(√3) = π/3.",
            explanation: "arctan(√3) = π/3."
        },
        {
            id: 69,
            question: "The direction cosines of vector [1, 1, 1] are:",
            options: ["(1, 1, 1)", "(1/√3, 1/√3, 1/√3)", "(1/3, 1/3, 1/3)", "(√3, √3, √3)"],
            correct: 1,
            topic: "Vectors",
            difficulty: "medium",
            theory: "Direction cosines = vector/magnitude = [1,1,1]/√3.",
            explanation: "Direction cosines = [1/√3, 1/√3, 1/√3]."
        },
        {
            id: 70,
            question: "The volume of a sphere with radius r is:",
            options: ["πr³", "(2/3)πr³", "(4/3)πr³", "4πr³"],
            correct: 2,
            topic: "Geometry",
            difficulty: "easy",
            theory: "Volume of sphere = (4/3)πr³.",
            explanation: "V = (4/3)πr³."
        }
    ],
    test8: [
        {
            id: 71,
            question: "The value of i² (where i is imaginary unit) is:",
            options: ["1", "-1", "i", "-i"],
            correct: 1,
            topic: "Complex Numbers",
            difficulty: "easy",
            theory: "By definition, i² = -1.",
            explanation: "i² = -1 by definition."
        },
        {
            id: 72,
            question: "The identity sin²(x) + cos²(x) equals:",
            options: ["0", "1", "2", "tan(x)"],
            correct: 1,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "Fundamental trigonometric identity: sin²(x) + cos²(x) = 1.",
            explanation: "sin²(x) + cos²(x) = 1."
        },
        {
            id: 73,
            question: "The sum of interior angles of a polygon with n sides is:",
            options: ["n×180°", "(n-2)×180°", "(n-1)×180°", "n×90°"],
            correct: 1,
            topic: "Geometry",
            difficulty: "medium",
            theory: "Sum of interior angles = (n-2)×180°.",
            explanation: "Polygon angle sum = (n-2)×180°."
        },
        {
            id: 74,
            question: "The value of cos(0) is:",
            options: ["0", "1", "-1", "Undefined"],
            correct: 1,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "cos(0) = 1.",
            explanation: "cos(0) = 1."
        },
        {
            id: 75,
            question: "The argument of complex number (-1 + i) is:",
            options: ["π/4", "3π/4", "π/2", "π"],
            correct: 1,
            topic: "Complex Numbers",
            difficulty: "hard",
            theory: "For -1 + i, arg = tan⁻¹(1/-1) in 2nd quadrant = 3π/4.",
            explanation: "arg(-1 + i) = 3π/4 (2nd quadrant)."
        },
        {
            id: 76,
            question: "The value of log(1) to any base is:",
            options: ["0", "1", "∞", "Undefined"],
            correct: 0,
            topic: "Logarithms",
            difficulty: "easy",
            theory: "log_b(1) = 0 for any base b > 0, b ≠ 1.",
            explanation: "log_b(1) = 0."
        },
        {
            id: 77,
            question: "The maximum value of sin(x) is:",
            options: ["0", "0.5", "1", "∞"],
            correct: 2,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "sin(x) ranges from -1 to 1. Maximum = 1 at x = π/2 + 2πn.",
            explanation: "max(sin(x)) = 1."
        },
        {
            id: 78,
            question: "The line perpendicular to y = 2x + 3 has slope:",
            options: ["2", "-2", "1/2", "-1/2"],
            correct: 3,
            topic: "Coordinate Geometry",
            difficulty: "medium",
            theory: "If original slope = 2, perpendicular slope = -1/2.",
            explanation: "Perpendicular slope = -1/m = -1/2."
        },
        {
            id: 79,
            question: "The area of a triangle with sides a, b, c is (Heron's formula):",
            options: ["abc/4", "√[s(s-a)(s-b)(s-c)]", "(a+b+c)/2", "½×base×height"],
            correct: 1,
            topic: "Geometry",
            difficulty: "hard",
            theory: "Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2.",
            explanation: "Heron's formula: A = √[s(s-a)(s-b)(s-c)]."
        },
        {
            id: 80,
            question: "The value of arccos(0) is:",
            options: ["0", "π/4", "π/2", "π"],
            correct: 2,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "cos(π/2) = 0, so arccos(0) = π/2.",
            explanation: "arccos(0) = π/2."
        }
    ],
    test9: [
        {
            id: 81,
            question: "The equation of tangent to curve y = x² at point (1, 1) is:",
            options: ["y = 2x - 1", "y = 2x + 1", "y = x", "y = x + 1"],
            correct: 0,
            topic: "Calculus",
            difficulty: "medium",
            theory: "dy/dx = 2x. At x=1, slope = 2. Tangent: y - 1 = 2(x - 1) → y = 2x - 1.",
            explanation: "Tangent line: y = 2x - 1."
        },
        {
            id: 82,
            question: "The number of terms in (x + y)⁶ is:",
            options: ["5", "6", "7", "36"],
            correct: 2,
            topic: "Binomial Theorem",
            difficulty: "medium",
            theory: "Number of terms in (x + y)ⁿ = n + 1 = 6 + 1 = 7.",
            explanation: "Number of terms = n + 1 = 7."
        },
        {
            id: 83,
            question: "The value of 0! (factorial) is:",
            options: ["0", "1", "Undefined", "∞"],
            correct: 1,
            topic: "Combinatorics",
            difficulty: "easy",
            theory: "By definition, 0! = 1.",
            explanation: "0! = 1 by definition."
        },
        {
            id: 84,
            question: "The value of ∫e^x dx is:",
            options: ["e^x", "e^x + C", "x·e^x + C", "e^(x+1) + C"],
            correct: 1,
            topic: "Calculus",
            difficulty: "easy",
            theory: "∫e^x dx = e^x + C.",
            explanation: "∫e^x dx = e^x + C."
        },
        {
            id: 85,
            question: "The equation ax² + bx + c = 0 has equal roots if:",
            options: ["b² - 4ac > 0", "b² - 4ac = 0", "b² - 4ac < 0", "Always equal"],
            correct: 1,
            topic: "Algebra",
            difficulty: "medium",
            theory: "Equal roots when discriminant Δ = b² - 4ac = 0.",
            explanation: "Equal roots when b² - 4ac = 0."
        },
        {
            id: 86,
            question: "The value of tan(π/4) is:",
            options: ["0", "1/√3", "1", "√3"],
            correct: 2,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "tan(π/4) = 1.",
            explanation: "tan(π/4) = 1."
        },
        {
            id: 87,
            question: "The eigen value of identity matrix I is:",
            options: ["0", "1", "Any value", "Depends on size"],
            correct: 1,
            topic: "Linear Algebra",
            difficulty: "medium",
            theory: "Eigen value of identity matrix = 1.",
            explanation: "Eigenvalue(I) = 1."
        },
        {
            id: 88,
            question: "The solution to |x - 2| = 3 is:",
            options: ["x = 5 only", "x = -1 only", "x = 5 or x = -1", "No solution"],
            correct: 2,
            topic: "Algebra",
            difficulty: "medium",
            theory: "x - 2 = 3 or x - 2 = -3. So x = 5 or x = -1.",
            explanation: "|x-2| = 3 gives x = 5 or x = -1."
        },
        {
            id: 89,
            question: "The function f(x) = 1/x has asymptote at:",
            options: ["x = 1", "x = 0", "y = 1", "y = 0"],
            correct: 1,
            topic: "Functions",
            difficulty: "medium",
            theory: "f(x) = 1/x has vertical asymptote at x = 0 and horizontal asymptote at y = 0.",
            explanation: "Vertical asymptote at x = 0."
        },
        {
            id: 90,
            question: "The value of ln(e) is:",
            options: ["0", "1", "e", "1/e"],
            correct: 1,
            topic: "Logarithms",
            difficulty: "easy",
            theory: "ln(e) = log_e(e) = 1.",
            explanation: "ln(e) = 1."
        }
    ],
    test10: [
        {
            id: 91,
            question: "The domain of function f(x) = √(x-1) is:",
            options: ["All real numbers", "[1, ∞)", "(-∞, 1]", "[0, 1]"],
            correct: 1,
            topic: "Functions",
            difficulty: "easy",
            theory: "For √(x-1) to be real, x - 1 ≥ 0, so x ≥ 1.",
            explanation: "Domain: x ≥ 1 or [1, ∞)."
        },
        {
            id: 92,
            question: "The minimum value of x² - 4x + 5 is:",
            options: ["0", "1", "4", "5"],
            correct: 1,
            topic: "Algebra",
            difficulty: "medium",
            theory: "Completing square: x² - 4x + 5 = (x-2)² + 1. Minimum = 1 at x = 2.",
            explanation: "(x-2)² + 1 has minimum 1."
        },
        {
            id: 93,
            question: "The value of sin(π) is:",
            options: ["0", "1", "-1", "Undefined"],
            correct: 0,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "sin(π) = 0.",
            explanation: "sin(π) = 0."
        },
        {
            id: 94,
            question: "The product rule for derivatives (fg)' equals:",
            options: ["f'g'", "f'g + fg'", "f'g - fg'", "(fg)'"],
            correct: 1,
            topic: "Calculus",
            difficulty: "easy",
            theory: "(f·g)' = f'·g + f·g'.",
            explanation: "Product rule: (fg)' = f'g + fg'."
        },
        {
            id: 95,
            question: "The conjugate of complex number 3 + 4i is:",
            options: ["3 - 4i", "-3 + 4i", "-3 - 4i", "4 + 3i"],
            correct: 0,
            topic: "Complex Numbers",
            difficulty: "easy",
            theory: "Conjugate of a + bi is a - bi.",
            explanation: "Conjugate of 3 + 4i is 3 - 4i."
        },
        {
            id: 96,
            question: "The value of sec(0) is:",
            options: ["0", "1", "∞", "Undefined"],
            correct: 1,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "sec(0) = 1/cos(0) = 1/1 = 1.",
            explanation: "sec(0) = 1."
        },
        {
            id: 97,
            question: "The chain rule states d/dx[f(g(x))] equals:",
            options: ["f'(x)·g'(x)", "f'(g(x))·g'(x)", "f(g'(x))", "f'(g(x))"],
            correct: 1,
            topic: "Calculus",
            difficulty: "medium",
            theory: "Chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x).",
            explanation: "Chain rule: df/dx = (df/dg)·(dg/dx)."
        },
        {
            id: 98,
            question: "The sum of first n even numbers is:",
            options: ["n²", "n(n+1)", "n(n+1)/2", "2n"],
            correct: 1,
            topic: "Series",
            difficulty: "medium",
            theory: "2 + 4 + 6 + ... + 2n = 2(1 + 2 + ... + n) = 2·n(n+1)/2 = n(n+1).",
            explanation: "Sum = n(n+1)."
        },
        {
            id: 99,
            question: "The radius of circle x² + y² = 16 is:",
            options: ["4", "8", "16", "√16"],
            correct: 0,
            topic: "Coordinate Geometry",
            difficulty: "easy",
            theory: "Standard form x² + y² = r². Here r² = 16, so r = 4.",
            explanation: "Radius = √16 = 4."
        },
        {
            id: 100,
            question: "The value of cot(π/4) is:",
            options: ["0", "1", "√3", "Undefined"],
            correct: 1,
            topic: "Trigonometry",
            difficulty: "easy",
            theory: "cot(π/4) = 1/tan(π/4) = 1/1 = 1.",
            explanation: "cot(π/4) = 1."
        }
    ]
};

module.exports = { jeeMatematicsQuestions };
