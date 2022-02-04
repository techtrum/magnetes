const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer ({ dest: "./upload/" });
const property = require('../models/property');
const Property = require('../models/property');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../estate-app/public/uploads/")
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
// })

// const upload = multer({ storage: storage })

router.route('/').get((req, res) => {
    const { category } = req.query;
    if (category) {
        Property.find({ category })
        .then(properties => res.json(properties))
        .catch(err => res.status(400).json('Error: ' + err));
    } else {
        Property.find()
        .then(properties => res.json(properties))
        .catch(err => res.status(400).json('Error: ' + err));
    }
})

router.post('/add', async (req, res) => {
    const newProperty = new Property (req.body)
    console.log(newProperty);
    newProperty.save()
        .then(() => res.json('Property added!!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

// router.post('/add', upload.array("images"), async (req, res) => {
//     try {
//         console.log(req.body, req.files)
//         // const result = cloudinary.uploader.upload(req.files)
//         const newProperty = new Property (req.body)
//         // newProperty.images = ({ url: result.secure_url, filename: result.public_id })
//         // const { images } = req.body;
//         // let promises = []
//         // images.forEach(async image => {
//         //     promises.push(
//         //         cloudinary.uploader.upload (image, {
//         //             folder: 'estateApp-folder',
//         //         })
//         //     )
//         // })
//         // const response = await Promise.all(promises)
//         // console.log(newProperty);

//         // newProperty.images = req.files.map(f => ( { url: f.secure_url, filename: f.public_id } ))
//         // newProperty.propertyImage = req.files.originalname;

//     //     newProperty.save()
//     //     .then(() => res.json('Property added!!'))
//     //     .catch(err => res.status(400).json('Error: ' + err));
//     // } catch (err) {
//     //     console.log(err);
//     // }
// })

// router.post('/upload', upload.single("avatar"), (req, res) => {
//     // console.log("req.file", req.file);
//     let newFile = req.file.filename;
//     console.log(newFile);
//     res.send("200");
// })

// router.post('/upload',  async(req, res, next) => {
//     try {
//         const { images } = req.body;
//         console.log(images);
//         const image = images[0]
//         // let promises = []
//         // images.forEach(async image => {
//         //     promises.push(
//         //         cloudinary.uploader.upload (image, {
//         //             folder: 'estateApp-folder',
//         //         })
//         //     )
//         // })
//         // const response = await Promise.all(promises)
//         // res.send(response);
//     } catch (err) {
//         next(err)
//     }
// })

router.route('/:id').get((req, res) => {
    Property.findById(req.params.id)
    .then(property => res.json(property))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/:id').delete((req, res) => {
    Property.findByIdAndDelete(req.params.id)
    .then(() => res.json('Property Deleted!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id',). post( upload.single("name"), (req, res) => {
    const { id } = req.params
    Property.findByIdAndUpdate ( id, req.body,  {runValidation: true, new: true} )
    .then (property => {
        property.propertyImage = req.file.originalname;
        property.save()
        .then(() => res.json('Property Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    // res.redirect(`/properties/${property._id}`)
});

module.exports = router