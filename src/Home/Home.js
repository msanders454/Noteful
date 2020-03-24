import React from 'react';
import SideBar from '../SideBar/SideBar';
import MainPage from '../MainPage/MainPage';
import './Home.css';
import PropTypes from 'prop-types';

function Home(props){
    console.log(props);
    return(     
        <div>    
            <div className="container">
                < SideBar/>
                < MainPage notes={props.notes}/>
            </div>
        </div>    
    )
}

export default Home;

Home.propType = {
    notes: PropTypes.number
};