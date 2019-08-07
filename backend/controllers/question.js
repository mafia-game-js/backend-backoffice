class Question {
  createAnswer(req, res) {
    req.models.answer
      .create(req.body)
      .then(answer => {
        res.sendStatus(200)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
  create(req, res) {
    if (!req.body.question_id) {
      req.body.question_id = -1
    }
    req.models.question
      .create({ userId: req.user.id, ...req.body.question })
      .then(question => {
        if (req.body.answers && req.body.answers.length > 0) {
          req.body.answers.map(answer => {
            answer.questionId = question.id
          })
          req.models.answer
            .bulkCreate(req.body.answers)
            .then(() => {
              res.sendStatus(200)
            })
            .catch(err => {
              res.status(400).json(err)
            })
        } else {
          res.sendStatus(200)
        }
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
  updateAnswer(req, res) {
    req.models.answer
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(answer => {
        res.sendStatus(200)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ code: 'bad_answer_fields' })
      })
  }
  update(req, res) {
    req.models.question
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(question => {
        res.sendStatus(200)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ code: 'bad_question_fields' })
      })
  }
  deleteAnswer(req, res) {
    req.models.answer
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .then(() => {
        res.responseStatus(200)
      })
      .catch(() => {
        res.responseStatus(400)
      })
  }
  delete(req, res) {
    req.models.question
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .then(() => {
        res.sendStatus(200)
      })
      .catch(() => {
        res.sendStatus(400)
      })
  }
  list(req, res) {
    req.models.question
      .findAll({
        order: [
          ['id', 'DESC']
          // ['range'],
          // ['level']
        ],
        include: [
          {
            model: req.models.answer
          }
        ]
      })
      .then(questions => {
        res.json(questions)
        })
        .catch(err =>
        {
          console.log(err)
        })
  }
  nextQuestion(req, res) {
    req.query.include = [{ model: req.models.answer }]
    req.models.question.findAll(req.query).then(questions => {
      let index = Math.floor(Math.random() * questions.length)
      res.json({ question: questions[index], settings: req.body })
    })
  }
}

module.exports = new Question()
