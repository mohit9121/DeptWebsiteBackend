const express = require('express');
const router = express.Router();

const FacultyAccountSchema = require('../../models/FacultyAccountSchema')

router.get('/test', (req, res) => res.send('book route testing!'));


router.post('/addNewFaculty', (req, res) => {
    FacultyAccountSchema.create(req.body)
      .then(faculty => res.json({ msg: 'Faculty added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add new faculty' }));
  });

module.exports = router;