import axios from 'axios';

const TokenCheck = (Action) => {
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

export default TokenCheck