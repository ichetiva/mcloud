
import axios from 'axios';


const RegistrationPost = (username , mail, password ) => {
  return (
    axios.post('https://ichetiva.ru/api/users/', {
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
