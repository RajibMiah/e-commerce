const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

// next.js configuration
const nextConfig = {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    env: {
        NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
        NEXT_PUBLIC_REST_API_ENDPOINT: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
        generateRobotsTxt: true, // (optional)
    }
};

module.exports = withPlugins([withOptimizedImages], nextConfig);