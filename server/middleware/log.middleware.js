import fs from "node:fs"

function logEvent(req, res, next) {
  let log = `|[${req.method}] | url: ${req.url} | ${Date.now()}| \n`
  fs.writeFile("logfile.txt", log, { flag: "a+" }, (err) => {
    if (err) {
      console.error(err)
      next()
    } else {
      // file written successfully
      next()
    }
  })
}

export default logEvent
