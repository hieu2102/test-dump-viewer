// ==UserScript==
// @name         examTopic_getDump
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.examtopics.com/exams/*
// @grant        none
// ==/UserScript==

(function() {
	//    'use strict';
	var qs = Array.from(document.getElementsByClassName('card-body question-body'));

	qs.forEach(x => {
		try {
			var choices_box = x.getElementsByClassName('question-choices-container')[0]
			var answer = []
			var choices = Array.from(choices_box.getElementsByTagName('li')).map(c => {
				if (c.className == 'multi-choice-item correct-hidden') {
					answer.push(c.getElementsByClassName('multi-choice-letter')[0].innerText)
				}
				return c.innerText
			})
			var s = {
				'question': x.getElementsByClassName('card-text')[0].innerText,
				'choices': choices,
				'answer': answer
			}
			console.log(JSON.stringify(s))
		} catch (err) {
			// do nothing
		}
	})

})();