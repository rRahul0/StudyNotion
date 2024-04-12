const express = require('express')
const dbConnect = require('./config/database')
const userRoutes = require("./routes/User")
const courseRoutes = require("./routes/Course")
const paymentsRoutes = require("./routes/Payments")
const profileRoutes = require("./routes/Profile")
const cookieParser = require('cookie-parser')
const cors = require("cors")
const { cloudinaryConnect } = require("./config/cloudinary")
const fileupload = require('express-fileupload')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000

//database connect
dbConnect()

//middewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))
app.use(
    cors({
        origin: `${process.env.FRONTEND_URL}`,
		credentials: true,
    })
)

app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)


//cloudinary connection
cloudinaryConnect()

// routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentsRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/cookie", (req, res) => {
    if (req.cookies?.token) {
        return res.json({
            success: true,
            token: req.cookies.token,
        })
    }return res.json({
        success: false,
    })
})

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your Server is Up and running..."
    })
})
app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`))
