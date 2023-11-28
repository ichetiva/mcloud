import axios from 'axios';

const GetUser = ({setUser}) => {
  return (
    axios.get('https://ichetiva.ru/api/users/me', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
           setUser(response)
      })
      .catch(function (error) {
      
      
      }));
  
};

export default GetUser