import { getDataFromServer } from '../javascripts/getDataFromServer';
import { Jumbotron } from 'react-bootstrap';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: { experience: [] } };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
    }

    loadDataFromServer() {
        getDataFromServer("home").then(res => {
            this.setState({ data: res.data[0] });
        })
    }

    componentDidMount() {
        this.loadDataFromServer();
        //setInterval(this.loadTodosFromServer, this.props.pollInterval);
    }


    render() {
        return (
            <div className="common_component" id="home">
                <img src={'images/main.jpg'} className="mainImg" />
                <div className="cloud cloud2">
                    <img src={'images/cloud2.png'} className="cloudImg" />
                </div>
                <div className="cloud cloud3">
                    <img src={'images/cloud3.png'} className="cloudImg" />
                </div>
                <div className="cloud cloud5">
                    <img src={'images/cloud5.png'} className="cloudImg" />
                </div>
                <div className="cloud cloud6">
                    <img src={'images/cloud6.png'} className="cloudImg" />
                </div>
                <Jumbotron className="container" id="main-title">
                    <h1>Roman Y. Iovlev</h1>
                    <div className="title-container">
                        <img src={this.state.data.logo} className="mainPhoto"></img>
                        <div>
                            <h3>{this.state.data.slogan}</h3>
                            <p>{this.state.data.position}</p>
                            <ul>
                                {
                                    this.state.data.experience.map(function (item) {
                                        return (<li key={item}>{item}</li>)
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </Jumbotron>
            </div>

        );
    }
}

export { Home }