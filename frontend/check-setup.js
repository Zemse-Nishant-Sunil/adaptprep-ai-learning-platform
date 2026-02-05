const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Frontend Setup...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('⚠️  .env file missing - create from .env.example\n');
} else {
    console.log('✅ Environment file exists\n');
}

// Check required source files
const requiredFiles = [
    'src/App.jsx',
    'src/contexts/UserContext.jsx',
    'src/components/ChatBot.jsx',
    'src/components/ChatBot.css',
    'src/components/Login.jsx',
    'src/components/SignUp.jsx',
    'src/components/MockTest.jsx',
    'src/components/Insights.jsx'
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
    console.log('✅ All required React components present\n');
}

// Check if backend is running
const testBackend = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    console.log(`🔌 Testing backend connection: ${apiUrl}`);

    try {
        const response = await fetch(`${apiUrl.replace('/api', '')}`);
        if (response.ok) {
            console.log('✅ Backend is running');
        } else {
            console.log('⚠️  Backend returned error status');
        }
    } catch (error) {
        console.log('❌ Backend not reachable - make sure backend is running');
        console.log('   Run: cd ../backend && npm run dev');
    }
};

// Load environment variables
if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    testBackend();
}

console.log('\n📚 To start the frontend:');
console.log('npm install');
console.log('npm start');
