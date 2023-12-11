import Database from 'better-sqlite3';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const db = new Database(process.env.DB_PATH, { verbose: console.log });

function getToday() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate); // "17-6-2022"
  return currentDate;
}

const tempResponse = {
  meta: {
    date: getToday(),
  },
  data: {
    message: 'this route is not implemented yet',
  },
};

export async function getAllQuestionnaires(req, res) {
  try {
    const stmnt = db.prepare("SELECT * FROM questionnaires");
    const rows = stmnt.all();
    const jsonToSend = {
      meta: {
        name: "Questionnaires",
        title: "All questionnaires",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: []
    }
    for (let i = 0; i < rows.length; i++) {
      jsonToSend.data.push(`/questionnaires/${rows[i].id}`)
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

export async function getSingleQuestionnaire(req, res) {
  try {
    const params = [req.params.questionnaire_id];
    const stmnt = db.prepare(`SELECT * FROM questionnaires where id = ?`);
    const row = stmnt.get(params);
    const jsonToSend = {
      meta: {
        name: "Questionnaire",
        title: "Specific questionnaire",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: row
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllQuestionsOfQuestionnaire(req, res) {
  try {
    const params = [req.params.questionnaire_id];
    const stmnt = db.prepare("SELECT * FROM questionnaireQuestions where questionnaire_id = ?");
    const rows = stmnt.all(params);
    const jsonToSend = {
      meta: {
        name: "Questionnaire questions",
        title: "All questions for the questionnaire",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: []
    }
    for (let i = 0; i < rows.length; i++) {
      jsonToSend.data.push(`/questionnaires/${params[0]}/questions/${rows[i].id}`)
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

//export async function getAllQuestions(req, res) {
//  try {
//    const stmnt = db.prepare("SELECT * FROM questionnaireQuestions");
//    const rows = stmnt.all();
//    const jsonToSend = {
//      meta: {
//        name: "Questionnaire questions",
//        title: "All questions for the questionnaire",
//        date: getToday(),
//        originalUrl: `${req.originalUrl}`,
//      },
//      data: []
//    }
//    for (let i = 0; i < rows.length; i++) {
//      jsonToSend.data.push(`/questionnaire/questions/${rows[i].id}`)
//    }
//    res.status(200).json(jsonToSend);
//  } catch (err) {
//    console.log(err);
//  }
//}

export async function getSingleQuestion(req, res) {
  try {
    const params = [req.params.question_id];
    const stmnt = db.prepare(`SELECT * FROM questionnaireQuestions where id = ?`);
    const row = stmnt.get(params);
    const jsonToSend = {
      meta: {
        name: "Questionnaire question",
        title: "Specific question for the questionnaire",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: row
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

export async function getCorrectAnswersOfSingleQuestion(req, res) {
  try {
    const params = [req.params.question_id];
    const stmnt = db.prepare("SELECT * FROM correctAnswers where question_id = ?");
    const rows = stmnt.all(params);
    const jsonToSend = {
      meta: {
        name: "Correct answers for question",
        title: "All correct answers for a question",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: rows
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllMentalProblems(req, res) {
  try {
    const stmnt = db.prepare("SELECT * FROM mentalProblems");
    const rows = stmnt.all();
    const jsonToSend = {
      meta: {
        name: "Mental problems",
        title: "All mental problems",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: []
    }
    for (let i = 0; i < rows.length; i++) {
      jsonToSend.data.push(`/mentalProblems/${rows[i].id}`)
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

export async function getSingleMentalProblem(req, res) {
  try {
    const params = [req.params.mental_problem_id];
    const stmnt = db.prepare(`SELECT * FROM mentalProblems where id = ?`);
    const row = stmnt.get(params);
    const jsonToSend = {
      meta: {
        name: "Mental problem",
        title: "Specific mental problem",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: row
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}