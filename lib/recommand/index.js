const jieba = require('nodejieba');
const fs = require('fs');
const path = require('path');
const { Classifier, DataSet, Document } = require('dclassify');

function readDocs() {
  const srcPath = path.resolve(__dirname, 'data');
  const folders = fs.readdirSync(srcPath)
    .filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());
  const docs = folders.reduce((docs, folder) => {
    const files = fs.readdirSync(path.join(srcPath, folder));
    return docs.concat(files.map(file => {
      const text = fs.readFileSync(path.join(srcPath, folder, file), 'utf-8');
      const keywords = jieba.extract(text, 15)
        .map(item => item.word);
      return {
        id: parseInt(file),
        tag: folder,
        keywords,
      };
    }));
  }, []);
  return docs;
}

function createClassifier() {
  const file = path.resolve(__dirname, 'data/bayes.json');
  if (fs.existsSync(file)) {
    // reload
    const probabilities = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const classifier = new Classifier({ applyInverse: true });
    classifier.probabilities = probabilities;
    return classifier;
  }
  else {
    // create new classifier
    const data = new DataSet();
    trainDocs.forEach((doc, i) => {
      const document = new Document(i + '', doc.keywords);
      data.add(doc.tag, [document]);
    });

    const classifier = new Classifier({ applyInverse: true });
    classifier.train(data);
    return classifier;
  }
}

let docs = readDocs();
// console.log(docs);
let trainDocs = docs.filter(doc => doc.id % 8 !== 0);
let testDocs = docs.filter(doc => doc.id % 8 === 0);

let classifier = createClassifier();
console.log(classifier.probabilities);
testDocs.forEach(testDoc => {
  const { tag, keywords, id } = testDoc;
  const result = classifier.classify(new Document(id + '', keywords));
  // console.log(tag, keywords, result);
});
