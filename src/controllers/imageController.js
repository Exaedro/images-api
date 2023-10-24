import ImageModel from "../models/imageModel.js";

class ImageController {
    static async getAll(req, res) {
        try {
            const data = await ImageModel.getAll()
            res.status(200).json(data)
        } catch(e) {
            res.status(500).json({ 'status': 500, 'message': 'server error'})
        }
    }
    static async getById(req, res) {
        try {
            const image = await ImageModel.getById(req, res)

            if(image) {
                res.status(200).json(image) 
            } else {
                res.status(404).json({ 'status': 404, 'message': 'not found'})
            }
        } catch(e) {
            res.status(500).json({ 'status': 500, 'message': 'server error'})
            console.error(e)
        }
    }
    static async upload(req, res) {
        try {
            await ImageModel.upload(req, res)
            res.status(200).json({ 'status': 200, 'message': 'uploaded!' })
        } catch(e) {
            console.error(e)
            res.status(500).json({ 'status': 500, 'message': 'server error' })   
        }
    }
    static async delete(req, res) {
        try {
            await ImageModel.delete(req, res)
            res.status(200).json({ 'status': 200, 'message': 'image deleted' })
        } catch(e) {
            res.status(404).json({ 'status': 404, 'message': 'not found' })
        }
    }
}

export default ImageController