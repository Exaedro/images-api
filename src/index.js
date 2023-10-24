import express from "express"
import logger from "morgan"
import path from "node:path"
import multer from "multer"
import { v4 } from "uuid"

const app = express()

// Config
const port = process.env.PORT ?? 3000
app.set('views', path.join(process.cwd(), 'src/views'))
app.set('view engine', 'ejs')
app.set('json spaces', 2)

// Middlewares
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const storage = multer.diskStorage({
    destination: path.join(process.cwd(), 'src/public/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, v4() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));

// Routes
import { router } from './routes/routes.js'
app.use(router)

// Static
app.use(express.static(path.join(process.cwd(), 'src/public')))

// Server
app.listen(port, () => {
    console.log('Servidor en', port)
})