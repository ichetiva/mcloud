
import axios from 'axios';

const RegistrationPost = (username , mail, password ) => {
  return (
    axios.post('https://ichetiva.ru/api/users/sign_up', {
        username: username,
        email: mail,
        password: password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(username , mail, password)
        console.log(error);
      }));
  ;
};

export default RegistrationPost