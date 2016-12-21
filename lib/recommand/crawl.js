const zhihu = require('zhihu');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

function delay(millis = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, millis);
  });
}

function saveAnswer(topic, text, name) {
  const folder = path.join(DATA_DIR, topic);
  const file = path.join(folder, name);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  fs.writeFile(file, text, 'utf8', () => {});
}

async function crawlQuestions(questions, limit, topicName) {
  console.log('\nStart to crawl questions');
  const regex = /([^\/]*)$/;
  let numValid = 0;
  for (let question of questions) {
    const url = question.url;
    const id = regex.exec(url)[0];

    try {
      await delay();
      const answers = await zhihu.Question.answers(id);
      const validAnswers = answers.filter(answer => answer.voters > 10 && answer.text.length > 280);
      for (let answer of validAnswers) {
        if (++numValid > limit) return;
        saveAnswer(topicName, answer.text, '' + numValid);
        console.log(`\nAnswer found ${numValid}`);
      }
      if (!validAnswers.length) {
        process.stdout.write('.');
      }
    } catch (e) {
      console.log(e.message, question);
    }
  };
  return result;
}

async function gatherQuestions(topicId, offset, limit) {
  let questions = [];
  const topic = await zhihu.Topic.getTopicByID(topicId);

  // start from page 1000
  console.log(`\nStart to gather questions under topic ${topic.name}`);
  for (let page = offset; page < offset + limit; page++) {
    await delay();
    const topic = await zhihu.Topic.getTopicByID(topicId, page + offset);
    for (let i in topic.questions) {
      questions.push(topic.questions[i]);
    }
    process.stdout.write('.');
  }
  console.log(`\n${questions.length} questions found`);
  return questions;
}

async function crawlTopic(topicId) {
  const topic = await zhihu.Topic.getTopicByID(topicId);
  const pageOffset = 1000;
  const pageLimit = Math.min(200, topic.totalpage - pageOffset);

  const questions = await gatherQuestions(topicId, pageOffset, pageLimit);
  await crawlQuestions(questions, 200, topic.name);
}

async function crawl() {
  const topics = {
    // sports: 19554827,
    // travel: 19551556,
    law: 19550874,
    finance: 19609455,
    physics: 19556950,
    film: 19550429
  };
  for (let name in topics) {
    await crawlTopic(topics[name]);
  }
}

crawl();
// crawlTopic(19609455);
