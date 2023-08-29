const notfound = (req,res,next) =>{
    res.status(400).send("Rounte does not exist")
    next()
}

module.exports = notfound;