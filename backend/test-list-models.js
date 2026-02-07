const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listAvailableModels() {
    try {
        console.log('🔍 Listing available models...\n');
        console.log('API Key:', process.env.GEMINI_API_KEY?.substring(0, 20) + '...');
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        try {
            // Try to list models if the method exists
            if (genAI.listModels) {
                console.log('📋 Calling genAI.listModels()...');
                const models = await genAI.listModels();
                console.log('✅ Available models:');
                console.log(models);
            } else {
                console.log('⚠️  listModels method not available in this SDK version');
            }
        } catch (listError) {
            console.error('❌ Error listing models:', listError.message);
            
            // Try alternative method
            console.log('\n🔧 Checking SDK version and available methods...');
            console.log('genAI methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(genAI)));
        }
        
    } catch (error) {
        console.error('Fatal error:', error.message);
    }
}

listAvailableModels();
