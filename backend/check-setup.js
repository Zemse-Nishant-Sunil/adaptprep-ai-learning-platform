require('dotenv').config();

console.log('🔍 Checking Backend Setup...\n');

// Check required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'GEMINI_API_KEY'];
let missingVars = [];

requiredEnvVars.forEach(varName => {
    if (!process.env[varName] || process.env[varName] === 'your_gemini_api_key_here') {
        missingVars.push(varName);
    }
});

if (missingVars.length > 0) {
    console.log('❌ Missing or invalid environment variables:');
    missingVars.forEach(varName => {
        console.log(`   - ${varName}`);
    });
    console.log('\n📝 Please update your .env file\n');
} else {
    console.log('✅ All environment variables configured\n');
}

// Check file structure
const fs = require('fs');
const path = require('path');

const requiredFiles = [
    'server.js',
    'models/User.js',
    'models/UserData.js',
    'models/ChatHistory.js',
    'routes/auth.js',
    'routes/user.js',
    'routes/questions.js',
    'routes/chat.js',
    'middleware/auth.js',
    'data/questionBank.js'
];

let missingFiles = [];

requiredFiles.forEach(filePath => {
    if (!fs.existsSync(path.join(__dirname, filePath))) {
        missingFiles.push(filePath);
    }
});

if (missingFiles.length > 0) {
    console.log('❌ Missing files:');
    missingFiles.forEach(file => {
        console.log(`   - ${file}`);
    });
    console.log('\n');
} else {
    console.log('✅ All required files present\n');
}

// Test MongoDB connection
const mongoose = require('mongoose');
console.log('🔌 Testing MongoDB connection...');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connection successful');
        mongoose.connection.close();
    })
    .catch(err => {
        console.log('❌ MongoDB connection failed:', err.message);
        console.log('💡 Make sure MongoDB is running locally or check your connection string');
    });

console.log('\n📚 To start the backend:');
console.log('npm install');
console.log('npm run dev');
