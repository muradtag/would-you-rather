import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";

export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

export function handleInitialData() {
	return (dispatch) => {
		return getInitialData().then(({ users, questions }) => {
			dispatch(receiveUsers(users));
			dispatch(receiveQuestions(questions));
			dispatch(setAuthedUser(null));
		});
	};
}

function addAnswer(authedUser, qid, answer) {
	return {
		type: ADD_ANSWER,
		authedUser,
		qid,
		answer,
	};
}

export function handleAddAnswer(authedUser, qid, answer) {
	return (dispatch) => {
		return saveQuestionAnswer({ authedUser, qid, answer })
			.then(dispatch(addAnswer(authedUser, qid, answer)))
			.catch((e) => console.warn("Error saving answer. Please try again.", e));
	};
}

function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
	return (dispatch) => {
		return saveQuestion({ optionOneText, optionTwoText, author }).then(
			(question) => {
				dispatch(addQuestion(question));
			}
		);
	};
}
