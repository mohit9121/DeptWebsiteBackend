const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { generateJwtToken } = require('../../utils/jwtUtils');

const FacultyAccountSchema = require('../../models/FacultyAccountSchema')

const FacultyDetail = require('../../models/FacultyDetail');

const AchievementDetail = require('../../models/achievements')

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


router.post('/updateAchievments', async (req, res) => {
  try {

    console.log(req.body.achievementsData[0]);

    const newAch = new AchievementDetail({
      name: req.body.achievementsData[0].name,
      link: req.body.achievementsData[0].link,
    })

    console.log(newAch);

    await newAch.save();

    res.status(201).json({ message: 'New Achievement Added Successfully' });
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

    res.status(200).json({ message: 'Authentication successful', token: token });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

router.post('/updateFacultyDetails', async (req, res) => {
  try {
    const formData = req.body;

    console.log(formData);
    console.log(req.body);

    // Check if faculty with the provided email exists
    const existingFaculty = await FacultyDetail.findOne({ email: formData.email });

    if (existingFaculty) {
      // Update existing faculty details
      const updatedFaculty = await FacultyDetail.findOneAndUpdate(
        { email: formData.email },
        { $set: formData },
        { new: true }
      );

      return res.json(updatedFaculty);
    } else {
      // Add new faculty if not already exists
      const newFaculty = new FacultyDetail(formData);
      const savedFaculty = await newFaculty.save();

      return res.json(savedFaculty);
    }
  } catch (error) {
    console.error('Error updating or adding faculty:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/facultyList', async (req, res) => {
  try {
    const facultyList = await FacultyDetail.find({}, 'name');
    res.json(facultyList);
  } catch (error) {
    console.error('Error fetching faculty list:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/facultyList', async (req, res) => {
  try {
    const facultyList = await FacultyDetail.find({}, 'name');
    res.json(facultyList);
  } catch (error) {
    console.error('Error fetching faculty list:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get faculty details by ID
router.get('/faculty/:id', async (req, res) => {
  try {
    const facultyId = req.params.id;
    const facultyDetails = await FacultyDetail.findById(facultyId);
    res.json(facultyDetails);
  } catch (error) {
    console.error('Error fetching faculty details:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



module.exports = router;