import app from "./src/app.js";
const PORT = process.env.POST || 3000

app.listen(PORT, () => {
    console.log(`server running on: localhost:${PORT}` );
})