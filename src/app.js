import express from "express";
import path from 'path'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import _ITEMS from '../public/js/AllItems.js'
import _TILES from '../public/js/AllTiles.js'

const app = express()
app.use(express.static(path.join(__dirname, '../public')));

app.get("/items", (req,res) => res.json(_ITEMS))
app.get("/tiles", (req,res) => res.json(_TILES))

export default app