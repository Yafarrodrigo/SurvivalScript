import app from "./src/app.js";
const PORT = process.env.PORT || 3000
//import os from 'os'

//const networkInterfaces = os.networkInterfaces();

app.listen(PORT, () => {
    //console.log(`server running on: ${networkInterfaces['Ethernet'][0].address}:${PORT}` );
    console.log(`server running on: ip:${PORT}` );
})