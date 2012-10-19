console.log('Corriendo tests...');

require('./test/question/questions');
console.log('Questions OK');

require('./test/question/questionManager');
console.log('Question Manager OK');

require('./test/playerManager');
console.log('Player manager OK');

console.log('Tests OK');