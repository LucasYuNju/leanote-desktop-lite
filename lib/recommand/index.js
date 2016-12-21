const jieba = require('nodejieba');
const fs = require('fs');
const path = require('path');
const { Classifier, DataSet, Document } = require('dclassify');

function readNotes() {
  const srcPath = path.resolve(__dirname, 'notes');
  const folders = fs.readdirSync(srcPath)
    .filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());
  const notes = folders.reduce((notes, folder) => {
    const files = fs.readdirSync(path.join(srcPath, folder));
    const newNotes = files.map(file => {
      const text = fs.readFileSync(path.join(srcPath, folder, file), 'utf-8');
      return {
        tags: [folder],
        text,
      };
    });
    return notes.concat(newNotes);
  }, []);

  notes.forEach(note => {
    const pairs = jieba.extract(note.text, 6);
    const totalWeight = pairs.reduce((sum, pair) => sum + pair.weight, 0) || 1;
    note.keywords = pairs.reduce((res, pair) => {
      const { word, weight } = pair;
      res[word] = weight / totalWeight;
      return res;
    }, {});
    delete note.text;
  });

  return notes;
}

function createClassifier() {
  const notes = readNotes();
  // console.log('notes', notes);

  const data = new DataSet();
  notes.forEach((note, i) => {
    note.tags.forEach((tag, j) => {
      const doc = new Document(i, Object.keys(note.keywords));
      data.add(tag, [doc]);
    });
  });

  const classifier = new Classifier({ applyInverse: false });
  classifier.train(data);
  return classifier;
}

function createClassifierIfNecessary() {
  const file = path.resolve(__dirname, 'bayes.json');
  if (fs.existsSync(file)) {
    const probabilities = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const classifier = new Classifier({ applyInverse: false });
    classifier.probabilities = probabilities;
    return classifier;
  }
  else {
    return createClassifier();
  }
}

let classifier = createClassifierIfNecessary();


const testDoc = new Document('testDoc', ['函数', 'function']);
console.log(classifier.classify(testDoc));
