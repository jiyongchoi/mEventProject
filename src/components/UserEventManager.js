import React from 'react';
import UserEventManager from './UserEventManager';

export default class UserEventManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      	events: []
    };
  }

  componentDidMount() {
    axios.get('/events/' + {this.props.params.id})
      	.then(function(response) {
      		console.log(response.data);
      		this.setState({events: response.data})
      	});
  }

	render() {
		return (
			<UserEventManager events={this.state.events}/>
		);
	}
}