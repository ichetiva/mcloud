import axios from 'axios';

const GetUser = ({setUser}) => {
  return (
    axios.get('http://94.198.219.99:8000/api/users/me', {
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