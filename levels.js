exports.levels = {
	warmup: { interval: 60 / 3, rightAnswer: 0, wrongAnswer: 0, error: 0 },
	easy: { interval: 60 / 3, rightAnswer: 10, wrongAnswer: -1, error: -1 },
	medium: { interval: 60 / 4, rightAnswer: 5, wrongAnswer: -5, error: -10 },
	hard: { interval: 60 / 10, rightAnswer: 5, wrongAnswer: -5, error: -10 }
};