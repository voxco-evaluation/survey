import {Button} from 'react-bootstrap';
import {useState, useContext} from 'react';
import Results from '../comps/Results.js';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {ResultsContext} from '../Store.js'

const ThankYou = () => {

    const [ResultsState, setResultsState] = useContext(ResultsContext);
    const [ShowResultsState, setShowResultsState] = useState(false);
    const cookie = new Cookies();

    function restartSurvey() {
        cookie.remove('resultsCookie');
        setResultsState(undefined); 
    }

    return (
        <div>
            {(cookie.get('resultsCookie') === undefined || ResultsState === undefined ? <Redirect to={{pathname: "/Page1", query: {'doRestart': true}}} /> : '')}
            {( ShowResultsState !== undefined && ShowResultsState ? <Results /> : <h2 style={{paddingTop: '50px', paddingBottom: '30px'}}>Thank you for answering our survey!</h2>)}
            <div className="row" style={{alignItems: 'center'}}>
                <div className={(ShowResultsState !== undefined && ShowResultsState ? "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" : "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6")} style={{textAlign: 'center'}}>
                    <Button onClick={() => { window.scrollTo(0,0); restartSurvey()}}>Restart Survey</Button>
                </div>
                <div style={{display: (ShowResultsState !== undefined && ShowResultsState ? 'none' : 'block' ), textAlign: 'center'}} className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <Button onClick={() => setShowResultsState(true)}>Show Results</Button>
                </div>
            </div>
        </div>
    );
}

export default ThankYou;
