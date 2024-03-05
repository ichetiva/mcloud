
import axios from 'axios';


const RegistrationPost = (username , mail, password ) => {
  return (
    axios.post('http://94.198.219.99:8000/users/', {
      username: username,
      email: mail,
      password: password
    
      }, {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(function (response) {
        
      })
      .catch(function (error) {
        console.log(username , mail, password)
        console.log(error);
      }));
  ;
};

export default RegistrationPost
