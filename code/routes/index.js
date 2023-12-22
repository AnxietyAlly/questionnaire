import express from 'express';
import cors from 'cors';
import {
  getAllQuestionnaires,
  getSingleQuestionnaire,
  getAllQuestionsOfQuestionnaire,
  getSingleQuestion,
  getCorrectAnswersOfSingleQuestion,
  getPossibleAnswersOfSingleQuestion,
  getSinglePossibleAnswer,
  getSingleQuestionAnswerTemplate,
  getAllMentalProblems,
  getSingleMentalProblem,
  getSingleExtraInformation,
} from '../controllers/questionnaireController.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('Hi, this is the questionnaire microservice');
});

router.options('/questionnaire', (req, res, next) => {
  try {
    //set header before response
    res.header({
      allow: 'GET, POST, OPTIONS',
      'Content-type': 'application/json',
      Data: Date.now(),
      'Content-length': 0,
    });
    //response
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get('/questionnaires', cors(), getAllQuestionnaires);
router.get('/questionnaires/:questionnaire_id', cors(), getSingleQuestionnaire);
router.get('/questionnaires/:questionnaire_id/questions', cors(), getAllQuestionsOfQuestionnaire);
router.get('/questions/:question_id', cors(), getSingleQuestion);
router.get('/questions/:question_id/correctAnswers', cors(), getCorrectAnswersOfSingleQuestion);
router.get('/questions/:question_id/possibleAnswers', cors(), getPossibleAnswersOfSingleQuestion);
router.get('/possibleAnswers/:possible_answer_id', cors(), getSinglePossibleAnswer);
router.get('/questionAnswerTemplates/:question_answer_template_id', cors(), getSingleQuestionAnswerTemplate);
router.get('/mentalProblems', cors(), getAllMentalProblems);
router.get('/mentalProblems/:mental_problem_id', cors(), getSingleMentalProblem);
router.get('/extraInformation/:extra_information_id', cors(), getSingleExtraInformation)
//router.post('/questionnaire', cors(), setResults);

export default router;
