const jwt = require('jsonwebtoken');

// Replace 'your-secret-key' with a strong, secret key (it should be kept secret)
const secretKey = '1JjPaNe5RggtFsNFnCf1EmZ+LopYjzIA26PpTrQZQMTDS1Xu+vwg8ycyFmMKuRpZagKC6mSqhLhkIpUcgVAmC+Y3kXsRCSOA03hu5oQokEwOuE3rc=Hj8idMoe=78';

function generateJwtToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
    // Add any additional user data to the payload as needed
  };

  const options = {
    expiresIn: '1d', // 1 day expiration
  };

  return jwt.sign(payload, secretKey, options);
}

module.exports = { generateJwtToken };
