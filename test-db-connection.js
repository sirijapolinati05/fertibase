const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fertibase';

console.log('🔍 Testing MongoDB connection...');
console.log('📍 Connection string:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Hide credentials

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully!');
        console.log('📊 Database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ MongoDB connection failed:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);

        // Provide specific guidance based on error type
        if (error.message.includes('ECONNREFUSED')) {
            console.error('\n💡 Suggestion: MongoDB service is not running. Start MongoDB service.');
        } else if (error.message.includes('Authentication failed')) {
            console.error('\n💡 Suggestion: Check your MongoDB username and password.');
        } else if (error.message.includes('timed out')) {
            console.error('\n💡 Suggestion: Check network connection or MongoDB Atlas IP whitelist.');
        }

        process.exit(1);
    });
