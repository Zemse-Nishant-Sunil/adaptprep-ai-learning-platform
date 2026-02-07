const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGeminiDirectly() {
    try {
        console.log('🔍 Testing Gemini API directly...\n');
        console.log('API Key:', process.env.GEMINI_API_KEY?.substring(0, 20) + '...');
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Try to get the model  
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        console.log('✅ Model retrieved successfully');
        
        // Try a simple generateContent call
        console.log('\n📤 Attempting to call generateContent...');
        console.log('Input: "Hello, how are you?"');
        
        try {
            const result = await model.generateContent('Hello, how are you?');
            console.log('✅ generateContent succeeded!');
            console.log('Response:', result.response.text().substring(0, 100) + '...');
        } catch (genError) {
            console.error('❌ generateContent failed');
            console.error('Error type:', genError.constructor.name);
            console.error('Error message:', genError.message);
            console.error('Full error:', JSON.stringify(genError, null, 2));
            
            // Try with different approach
            console.log('\n🔧 Trying alternative approach...');
            const model2 = genAI.getGenerativeModel({ 
                model: 'gemini-pro',
                safetySettings: []
            });
            
            try {
                const result2 = await model2.generateContent({
                    contents: [{
                        role: 'user',
                        parts: [{
                            text: 'Hello, how are you?'
                        }]
                    }]
                });
                
                console.log('✅ Alternative approach succeeded!');
                console.log('Response:', result2.response.text().substring(0, 100) + '...');
            } catch (altError) {
                console.error('❌ Alternative approach also failed');
                console.error('Error:', altError.message);
            }
        }
        
    } catch (error) {
        console.error('Fatal error:', error.message);
    }
}

testGeminiDirectly();
