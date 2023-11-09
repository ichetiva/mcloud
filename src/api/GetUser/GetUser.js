import axios from 'axios';

const GetUser = (Action) => {
  return (
    axios.get('https://ichetiva.ru/api/users/me', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
        console.log(response)
        
      })
      .catch(function (error) {
      Action()
      }));
  
};

export default GetUser