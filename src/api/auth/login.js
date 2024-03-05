import axios from 'axios';

const LoginPost = ( username, password, UserNameFormat) => {
  return (
    axios.post('http://94.198.219.99:8000/api/auth/token', {
        login: username,
        password: password,
        login_type: UserNameFormat
      }, {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(function (response) {
        localStorage.setItem('Token' , `${response.data.access_token}`)
        console.log(localStorage.getItem('Token'))
      })
      .catch(function (error) {
        console.log(username , UserNameFormat, password)
        console.log(error);
      }));
  ;
};

export default LoginPost