import { Media, Image, PageHeader } from 'react-bootstrap';
import { getDataFromServer } from '../javascripts/getDataFromServer';

class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data1: [],
            data2: []
        };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
    }

    loadDataFromServer() {
        getDataFromServer("contactlist").then(res => {
            let len = parseInt(res.data.length / 2);
            this.setState({
                data1: res.data.slice(0, len),
                data2: res.data.slice(len)
            });
        })
    }

    componentDidMount() {
        this.loadDataFromServer();
    }


    render() {
        return (
            <div className="container common_component common-title" id="contacts">
                <PageHeader className="text-center">My contacts</PageHeader>
                <div className="contacts">
                    <div>
                        {
                            this.state.data1.map(function (contact, i) {
                                {
                                    return (
                                        <Media key={contact.name}>
                                            <Media.Left align="middle">
                                                <Image width={32} height={32} src={contact.img} alt="Image" rounded />
                                            </Media.Left>
                                            <Media.Body>
                                                <Media.Heading>{contact.name}</Media.Heading>
                                                <a href={contact.link}>{contact.link}</a>
                                            </Media.Body>
                                        </Media>
                                    )
                                }
                            })
                        }
                    </div>
                    <div>{
                        this.state.data2.map(function (contact, i) {
                            {
                                return (
                                    <Media key={contact.name}>
                                        <Media.Left align="middle">
                                            <Image width={32} height={32} src={contact.img} alt="Image" rounded />
                                        </Media.Left>
                                        <Media.Body>
                                            <Media.Heading>{contact.name}</Media.Heading>
                                            <a href={contact.link}>{contact.link}</a>
                                        </Media.Body>
                                    </Media>
                                )
                            }
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export { Contacts };