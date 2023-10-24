import db from "../database/mysql.js";
import { getDate } from "../utils/date.js";

import fs from "node:fs"
import path from "node:path"

const url = 'http://localhost:3000/uploads/'

class ImageModel {
    static async getAll(req, res) {
        const [rows] = await db.query({ sql: 'SELECT * FROM posts' });
        return rows;
    }
    static async getById(req, res) {
        const { id } = req.params

        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id])
        return rows.length == 0 ? undefined : rows
    }
    static async upload(req, res) {
        const { title } = req.body
        const { filename } = req.file
        const date = getDate()

        if(title && filename) {
            db.query('INSERT INTO posts (title, date, img, filename) VALUES (?,?,?,?)', [title, date, url + filename, filename], (err, results) => {
                if(err) throw new Error(err)
                return results
            })
        }
    }
    static async delete(req, res) {
        const { id } = req.params

        const [row] = await db.query('SELECT filename FROM posts WHERE id = ?', [id])

        db.query('DELETE FROM posts WHERE (SELECT id WHERE id = ?)', [id], async (err, results) => {
            if(err) throw new Error(err)
        })

        fs.unlinkSync(process.cwd() + '/src/public/uploads/' + row[0].filename) // Delete file
    }
}

export default ImageModel