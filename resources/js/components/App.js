import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';

export default function HelloReact() {
    const [usuario, setUsuario] = useState();

    useEffect(()=>{
        axios.get('/user')
        .then(response => {
          // Os dados estão na propriedade 'data' da resposta
          console.log(response.data.name);

          const usuarioLogado = response.data.name;
          setUsuario(usuarioLogado);
          

        });

    },[]);





    return (
        <>
            <h1>Teste do hello!</h1>
           {usuario}
        </>
    );
}

if (document.getElementById('hello-react')) {
    ReactDOM.render(<HelloReact />, document.getElementById('hello-react'));
}