import {PageHeader, Grid, Row, Col, Thumbnail, Pagination, PaginationItem, PaginationLink} from 'react-bootstrap';
import {getDataFromServer} from '../javascripts/getDataFromServer';

function GridCell(props) {
    return (
        <Col xs={12} md={4} className="custom-col">
            <Thumbnail src={props.data.img} alt="242x200" className="event">
                <h4>{props.data.name}
                    <small> {props.data.date}</small>
                </h4>
                <p>{props.data.city}</p>
                <p>{props.data.descr}</p>
                <a href={props.data.link}>More details ...</a>
            </Thumbnail>
        </Col>
    )
}

class PaginationAdvanced extends React.Component{
    constructor(props) {
        super(props);
        this.state = {activePage: 1};
        this.handleSelect = this.handleSelect.bind(this);
        this.loadPastEvents = this.props.onLoadPast.bind(null);
    }

    componentDidMount() {
        return {
            activePage: this.props.active_page
        };
    }

    handleSelect(eventKey) {
        this.loadPastEvents(eventKey);

        this.setState({
            activePage: eventKey
        });
    }

    render() {
        return (
            <Pagination
                style = {{display: this.props.num_of_pages === 1 ? 'none' : ''}}
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={this.props.num_of_pages}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.handleSelect} />
        );
    }
};

export class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {future_events: [], past_events: [], num_of_pages: 1, active_page: 1};
        this.loadFutureEventsDataFromServer = this.loadFutureEventsDataFromServer.bind(this);
        this.loadNumOfPages = this.loadNumOfPages.bind(this);
        this.loadPastEvents = this.loadPastEvents.bind(this);
    }

    loadFutureEventsDataFromServer() {
        getDataFromServer("futureevents").then(res => {
            this.setState({future_events: res.data});
        })
    }

    loadNumOfPages() {
        getDataFromServer("getnumofpages").then(res => {
            this.setState({num_of_pages: res.data});
        })
    }

    loadPastEvents(page){
        getDataFromServer("pastevents/" + page).then(res => {
            this.setState({past_events: res.data});
        })
    }

    componentDidMount() {
        this.loadFutureEventsDataFromServer();
        this.loadNumOfPages();
        this.loadPastEvents(this.state.active_page);
    }

    render() {
        return (
            <div className="container common_component common-title" id="events">
                <PageHeader className="text-center">Events</PageHeader>
                <div style={{display: this.state.future_events.length === 0 ? 'none' : ''}}>
                    <h3>Future events</h3>
                    <Grid>
                        <Row>
                            {
                                this.state.future_events.map(function (event, i) {
                                    return (
                                        <GridCell data={event} key={i}/>
                                    )
                                })
                            }
                        </Row>
                    </Grid>
                </div>

                <div style={{display: this.state.past_events.length === 0 ? 'none' : ''}}>
                    <h3>Past events</h3>
                    <Grid>
                        <Row>
                            {
                                this.state.past_events.map(function (event, i) {
                                    return (
                                        <GridCell data={event} key={i}/>
                                    )
                                })
                            }
                        </Row>
                    </Grid>
                    <PaginationAdvanced num_of_pages = {this.state.num_of_pages}
                                        active_page = {this.state.active_page}
                                        onLoadPast = {this.loadPastEvents}/>
                </div>
            </div>
        )
    }
}