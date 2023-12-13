import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';

export default function HelloReact() {
    useEffect(()=>{
        axios.get('/user')
        .then(response => {
          // Os dados estão na propriedade 'data' da resposta
          console.log(response.data);
          
        });

    },[])



    return (
        <h1>Teste do hello!</h1>
    );
}

if (document.getElementById('hello-react')) {
    ReactDOM.render(<HelloReact />, document.getElementById('hello-react'));
}