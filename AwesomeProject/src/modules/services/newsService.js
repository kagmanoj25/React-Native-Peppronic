
import * as apiEndpoints from './ApiConfig';

// This File Contains 


// var url = `${apiEndpoints.api}/top-headlines?country=${apiEndpoints.country}&page=1&pagesize=10&apiKey=${apiEndpoints.key}`;
var url = apiEndpoints.api + '/top-headlines?country=' + apiEndpoints.country + '&page=1&pagesize=20&apiKey=' + apiEndpoints.key
export const getnews = () => {
    return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=22a1f0ba6fae4c339754b3d4d530c2d4')
        .then(response => response.json())
}