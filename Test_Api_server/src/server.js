import express from 'express'
import { Server as HttpServer } from 'http' 
import { apiIngestData } from "../routes/apiIngestData.js"

const app = express()
const httpServer = new HttpServer(app)

app.use(express.json())
app.use('/', apiIngestData)

const PORT = process.env.PORT || 8080

const server = httpServer.listen(PORT, () => {
    console.log(`Server running at port ${server.address().port}`)
})
server.on('error', error => console.log(`Server error: ${error}`))