import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./LandingPage.css"

class LandingPage extends Component {
    render() {
      return (
        <div className='LandingPage'>
          <header className='appHeader'>
          <div className='image'>
           </div>
          </header>
            <main> 
                <div className='logoImage'>
                </div>
                <h2>A Writing Prompt App</h2>

                <h3>
                    Suffering from writer's block? 
                    Write Now is here to help! 
                    This app generates writing prompts based on your genre selection.
                </h3>
                <form className='entry-form'>
                    <Link to="/sentence-generator">
                        <button type='submit'>Write now!</button> 
                    </Link>   
                </form>
            </main>
       </div>
      );
    } 
  }
  
  export default LandingPage;
