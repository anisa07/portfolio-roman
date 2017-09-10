import { Media, Image, PageHeader } from 'react-bootstrap';
import { getDataFromServer } from '../javascripts/getDataFromServer';

class AboutMe extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: { works: [] } };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
    }
    loadDataFromServer() {
        getDataFromServer("aboutme").then(res => {
            this.setState({ data: res.data[0] });
        })
    }

    componentDidMount() {
        this.loadDataFromServer();
    }


    render() {
        return (
            <div className="container common_component common-title" id="aboutme">
                <PageHeader className="text-center">About me</PageHeader>
                <p className="about">{this.state.data.descr}</p>
                <ul>
                    {
                        this.state.data.works.map(function (item, i) {
                            return (
                                <li key={item}>{item}</li>
                            )
                        })
                    }
                </ul>
                <p className="about">{this.state.data.descr2}</p>
            </div>
        )
    }
}

export { AboutMe }