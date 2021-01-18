import {ResultsContext} from '../Store.js'
import React, {useContext} from 'react';
import ReactHtmlParser from 'react-html-parser';
import AM from '../AnswersModule.js';

const Results = () => {

    const [ResultsState, setResultsState] = useContext(ResultsContext);

    let resultList = '';

    let resultDisplay = {};
    if(ResultsState !== undefined) {

        let resultQ2 = '';
        if(ResultsState['Q2'] !== undefined) {
                
            let tmpArrQ2 = ResultsState['Q2'].split(',');
            for(let a=0; a<tmpArrQ2.length; a++) {
                if(tmpArrQ2[a] !== '') {
                    if(resultQ2 !== '') {
                        resultQ2 += ', ';
                    }
                    resultQ2 += AM.Q2ANSWERS[tmpArrQ2[a]];
                }
            }
        }
        if(resultQ2 === '') {
            resultQ2 = '---';
        }

        let resultQ5 = '';
        if(ResultsState['Q5'] !== undefined) {
            for(let a=0; a<Object.keys(ResultsState['Q5']).length; a++) {
                if(resultQ5 !== '') {
                    resultQ5 += '<br />';
                }
                resultQ5 += AM.Q5ANSWERS[a] + ': ' + ResultsState['Q5'][a] + '/5';
            }
        }

        resultDisplay = {
            '1. How many coffees did you take today?': AM.Q1ANSWERS[ResultsState['Q1']],
            '2. What do you put in your coffee?': resultQ2,
            '3. From which country does your coffee come from?': ResultsState['Q3'],
            '4. What\'s your maximum number of cups of coffee per day?': ResultsState['Q4'],
            '5. Rate the following types of coffee.': resultQ5,
            '6. Do you have any suggestions to improve this survey?': (ResultsState['Q6'] !== undefined ? ResultsState['Q6'] : '---')
        };

    }

    for(let l=0;l<Object.keys(resultDisplay).length; l++) {
        resultList += '<div style="margin-bottom:10px"><h4>' + Object.keys(resultDisplay)[l] + '</h4><span>' + Object.values(resultDisplay)[l] + '</span></div>'
    }

    return (
        <div>
            <h2>Results</h2>
            <br></br>
            <div>{ReactHtmlParser(resultList)}</div>
        </div>
    );
}

export default Results;
