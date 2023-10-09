const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { generateJwtToken } = require('../../utils/jwtUtils');

const FacultyAccountSchema = require('../../models/FacultyAccountSchema')

router.get('/test', (req, res) => res.send('book route testing!'));


router.post('/addNewFaculty', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body);

    const saltRounds = 10;
    const bcryptedPassword = await bcrypt.hash(password, saltRounds);

    const newFaculty = new FacultyAccountSchema({
      name,
      email,
      hashedPassword: bcryptedPassword,
      fid: 'F123'
    })

    await newFaculty.save();

    res.status(201).json({ message: 'New Faculty Registered Successfully' });
  }
  catch (error) {
    console.error('Error registering faculty:', error);
    res.status(500).json({ error: 'Registration of the new faculty failed' });
  }

});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await FacultyAccountSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed1' });
    }

    const userforJwt = { _id: user._id, email: user.email };

    const token = generateJwtToken(userforJwt);

    res.cookie('jwt', token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    res.status(200).json({ message: 'Authentication successful', token: token});
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});


module.exports = router;