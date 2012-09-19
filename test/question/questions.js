var Assert = require('assert');
var Questions = require('../../lib/question/questions');

var dummy = new Questions.DummyQuestion();
Assert.ok(dummy.isAnswerCorrect('asdf'), "A Dummy todo le viene bien");
Assert.ok(!dummy.isAnswerCorrect(''), "A Dummy todo le viene bien, salvo texto vacío");

var suma = new Questions.SumaQuestion(1, 2);
Assert.ok(suma.isAnswerCorrect(3), "Ejemplo simple de suma");
Assert.ok(suma.isAnswerCorrect('3'), "Ejemplo simple de suma con string");
Assert.ok(!suma.isAnswerCorrect(4), "Error simple en la suma");
var suma = new Questions.SumaQuestion(7, 2);
Assert.ok(suma.isAnswerCorrect(9), "Otro ejemplo simple de suma");
Assert.ok(!suma.isAnswerCorrect('asdfa'), "Error enviando strings como la suma");
Assert.ok(!suma.isAnswerCorrect(10), "Otro error simple en la suma");

var conversor = new Questions.MetrosAPulgadas(1);
Assert.ok(conversor.isAnswerCorrect(39.3701), "Conversión simple");
Assert.ok(conversor.isAnswerCorrect('39.3701'), "Conversión con string");
Assert.ok(conversor.isAnswerCorrect(39.37), "Conversión pifiando por poco");
Assert.ok(!conversor.isAnswerCorrect(80), "Conversión pifiando por mucho");
Assert.ok(!conversor.isAnswerCorrect('asdfa'), "Error enviando strings como pulgadas");
conversor = new Questions.MetrosAPulgadas(1/39.37);
Assert.ok(conversor.isAnswerCorrect(1), "Justo una pulgada");
conversor = new Questions.MetrosAPulgadas(53);
Assert.ok(conversor.isAnswerCorrect(53 * 39.37), "Muchas pulgada");

var estatica = new Questions.StaticQuestion('pregunta', 'respuesta');
Assert.ok(estatica.isAnswerCorrect('respuesta'), "Pregunta estática espera respuesta estática");
Assert.ok(!estatica.isAnswerCorrect('otra cosa'), "Pregunta estática espera sólo respuesta estática");
Assert.equal(estatica.getText(), 'pregunta', 'La pregunta es pregunta');