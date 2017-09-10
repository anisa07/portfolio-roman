import axios from 'axios';

function getDataFromServer(route) {
    let url = "http://" + window.location.hostname + (window.location.port !== "" ? ":" + window.location.port : "") + "/" + route;

    return axios.get(url)
        // .then(res => {
        //     console.log(res);
        //     //console.log(window.location.hostname + (window.location.port !== "" ? ":" + window.location.port : "") );
        //
        //     //  this.setState({ data: res.data });
        // })
}


export {getDataFromServer};