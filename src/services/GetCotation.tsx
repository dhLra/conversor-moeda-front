import axios from "axios";

export default async function getCotation(from: string, to: string) {
    var options = {
        method: 'GET',
        url: `https://economia.awesomeapi.com.br/last/${from}-${to}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.request(options).then(function (response) {
        return response;
    }).catch(function (error) {
        console.error(error.response);
        return error.response;
    });
    
    return response
}