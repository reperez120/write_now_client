import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./SentenceGeneratorPage.css"

class SentenceGeneratorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        genre: '',
        firstArticle: '',
        subjectAdjective: [],
        subject: [],
        verb: [],
        preposition: [],
        article: '',
        locationAdjective: [],
        location: [],
        punctuation: [],
        downloadPromptText: '',
        loading: false
      };
    }

    handleGenre = e => {
        this.setState({
            genre: e.target.value
        });
    } 
    
    handleFormSubmit = e => {

        e.preventDefault()
        this.setState({ loading: true })

        const genre = this.state.genre;
        const options = {
            method: 'GET',
        }
        const url = 'https://calm-hamlet-15286.herokuapp.com/words?';
    
        function formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${params[key]}`)
        return queryItems.join('&');
        }

        let getVerb = () => {
            const verbUrl = url + 'type=verb'    
             fetch(verbUrl,  options)
             .then(response => response.json())
                 .then(data => {
                     let ver = data[Math.floor(Math.random() * data.length)]
                     let verb = ver.word   
                     this.setState({
                         verb,
                     })
                 })
        }
 
        let getPrep = () => {
            const prepUrl = url + 'type=preposition';       
            fetch(prepUrl,  options)
                .then(response => response.json())
                    .then(data => {
                        let prep = data[Math.floor(Math.random() * data.length)]
                        let preposition = prep.word   
                        this.setState({
                            preposition,
                        })
                    })
        }

        if (this.state.genre === 'wildcard') {

            let getWildSubAdj = () => {
                const wildSubAdjUrl = url + 'type=sub-adj'    
                fetch(wildSubAdjUrl,  options)
                .then(response => response.json())
                    .then(data => {
                        let subadj = data[Math.floor(Math.random() * data.length)]
                        let subjectAdjective = subadj.word   
                        this.setState({
                            subjectAdjective,
                        })
                    })
            }

            let getWildSubject = () => {
                const wildSubUrl = url + 'type=subject'    
                fetch(wildSubUrl,  options)
                .then(response => response.json())
                    .then(data => {
                        let sub = data[Math.floor(Math.random() * data.length)]
                        let subject = sub.word   
                        this.setState({
                            subject,
                        })
                    })
            }

            let getWildLocAdj = () => {
                const wildLocAdjUrl = url + 'type=loc-adj'    
                fetch(wildLocAdjUrl,  options)
                .then(response => response.json())
                    .then(data => {
                        let locAdj = data[Math.floor(Math.random() * data.length)]
                        let locationAdjective = locAdj.word   
                        this.setState({
                        locationAdjective,
                        })
                    })
            }

            let getWildLoc = () => {
            const wildLocUrl = url + 'type=location'    
                fetch(wildLocUrl,  options)
                .then(response => response.json())
                    .then(data => {
                        let loc = data[Math.floor(Math.random() * data.length)]
                        let location = loc.word   
                        this.setState({
                        location,
                        })
                })
            }
                

         let getWildCard = () => {
            getWildSubAdj();
            getWildSubject();
            getWildLocAdj();
            getVerb();
            getPrep();
            getWildLocAdj();
            getWildLoc();  
            this.setState({
                firstArticle: 'The',
                article: 'the',
                punctuation: '.',
                loading: false,
                downloadPromptText: 'Download prompt as TXT file.',
            })                 
            }

            getWildCard();

        } else {

        let getSubAdj = () => {
            const subAdj = 'sub-adj'
            const SubAdjParams = {
                type: subAdj,
                genre: genre,
            }
            const subAdjQueryString = formatQueryParams(SubAdjParams);
            const subAdjUrl = url + subAdjQueryString;
            fetch(subAdjUrl,  options)
                .then(response => response.json())
                    .then(data => {
                        let subAdj = data[Math.floor(Math.random() * data.length)]
                        let subjectAdjective = subAdj.word   
                        this.setState({
                            subjectAdjective,
                        })
                    })
        }

        let getSubject = () => {         
            const sub = 'subject'  
            const subParams = {
                type: sub,
                genre: genre,
            }
            const subQueryString = formatQueryParams(subParams);
             const subUrl = url + subQueryString;
            fetch(subUrl,  options)
                .then(response => response.json())
                    .then(data => {
                        let sub = data[Math.floor(Math.random() * data.length)]
                        let subject = sub.word   
                        this.setState({
                            subject,
                        })
                    })
        }

        let getLocAdj = () => {
            const locAdj = 'loc-adj'
            const locAdjParams = {
                type: locAdj,
                genre: genre,
            }
            const locAdjQueryString = formatQueryParams(locAdjParams);
            const locAdjUrl = url + locAdjQueryString;
            fetch(locAdjUrl,  options)
                .then(response => response.json())
                    .then(data => {
                        let locadj = data[Math.floor(Math.random() * data.length)]
                        let locationAdjective = locadj.word   
                        this.setState({
                            locationAdjective,
                        })
                  })
        }

        let getLoc = () => {
            const location = 'location'
            const locParams = {
                type: location,
                genre: genre,
            }
            const locQueryString = formatQueryParams(locParams);
            const locUrl = url + locQueryString;
            console.log(locUrl);
            fetch(locUrl,  options)
                .then(response => response.json())
                    .then(data => {
                        let loc = data[Math.floor(Math.random() * data.length)]
                        let location = loc.word   
                        this.setState({
                            location,
                        })
                    })
        }

        let getPrompt = () =>  {
            getSubAdj();
            getSubject();
            getVerb();
            getPrep();
            getLocAdj();
            getLoc();    
            this.setState({
                firstArticle: 'The',
                article: 'the',
                punctuation: '.',
                loading: false,
                downloadPromptText: 'Download prompt as TXT file.',
            })
        }

        getPrompt();
        }
    }

    downloadPrompt = () => {
        const element = document.createElement("a");
        const file = new Blob([document.getElementById('promptDownload').value], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "WriteNowPrompt.txt";
        document.body.appendChild(element); 
        element.click();
    }

    render() {

        const firstArt = this.state.firstArticle;
        const subadj = this.state.subjectAdjective; 
        const sub = this.state.subject;
        const verb = this.state.verb;
        const prep = this.state.preposition; 
        const art = this.state.article;
        const locadj = this.state.locationAdjective;
        const loc = this.state.location;
        const punct = this.state.punctuation;
        const space = ' '

      return (
          
        <div className='SentenceGenerator'>
            <header className='appHeader'>
                <h3 className='description'>
                    Select a genre. Then click the "write now" button to get a writing prompt in that genre. 
                    Select "wild card" or click on the "write now" button without selecting anything to 
                    get a sentence that combines elements from all the genres.
                </h3>
            </header>
            <main> 
                    <form className='radioform' onSubmit={this.handleFormSubmit}>
                    <div className='radioButtons'>
                        <label>
                        <div className="img1"></div>
                            <input type="radio" className="radio" value="scifi" name="option" 
                                checked={this.state.genre === 'scifi'}
                                onChange={this.handleGenre}/> 
                            Sci-Fi 
                        </label>
                        <label>
                        <div className="img2"></div>
                            <input type="radio" className="radio" value="fantasy" name="option" 
                                checked={this.state.genre === 'fantasy'}
                                onChange={this.handleGenre}/> 
                            Fantasy
                        </label>
                        <label>
                        <div className="img3"></div>
                            <input type="radio" className="radio" value="horror" name="option" 
                                checked={this.state.genre === 'horror'}
                                onChange={this.handleGenre}/> 
                            Horror
                        </label>
                        <label>
                        <div className="img4"></div>
                            <input type="radio" className="radio" value="western" name="option" 
                                checked={this.state.genre === 'western'}
                                onChange={this.handleGenre}/> 
                            Western
                        </label>
                        <label>
                        <div className="img5"></div>
                            <input type="radio" className="radio" value="lit" name="option" 
                            checked={this.state.genre === 'lit'}
                            onChange={this.handleGenre}/> 
                            General Lit
                        </label>
                        <label>
                            <input type="radio" className="radio" value="wildcard" name="option" 
                            checked={this.state.genre === 'wildcard'}
                            onChange={this.handleGenre}/> 
                            Wild Card!
                        </label>
                        </div>
                    <button type='submit'>
                        Write now!
                    </button>  
                    <Link to="/">
                        <button>
                            Home
                        </button>  
                    </Link>  
                    </form>
                    {this.state.loading ? <h1>Loading...</h1>: null}
                    <h3 id="promptSentence">
                        {this.state.firstArticle} {this.state.subjectAdjective} {this.state.subject} {this.state.verb} {this.state.preposition} {this.state.article} {this.state.locationAdjective} {this.state.location}{this.state.punctuation}
                    </h3>   
                    <input 
                        id="promptDownload" 
                        value={firstArt + space + subadj  + space + sub  + space + verb + space + prep  + space + art + space + locadj + space + loc + punct} 
                    /> 
                     <button className="downloadButton"
                        onClick={this.downloadPrompt}>
                        {this.state.downloadPromptText}
                    </button>
            </main>
       </div>
      );
    } 
  }

  export default SentenceGeneratorPage;
