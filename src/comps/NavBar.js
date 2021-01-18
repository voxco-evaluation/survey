import {ButtonGroup, Button} from 'react-bootstrap';
import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ResultsContext} from '../Store.js'
import {isSurveyAnswered, isPage1QuestionsAnswered, isPage2QuestionsAnswered} from '../Functions.js';

const NavBar = () => {

    const [ResultsState, setResultsState] = useContext(ResultsContext);

    return (
        <div className="NavBar" style={{display: (isSurveyAnswered(ResultsState) ? 'none' : 'block')}}>
            <ButtonGroup size="lg" className="mb-2">
                <Button><Link to="/Page1">Page #1</Link></Button>
                {(isPage1QuestionsAnswered(ResultsState) ? <Button><Link to="/Page2">Page #2</Link></Button> : '')}
                {(isPage2QuestionsAnswered(ResultsState) ? <Button><Link to="/Page3">Page #3</Link></Button> : '')}
            </ButtonGroup>
        </div>
    );
}

export default NavBar;