const http = require('http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Create a test token
const testUserId = new mongoose.Types.ObjectId();
const testToken = jwt.sign(
    { userId: testUserId.toString() },
    process.env.JWT_SECRET || 'test-secret'
);

function makeRequest(path, method, data, token) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(data);
        
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
                'Authorization': `Bearer ${token}`
            }
        };
        
        const req = http.request(options, (res) => {
            let responseData = '';
            
            res.on('data', chunk => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(responseData)
                    });
                } catch {
                    resolve({
                        status: res.statusCode,
                        data: responseData
                    });
                }
            });
        });
        
        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

async function testChat() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/adaptprep');
        console.log('📚 Connected to MongoDB');
        
        // Create a test user
        const testUser = await User.create({
            _id: testUserId,
            name: 'Test User',
            email: `test-${Date.now()}@example.com`,
            password: 'hashedpassword123'
        });
        
        console.log('👤 Created test user:', testUser._id);
        
        console.log('\n🧪 TESTING CHAT ENDPOINT...\n');
        console.log('📝 Test Message: "hi"');
        console.log('🔐 User ID:', testUserId.toString());
        
        const response = await makeRequest(
            '/api/chat/message',
            'POST',
            {
                message: 'hi',
                examType: 'JEE'
            },
            testToken
        );
        
        console.log('\n✅ Response Status:', response.status);
        console.log('-----------------------------------');
        if (response.data.message) {
            console.log(response.data.message);
        } else {
            console.log(JSON.stringify(response.data, null, 2));
        }
        console.log('-----------------------------------\n');
        
        // Clean up
        await User.deleteOne({ _id: testUserId });
        console.log('🗑️ Cleaned up test user');
        
    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        if (error.stack) console.error(error.stack);
    } finally {
        await mongoose.disconnect();
    }
}

testChat();
