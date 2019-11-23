const Sequelize = require('sequelize')
const Op = Sequelize.Op
class Question {
  list(req, res) {
    req.models.question
      .findAll({
        order: [['id', 'DESC']],
        include: [
          {
            model: req.models.answer
          }
        ]
      })
      .then(questions => {
        res.json(questions)
      })
      .catch(err => {
        console.log(err)
      })
  }

  nextQuestion(req, res) {
    req.query.include = [{ model: req.models.answer }]
    req.query.where = { id: { [Op.notIn]: req.body.questionViewed } }

    req.models.question.findAll(req.query).then(questions => {
      let index = Math.floor(Math.random() * questions.length)

      res.json({
        question: questions[index],
        settings: req.body
      })
    })
  }
}

module.exports = new Question()
