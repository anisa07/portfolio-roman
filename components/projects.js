import { Carousel, PageHeader, Panel } from 'react-bootstrap';
import { getDataFromServer } from '../javascripts/getDataFromServer';

class Projects extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
    }

    loadDataFromServer() {
        getDataFromServer("projectlist").then(res => {
            this.setState({ data: res.data.reverse() });
        })
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    render() {
        return (
            <div className="container common_component common-title" id="projects">
                <PageHeader className="text-center">My projects</PageHeader>
                {
                    this.state.data.map(function (project) {
                        return(
                            <Panel key={project.name} header={project.name}>
                                <p>{project.descr}</p>
                                <p>Project URL <a href={project.link}>{project.name}</a></p>
                            </Panel>
                        )
                    })
                }
                {/* {
                    <Carousel className="carousel-custom">
                        { this.state.data.map(function (project, i) {
                            return (
                                <Carousel.Item key={project.name}>
                                    <img width={900} height={500} alt="900x500" src={project.img}/>
                                    <Carousel.Caption>
                                        <h3>{project.name}</h3>
                                        <p>{project.descr}</p>
                                        <a href={project.link}>More details...</a>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )

                        })}
                    </Carousel>
                } */}
            </div>
        )
    }
}

export { Projects }