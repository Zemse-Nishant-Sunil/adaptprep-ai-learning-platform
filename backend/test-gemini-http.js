const https = require('https');
require('dotenv').config();

async function testModelsHTTP() {
    const apiKey = process.env.GEMINI_API_KEY;
    const modelsToTry = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-pro',
        'gemini-pro-vision',
        'gemini-2.0-flash',
        'gemini-1.5-flash-latest',
        'gemini-1.5-pro-latest'
    ];
    
    console.log('🔍 Testing different Gemini models via HTTP...\n');
    
    for (const modelName of modelsToTry) {
        const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
        
        const data = JSON.stringify({
            contents: [{
                parts: [{
                    text: 'Hello'
                }]
            }]
        });
        
        const response = await new Promise((resolve) => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                }
            };
            
            const req = https.request(url, options, (res) => {
                let responseData = '';
                res.on('data', chunk => { responseData += chunk; });
                res.on('end', () => {
                    try {
                        const parsed = JSON.parse(responseData);
                        resolve({
                            model: modelName,
                            status: res.statusCode,
                            message: parsed.error?.message || parsed.candidates?.[0]?.content?.parts?.[0]?.text || 'Success'
                        });
                    } catch {
                        resolve({
                            model: modelName,
                            status: res.statusCode,
                            message: responseData
                        });
                    }
                });
            });
            
            req.on('error', error => {
                resolve({
                    model: modelName,
                    status: 'ERROR',
                    message: error.message
                });
            });
            
            req.write(data);
            req.end();
        });
        
        const icon = response.status === 200 ? '✅' : '❌';
        console.log(`${icon} ${response.model}: ${response.status}`);
        if (response.status !== 200) {
            console.log(`   └─ ${response.message}`);
        }
    }
}

testModelsHTTP();
