import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';


const TITLE = 'Write Now'

class Docc extends React.PureComponent {
  render () {
    return (
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        ...
      </>
    )
  }
}


// class Doc extends React.Component{
//   componentDidMount(){
//     document.title = "Write Now"
//   }

//   render(){
//     return(
//       <b> test </b>
//     )
//   }
// }

// ReactDOM.render(
//   <Doc />,
//   document.getElementById('container')
// );