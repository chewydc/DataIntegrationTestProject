import Router from 'express'

const apiIngestData = new Router()

apiIngestData.post('/ftp', (req, res) => {
    //Only printed the incoming data...
    console.log(req.body)
    res.status(200).send(`OK`)
});

apiIngestData.all('*', (req, res) => {
    const { url, method } = req
    res.status(404).send(`${method} to route ${url} not implemented`)
})

export { apiIngestData }