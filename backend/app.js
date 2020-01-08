const fs = require("fs")
const path = require("path")

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const placesRoutes = require("./routes/places-routes")
const usersRoutes = require("./routes/users-routes")
const HttpError = require("./models/http-error")

const app = express()

app.use(bodyParser.json())

//return the file in uploads/images
app.use("/uploads/images", express.static(path.join('uploads', 'images')))

//buat menghubungkan localhost 3000 sama 5000
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

app.use("/api/places", placesRoutes)
app.use("/api/users", usersRoutes)

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404)
  throw error
})

app.use((error, req, res, next) => {
  //karena ini middleware untuk error handling, if ini untuk hapus image dari storage kalau gagal signup
  if(req.file){
    fs.unlink(req.file.path, () => {
      console.log(err)
    }) //delete the file yang ada di req body
  }
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || "An unknown error occurred!" })
})

mongoose
  .connect(`mongodb+srv://rayhannr:yIwlqf9PNVtKHhXH@cluster0-f1yfj.mongodb.net/mern?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(5000)
  })
  .catch(err => {
    console.log(err)
  })
