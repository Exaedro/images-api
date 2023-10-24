import { Router } from "express";
import ImageController from "../controllers/imageController.js";

export const router = new Router()

import pkgData from '../../package.json' assert { type: 'json' }
const { name, description, version, author, prefix, principal, upload } = pkgData

router.get('/', (req, res) => {
    res.status(200).json({
        'status': 200,
        'prefix': prefix,
        'principal': principal,
        'upload': upload,
        'information': {
            'name': name,
            'description': description,
            'author': author,
            'version': version,
        }
    })
})

router.get(`${prefix}/images`, (req, res) => ImageController.getAll(req, res)) // Obtener todos
router.get(`${prefix}/image/:id`, (req, res) => ImageController.getById(req, res)) // Obtener por id
router.get(`${prefix}/image/:id/delete`, (req, res) => ImageController.delete(req, res))

router.get(`${prefix}/images/upload`, (req, res) => { res.render('upload', { prefix }) }) // Apartado subir
router.post(`${prefix}/images/upload`, (req, res) => ImageController.upload(req, res)) // Post del apartado subir