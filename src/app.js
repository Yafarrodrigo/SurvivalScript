import express from "express";
import path from 'path'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express()
app.use(express.static(path.join(__dirname, '../public')));

export default app