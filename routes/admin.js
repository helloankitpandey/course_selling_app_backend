const express = require("express");
// const { router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../database");
const router = express.Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check if a user with this username already exists
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: 'Admin created successfully'
    })
    
});   
    // .then(function(){
    //     res.json({
    //         messeage: "Admin created Suceesfully"
    //     })
    // })


router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    console.log(newCourse);
    res.json({
        message: 'Course created successfully',
        CourseId: "newCourse_Id" //or newCourse._Id
    })

    
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all course logic
    const response = await Course.find({});

    res.json({
        courses: response
    })
    console.log(response)
});

// we can update our courses by router.put

 module.exports = router;