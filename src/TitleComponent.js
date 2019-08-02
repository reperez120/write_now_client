import React from 'react'
import ReactDOM from 'react-dom'


class Doc extends React.Component{
  componentDidMount(){
    document.title = "Write Now"
  }

  render(){
    return(
      <b> test </b>
    )
  }
}

ReactDOM.render(
  <Doc />,
  document.getElementById('container')
);