import AM from './AnswersModule.js';

export function isSurveyAnswered(ResultsState) {
    return isPage1QuestionsAnswered(ResultsState) && isPage2QuestionsAnswered(ResultsState) && ResultsState['completed'] === true;
}

export function isPage1QuestionsAnswered(ResultsState) {
    return ResultsState !== undefined && ResultsState['Q1'] !== undefined;
}

export function isPage2QuestionsAnswered(ResultsState) {
    let result = ResultsState !== undefined && ResultsState['Q3'] !== undefined && 
        ResultsState['Q4'] !== undefined && ResultsState['Q5'] !== undefined;
    if(result) {
        for(let a=0; a<AM.Q5ANSWERS.length; a++) {
            result = ResultsState['Q5'][a] !== undefined;
            if(!result) {
                break;
            }
        }
    }
    return result;
}

export default isSurveyAnswered;