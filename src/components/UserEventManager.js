import React from 'react';
import EventPreview from './EventPreview';
import axios from "axios";

export default class UserEventManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      	events: [],
        hostevents: []
    };
    this.getEvents = this.getEvents.bind(this);
    this.getEvents();
    this.getHostedEvents = this.getHostedEvents.bind(this);
    this.getHostedEvents();
  }

  /*
  * Makes the ajax call to the server to retrieve all events that 
  * the user has participated in, and will participate in.
  */
  getEvents() {
      axios.get('/events/' + this.props.username.userID)
        .then(function(response) {
          console.log("GET EVENTLIST: "+JSON.stringify(response.data));
          this.setState({events: response.data});
        }.bind(this))
        .catch(function(error){
          console.log(error.message);
        }.bind(this)); 
  }

  getHostedEvents() {
      axios.get('/events?type=hosted&username='+this.props.username.userID)
            .then(function(response) {
                this.setState({hostevents: response.data})
            }.bind(this))
            .catch(function(error){
              console.log(error.message);
            }.bind(this));
  }

  /*
  * Feeds the events retrieved from the ajax call to the eventpreview for it 
  * to display previews of the events
  */
	render() {
    return (
      <div className="container">
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
        <div className="panel-group">
            {
                this.state.hostevents.map((eventPreview, i) => {
                    return (
                        <EventPreview eventPreview={eventPreview}
                          key={`event-${i}`}
                        />
                    );
                })
            }
        </div>
      </div>
    );
	}
}