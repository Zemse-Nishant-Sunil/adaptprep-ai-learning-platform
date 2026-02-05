const crypto = require('crypto');

// Generate a secure random JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('Your secure JWT secret:');
console.log(jwtSecret);

// You can also generate multiple options
console.log('\nOr use one of these alternatives:');
for (let i = 0; i < 3; i++) {
    console.log(crypto.randomBytes(32).toString('hex'));
}
