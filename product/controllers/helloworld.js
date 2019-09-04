class helloworld {
  helloworld(req, res) {
    res.status(200).json({ code: 'Hellow world!' })
    return
  }
}

module.exports = new helloworld()
