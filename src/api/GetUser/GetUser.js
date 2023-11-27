import axios from 'axios';

const GetUser = (Action , refresh) => {
  return (
    axios.get('https://ichetiva.ru/api/users/me', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
        
        
      })
      .catch(function (error) {
      Action()
      

      }));
  
};

export default GetUser