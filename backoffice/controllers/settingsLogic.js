
class Settings {
  removeIdsShowed (req, res, next) {
    req.query = {}
    if (req.body.question_showed && req.body.question_showed.length === 0) {
      req.query = {
        where: {
          range: 0
        }
      }
    } else {
      req.query = {
        where: {
          id: {
            $notIn: req.body.question_showed
          }
        }
      }
    }
    next()
  }

  setStage (req, res, next) {
    if (req.query.where.range === 0) {
      next()
    } else {
      let thirdTime = req.gameSettings.time / 3
      if (req.body.time < req.gameSettings.time) {
        req.query.where.range = req.body.current_stage < (req.body.time / thirdTime) ? 4 : Math.floor((req.body.time / thirdTime) + 1)
      } else {
        req.query.where.range = 5
        if (req.body.money > req.gameSettings.money) {
          req.query.where.name = 'CEO'
        } else {
          req.query.where.name = 'DEPARTMENT'
        }
      }
      next()
    }
  }

  setIfContinue (req, res, next) {
    if (req.body.money < 1 && req.body.time > 0) {
      req.query.where.range = 5
      req.query.where.name = 'MONEY'
    } else if (req.body.influence < 1) {
      req.query.where.range = 5
      req.query.where.name = 'INFLUENCE'
    }
    next()
  }

  thereAreRelatedQuestions (req, res, next) {
    if (!req.query.where.name && req.body.question_related.length > 0 && req.query.range !== 4) {
      let num = Math.floor(Math.random() * 2)
      if (num >= 1) {
        let questionId = req.body.question_related.shift()
        req.query = {
          where: {
            id: questionId
          }
        }
      }
    }
    next()
  }
}

module.exports = new Settings()
