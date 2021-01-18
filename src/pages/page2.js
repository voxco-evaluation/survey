import '../App.css';
import React, {useContext, useEffect} from 'react';
import {Button, Dropdown, DropdownButton} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {ResultsContext} from '../Store.js'
import AM from '../AnswersModule.js';
import ThankYou from '../comps/ThankYou.js';
import {isSurveyAnswered, isPage2QuestionsAnswered} from '../Functions.js';
import StarRatings from 'react-star-ratings';
import Cookies from 'universal-cookie';


const Page2 = () => {

    const [ResultsState, setResultsState] = useContext(ResultsContext);

    const Q3ANSWERS = AM.Q3ANSWERS.map((answer, idx) => {
        if(ResultsState !== undefined && ResultsState['Q3'] === answer) {
            return <Dropdown.Item active key={idx} eventKey={answer}>{answer}</Dropdown.Item>
        } else {
            return <Dropdown.Item key={idx} eventKey={answer}>{answer}</Dropdown.Item>
        }
    });

    const Q5ANSWERS = AM.Q5ANSWERS.map((answer, idx) => { 
        return <div key={idx} className='row'><div className="col-xl-2 col-lg-2 col-md-2 divStarRatingAnswers" ><label>{answer}</label></div><div className="col-xl-10 col-lg-10 col-md-10"><StarRatings numberOfStars={5} id={'answer-' + (idx + 1)} starRatedColor="yellow" name={idx.toString()} changeRating={(newRating, name) => {setQ5Answer(newRating, name)}} rating={(ResultsState !== undefined && ResultsState['Q5'] !== undefined ? ResultsState['Q5'][idx] : 0)} /></div></div>
    });

    function setQ3Answer(val, ev) {
        if(val !== undefined) {
            let tmpResultsState = {...ResultsState};
            tmpResultsState['Q3'] = val;
            setResultsState(tmpResultsState);
        }
    }

    function setQ4Answer(val) {
        if(val !== undefined) {
            let tmpResultsState = {...ResultsState};
            tmpResultsState['Q4'] = val;
            setResultsState(tmpResultsState);
        }
    }

    function setQ5Answer(newRating, name) {
        if(newRating !== undefined && name !== undefined) {
            let tmpResultsState = {...ResultsState};
            if(tmpResultsState['Q5'] === undefined) {
                tmpResultsState['Q5'] = {};
            }
            tmpResultsState['Q5'][name] = newRating;
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
                    <h3>3. From which country does your coffee come from?</h3>
                    <div className='divAnswers'>
                        <DropdownButton size="md" onSelect={(val, ev) => setQ3Answer(val, ev)} name="Q3" title={(ResultsState === undefined || ResultsState['Q3'] === undefined ? 'Choose a country' : ResultsState['Q3'])}>
                            {Q3ANSWERS}
                        </DropdownButton>              
                    </div>   
                    <br></br>
                    <h3>4. What's your maximum number of cups of coffee per day?</h3>
                    <div className='divAnswers'>
                        <input className="form-control" onChange={(ev) => setQ4Answer(ev.currentTarget.value)} style={{width: '110px'}} value={(ResultsState === undefined || ResultsState['Q4'] === undefined ? '' : ResultsState['Q4'])} type="textbox"></input>
                    </div>   
                    <br></br>
                    <h3>5. Rate the following types of coffee.</h3>
                    {Q5ANSWERS}
                    <br></br>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6  col-xs-6" style={{textAlign: 'left'}}>
                            <Link to="/Page1"><Button onClick={() => window.scrollTo(0,0)}>Previous</Button></Link>
                        </div>  
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6  col-xs-6" style={{textAlign: 'right'}}>
                            {(isPage2QuestionsAnswered(ResultsState) ? <Link to="/Page3"><Button onClick={() => window.scrollTo(0,0)}>Next</Button></Link> : <Button>Please answer all questions</Button>)}
                        </div>  
                    </div>  
                </div>
                <br></br>  
            </div>     
        </div>
    );
}

export default Page2;