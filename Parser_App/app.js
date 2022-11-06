const fs = require('fs')
const path = require('path')
const csv = require('csvtojson')
const axios = require('axios')

const API_URL= process.env.API_URL || 'http://localhost:8080/ftp'

const currDir = path.join(__dirname + '/Files/')
const readdir = (dirname) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (error, filenames) => {
      if (error) {
        reject(error)
      } else {
        resolve(filenames)
      }
    })
  })
}

const filtercsvFiles = (filename) => {
  if (filename.substring(filename.lastIndexOf('.') + 1) == 'csv') return filename
  return null
}

readdir(currDir)
  .then((filenames) => {
    filenames = filenames.filter(filtercsvFiles)
    for (let i = 0; i < filenames.length; i++) {
      let currFilePath = currDir + filenames[i]

      //Parser Function
      csv()
        .fromFile(currFilePath)
        .then((inputObj) => {
          for (row of inputObj) {
            for (let key in row) {
              if (!row[key]) row[key] = null
            }
            let outputObj = {
              "id": filenames[i].substring(filenames[i].lastIndexOf('-') + 1, filenames[i].lastIndexOf('.')),
              "received": filenames[i].substring(0, filenames[i].lastIndexOf('-'))
            }
            outputObj = { ...outputObj, "payload": row }

            //HTTP Request to apiRest endpoint
            axios.post(API_URL, outputObj)
              .then((res) => {
                console.log(`Delivery Status: ${res.status}`)
              }).catch((err) => {
                console.log(`Delivery Status: ${err}`)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })