import '../App.css';
import {ResultsContext} from '../Store.js'
import React, {useContext, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import ThankYou from '../comps/ThankYou.js';
import {isSurveyAnswered, isPage1QuestionsAnswered, isPage2QuestionsAnswered} from '../Functions.js';

const Page3 = () => {

    const [ResultsState, setResultsState] = useContext(ResultsContext);

    function submitSurvey() {

        if(isPage1QuestionsAnswered(ResultsState) && isPage2QuestionsAnswered(ResultsState)) {

            // Here the data in ResultsState should be formatted and stored through API
            // For this example, data is only stored in cookies for simplicity

            let tmpResultsState = {...ResultsState};
            tmpResultsState['completed'] = true;
            setResultsState(tmpResultsState);

        }

    }

    function setQ6Answer(val) {

        if(val !== undefined && ResultsState !== undefined) {
            let tmpResultsState = {...ResultsState};
            tmpResultsState['Q6'] = val;
            setResultsState(tmpResultsState);
        }

    }

    useEffect(() => {

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
                <div className='divAnswersContainer'>
                    <h3>6. Do you have any suggestions to improve this survey?</h3>
                    <div className='divAnswers'>
                        <textarea name="Q6" value={(ResultsState !== undefined && ResultsState['Q6'] !== undefined ? ResultsState['Q6'] : '')} onChange={(ev) => setQ6Answer(ev.currentTarget.value)} rows="5" cols="60"></textarea>
                    </div>       
                    <br></br> 
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6  col-xs-6" style={{textAlign: 'left'}}>
                            <Link to="/Page2"><Button onClick={() => window.scrollTo(0,0)}>Previous</Button></Link>
                        </div>  
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6  col-xs-6" style={{textAlign: 'right'}}>
                            <Button onClick={() =>submitSurvey()}>Submit</Button>
                        </div>  
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Page3;