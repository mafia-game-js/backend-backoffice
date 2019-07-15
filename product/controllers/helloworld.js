class helloworld {
  helloworld() {
    res.status(200).json({ code: 'Hellow helloworld!' })
    return
  }
}

module.exports = new helloworld()
