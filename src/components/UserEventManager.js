import React from 'react';
import EventPreview from './EventPreview';

export default class UserEventManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      	events: []
    };
    this.getEvents = this.getEvents.bind(this);
    this.getEvents();
  }

  getEvents() {
    axios.get('/events/' + this.props.params.id)
      .then(function(response) {
        console.log("GET EVENTLIST: "+JSON.stringify(response.data));
        this.setState({events: response.data});
      }.bind(this))
      .catch(function(error){
        console.log(error.message);
      }.bind(this)); 
  }

  // componentDidMount() {
  //   axios.get('/events/' + {this.props.params.id})
  //     	.then(function(response) {
  //     		console.log(response.data);
  //     		this.setState({events: response.data})
  //     	});
  // }

	render() {
    return (
    <div className="panel-group">
      {
            this.state.events.map((eventPreview, i) => {
              return (
                <EventPreview
                  eventPreview={eventPreview}
                  key={`event-${i}`}
                />
              );
            })
          }
        </div>
    );
	}
}