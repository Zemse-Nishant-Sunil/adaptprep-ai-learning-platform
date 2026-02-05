const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testLatestGeminiModels() {
    try {
        console.log('🔍 Testing Latest Gemini Models...');
        console.log('🔑 API Key:', process.env.GEMINI_API_KEY ? `${process.env.GEMINI_API_KEY.substring(0, 15)}...` : 'NOT FOUND');

        if (!process.env.GEMINI_API_KEY) {
            console.log('❌ No API key found in environment variables');
            return;
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Try the latest models in order of preference
        const modelsToTry = [
            'gemini-2.0-flash-exp',     // Latest experimental
            'gemini-1.5-flash-latest',  // Latest stable
            'gemini-1.5-flash-002',     // Specific version
            'gemini-1.5-flash',         // Standard
            'gemini-1.5-pro-latest',    // Pro latest
            'gemini-1.5-pro',           // Pro standard
            'gemini-pro'                // Legacy
        ];

        for (const modelName of modelsToTry) {
            try {
                console.log(`\n🧪 Testing model: ${modelName}`);

                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello! Please respond with 'Connection successful with [model name]' to confirm you're working correctly.");
                const response = await result.response;
                const text = response.text();

                console.log('✅ SUCCESS!');
                console.log(`📝 Model: ${modelName}`);
                console.log(`💬 Response: ${text}`);

                // Test with a study-related prompt
                console.log('\n🎓 Testing study coaching capabilities...');
                const studyPrompt = `You are an expert study coach for JEE preparation. A student asks: "How should I approach Physics problems?" Give a concise, helpful response.`;
                const studyResult = await model.generateContent(studyPrompt);
                const studyResponse = await studyResult.response;
                const studyText = studyResponse.text();

                console.log('💡 Study Response:', studyText.substring(0, 300) + '...');
                console.log('\n🎉 Gemini API is fully working with latest models!');
                console.log(`🚀 Recommended model: ${modelName}`);
                return true;

            } catch (modelError) {
                console.log(`❌ ${modelName} failed:`, modelError.message.substring(0, 100));
                continue;
            }
        }

        console.log('\n❌ All models failed. Troubleshooting:');
        console.log('1. 🔑 Check if API key is valid and has proper permissions');
        console.log('2. 🌍 Verify your region has access to Gemini API');
        console.log('3. 💰 Check if you have remaining quota/credits');
        console.log('4. 🔄 Try generating a new API key');
        console.log('\n🔧 Solutions:');
        console.log('• Generate new key: https://aistudio.google.com/app/apikey');
        console.log('• Check quota: https://aistudio.google.com/app/prompts');

    } catch (error) {
        console.log('❌ CRITICAL ERROR:', error.message);

        if (error.message.includes('API_KEY_INVALID') || error.message.includes('Invalid API key')) {
            console.log('\n🔑 API KEY ISSUE:');
            console.log('1. Go to https://aistudio.google.com/app/apikey');
            console.log('2. Create a new API key');
            console.log('3. Replace the key in your .env file');
            console.log('4. Make sure there are no extra spaces or quotes');
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
            console.log('\n⚠️ QUOTA/LIMIT ISSUE:');
            console.log('1. You may have exceeded free tier limits');
            console.log('2. Wait for quota reset or upgrade plan');
            console.log('3. Check usage at https://aistudio.google.com/');
        }
    }
}

// Also test specific model directly
async function testGemini2Flash() {
    try {
        console.log('\n🔥 Testing Gemini-2.0-Flash specifically...');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const result = await model.generateContent("Explain quantum mechanics in simple terms for a high school student preparing for physics entrance exams.");
        const response = await result.response;
        const text = response.text();

        console.log('🎯 Gemini-2.0-Flash Response:');
        console.log(text.substring(0, 500) + '...');
        console.log('\n✨ Latest model is working perfectly!');

    } catch (error) {
        console.log('⚠️ Gemini-2.0-Flash not available, falling back to stable models');
    }
}

// Run tests
testLatestGeminiModels().then(() => {
    testGemini2Flash();
});
