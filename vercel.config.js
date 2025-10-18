/** @type {import('vercel').VercelConfig} */
const config = {
  rewrites: [
    { source: '/(.*)', destination: '/index.html' }
  ]
};

module.exports = config;