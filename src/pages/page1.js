import '../App.css';
import React, {useContext, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {ResultsContext} from '../Store.js'
import AM from '../AnswersModule.js';
import ThankYou from '../comps/ThankYou.js';
import {isSurveyAnswered, isPage1QuestionsAnswered} from '../Functions.js';
import Cookies from 'universal-cookie';

const Page1 = (props) => {

    const [ResultsState, setResultsState] = useContext(ResultsContext);

    function setResults(q, val, added) {

        if(q !== undefined && val !== undefined) {
            let tmpResultsState = {...ResultsState};
            switch(q) {
                case 'Q1': // Single Answer
                    tmpResultsState[q] = val;
                    break;
                case 'Q2': // Multiple Answers
                    if(tmpResultsState[q] === undefined) {
                        tmpResultsState[q] = (val !== undefined ? val : '');
                    } else {
                        let tempResultsArray = tmpResultsState[q].split(',');
                        if(tempResultsArray.includes(val)) {
                            if(!added) {
                                // Checkbox unchecked, we remove the value from the results
                                for(let q=0; q<tempResultsArray.length; q++) {
                                    if(tempResultsArray[q] === val) {
                                        tempResultsArray.splice(q, 1);
                                        break;
                                    }
                                }
                            }
                        } else {
                            if(added) {
                                // Checkbox checked, we add the value to the results
                                tempResultsArray.push(val);
                            }
                        }
                        tmpResultsState[q] = tempResultsArray.join(',');
                    }
                    break;
                default:
                    break;
            }
            setResultsState(tmpResultsState);
        }

    }

    const Q1ANSWERS = AM.Q1ANSWERS.map((answer, idx) => { 
        if(ResultsState !== undefined && ResultsState['Q1'] === idx.toString()) {
            return <div><input checked type="radio" id={'answer-' + (idx + 1)} name="Q1" value={idx} onClick={(ev) => {setResults('Q1', ev.currentTarget.value, ev.currentTarget.checked);}}></input>&nbsp;<label for={'answer-' + (idx + 1)}>{answer}</label></div>   
        } else {
            return <div><input type="radio" id={'answer-' + (idx + 1)} name="Q1" value={idx} onClick={(ev) => {setResults('Q1', ev.currentTarget.value, ev.currentTarget.checked);}}></input>&nbsp;<label for={'answer-' + (idx + 1)}>{answer}</label></div>   
        }
    }); 

    const Q2ANSWERS = AM.Q2ANSWERS.map((answer, idx) => { 
        if(ResultsState !== undefined && ResultsState['Q2'] !== undefined && ResultsState['Q2'].split(',').includes(idx.toString())) {
            return <div><input type="checkbox" checked id={'answer-' + (idx + 1)} name="Q2" value={idx} onClick={(ev) => {setResults('Q2', ev.currentTarget.value, ev.currentTarget.checked);}}></input>&nbsp;<label for={'answer-' + (idx + 1)}>{answer}</label></div>
        } else {
            return <div><input type="checkbox" id={'answer-' + (idx + 1)} name="Q2" value={idx} onClick={(ev) => {setResults('Q2', ev.currentTarget.value, ev.currentTarget.checked);}}></input>&nbsp;<label for={'answer-' + (idx + 1)}>{answer}</label></div>
        }
    }); 

    useEffect(() => {

        // Results are stored in cookies for simplicity, data should be stored and accessed through proper API
        const cookie = new Cookies();
        let resultsCookie = cookie.get('resultsCookie');
        if(resultsCookie !== undefined && Object.keys(resultsCookie).length > 0 && ResultsState === undefined) {
            setResultsState(resultsCookie);
        } else if(ResultsState !== undefined) {
            cookie.set('resultsCookie', ResultsState, {sameSite: true});
        }        

    });

    return (
        <div>
            <div style={{display: (isSurveyAnswered(ResultsState) ? 'block' : 'none')}}><ThankYou /></div>
            <div style={{display: (!isSurveyAnswered(ResultsState) ? 'block' : 'none')}}>
                <h2>Welcome to the Coffee Survey!<br></br>This survey will ask you a few questions about your coffee habits.</h2>
                <br></br>
                <div className='divAnswersContainer'>
                    <h3>1. How many coffees did you take today?</h3>
                    <div className='divAnswers'>
                        {Q1ANSWERS}
                    </div>       
                    <br></br>
                    <h3>2. What do you put in your coffee?</h3>
                    <div className='divAnswers'>
                        {Q2ANSWERS}
                    </div>     
                    <div style={{textAlign: 'right'}}>
                        {(isPage1QuestionsAnswered(ResultsState) ? <Link to="/Page2"><Button onClick={() => window.scrollTo(0,0)}>Next</Button></Link> : <Button>Please answer all questions</Button>)}
                    </div>  
                </div>
                <br></br>
            </div>
        </div>
    );
}

export default Page1;