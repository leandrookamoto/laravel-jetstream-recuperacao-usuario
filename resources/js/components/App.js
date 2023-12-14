import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';
import Chart from './Chart';


export default function HelloReact() {
    const [usuario, setUsuario] = useState();
    const [select, setSelect] = useState('cadastrar');
    const [setor, setSetor] = useState('');
    const [listaCadastro, setListaCadastro] = useState([]);
    const [mediaFinal, setMediaFinal] = useState([]);
    const [funcionario_selected, setFuncionario_selected] = useState('false');
    const [funcionario, setFuncionario] = useState('');
    const [dadosFuncionario, setDadosFuncionario] = useState([]);
    const [newId, setNewId] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [idFuncionario, setIdFuncionario] = useState(null);
    const [historico, setHistorico] = useState(false);

    
    //Configuração do ChartJS
    const data = {
        labels: mediaFinal?mediaFinal.map(item => item.data):[],
        datasets: [{
          label: 'Feedback',
          data: mediaFinal?mediaFinal.map(item => item.media):[],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

    //Variáveis para as notas
    const [nome, setNome] = useState('');
    const [email,setEmail]=useState('');
    const [nota1,setNota1]=useState('');
    const [nota2,setNota2]=useState('');
    const [nota3,setNota3]=useState('');
    const [nota4,setNota4]=useState('');
    const [nota5,setNota5]=useState('');
    const [nota6,setNota6]=useState('');
    const [nota7,setNota7]=useState('');
    const [nota8,setNota8]=useState('');
    const [nota9,setNota9]=useState('');
    const [nota10,setNota10]=useState('');


    //Variáveis para os placeholders
    const consideracao = 'Leve em consideração  a qualidade do trabalho realizado pelo funcionário, sua eficiência, precisão e produtividade.';
    const tecnico = 'Analise o conhecimento técnico específico necessário para o cargo e como o funcionário está aplicando essas habilidades no trabalho.';
    const profissional = ' Observe o profissionalismo do funcionário, incluindo sua ética de trabalho, relacionamento com colegas, atitude e comunicação.';
    const interpessoal = 'Considere como o funcionário se relaciona com os colegas, clientes ou superiores. Avalie suas habilidades de trabalho em equipe, empatia e capacidade de resolver conflitos.';
    const iniciativa ='Avalie se o funcionário demonstra proatividade, capacidade de assumir responsabilidades e ações independentes para melhorar processos ou resolver problemas.';
    const adaptavel = 'Considere a capacidade do funcionário de se adaptar a mudanças, lidar com novas situações e aprender com desafios.';
    const pontualidade = 'Avalie a pontualidade do funcionário, sua presença no trabalho, e se cumpre prazos e compromissos.';
    const objetivo = 'Verifique se o funcionário está alinhado com os objetivos da empresa e como suas ações contribuem para esses objetivos.';
    const feedback ='Analise como o funcionário lida com feedbacks anteriores e se ele implementou melhorias com base nessas sugestões.';
    const desenvolvimento = 'Considere se o funcionário está buscando oportunidades de desenvolvimento, como participação em treinamentos, workshops ou outras atividades para aprimorar suas habilidades.';






//Primeira requisição para a recuperação dos dados dos usuários ao inicializar o programa
    useEffect(() => {
        axios.get('/user')
          .then(response => {
            const usuarioLogado = response.data.name;
            setUsuario(usuarioLogado);
      
            // Segunda requisição feita após o sucesso da primeira
            axios.get('/cadastrados')
              .then(response => {
                const lista = response.data;
                const listaFiltrada = lista.filter(item => item.administrador === usuarioLogado);
                setListaCadastro(listaFiltrada);

                const id = response.data.length?lista[response.data.length-1].id:0;
                console.log(`Este é o id final: ${id}`)
                setNewId(id);
              })
              .catch(error => {
                // Tratar erros da segunda requisição, se necessário
                console.error('Erro na segunda requisição:', error);
              });
      
          })
          .catch(error => {
            // Tratar erros da primeira requisição, se necessário
            console.error('Erro na primeira requisição:', error);
          });
      }, []);


// //Requisição para atualização do gráfico toda vez que é atualizado a mediaFinal
//       useEffect(()=>{
//         axios.get('/user')
//   .then(response => {
//     const usuarioLogado = response.data.name;
//     setUsuario(usuarioLogado);

//     // Segunda requisição feita após o sucesso da primeira
//     axios.get('/cadastrados')
//       .then(response => {
//         const lista = response.data;
//         const listaFiltrada = lista.filter(item => item.administrador === usuarioLogado);
//         setListaCadastro(listaFiltrada);

//         const id = response.data.length?lista[response.data.length-1].id:0;
//         console.log(`Este é o id final: ${id}`)
//         setNewId(id);
//       })
//       .catch(error => {
//         // Tratar erros da segunda requisição, se necessário
//         console.error('Erro na segunda requisição:', error);
//       });

//   })
//   .catch(error => {
//     // Tratar erros da primeira requisição, se necessário
//     console.error('Erro na primeira requisição:', error);
//   });
//     },[mediaFinal]);
      


    function gravar(){
        if(!nome||!email||!setor){
            alert('Favor colocar todos os dados!')
        }else{
            const lista = [...listaCadastro, {nome: nome, email: email, setor: setor, administrador: usuario, id: newId}];
            setListaCadastro(lista);
            console.log(lista);
            setNewId(newId+1);
            

    axios.post('/cadastrar-usuario', {nome: nome, email: email, setor: setor, administrador: usuario})
      .then(response => {
        console.log('Usuário cadastrado com sucesso:', response.data);
        // Lidar com a resposta do servidor após o cadastro ser realizado com sucesso
      })
      axios.get('/cadastrados')
              .then(response => {
                const lista = response.data;
                const listaFiltrada = lista.filter(item => item.administrador === usuario);
                setListaCadastro(listaFiltrada);

                const id = response.data.length?lista[response.data.length-1].id:0;
                console.log(`Este é o id final: ${id}`)
                setIdFuncionario(id);
              })
              .catch(error => {
                // Tratar erros da segunda requisição, se necessário
                console.error('Erro na segunda requisição:', error);
              })

      .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
        // Lidar com erros que ocorreram durante o cadastro
      });
     }
            setNome('');
            setEmail('');
            setSetor('');
        };

        
        function avaliar(){
            const media = (parseInt(nota1)+parseInt(nota2)+parseInt(nota3)+parseInt(nota4)+parseInt(nota5)+parseInt(nota6)+parseInt(nota7)+parseInt(nota8)+parseInt(nota9)+parseInt(nota10))/10;

   
            console.log(mediaFinal);

            let array=[]
                array = [...mediaFinal?mediaFinal:array, {media:media, data: selectedDate}];
                setMediaFinal(array);
                console.table(array);


            axios.put(`/cadastro/${idFuncionario}/update-avaliacao`, { avaliacoes: array })
            .then(response => {
              console.log('Resposta do servidor:', response.data);
              // Aqui você pode atualizar o estado ou fazer outras ações com base na resposta
            })
            .catch(error => {
              console.error('Erro ao enviar requisição:', error);
            });




          
        };
    
        const formatBrazilianDate = (date) => {
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
          };

          function handleFuncionario(e) {
            const cadastroFuncionario = e.currentTarget.value;
            console.log(cadastroFuncionario)
            const novoDado = listaCadastro.filter((item) => item.nome === cadastroFuncionario);
            setDadosFuncionario(novoDado);
            setFuncionario('true');
            setIdFuncionario(novoDado.map((item) => item.id).join());

            console.log('Este é o idFuncionario '+novoDado.map((item) => item.id).join());
          
            const avaliacoes = novoDado.map((item) => item.avaliacoes);
          
            if (avaliacoes && avaliacoes.length > 0) {
              const parsedAvaliacoes = JSON.parse(avaliacoes[0]);
          
              setMediaFinal(parsedAvaliacoes);
          
              console.log('Handle está funcionando!');
              console.table(parsedAvaliacoes);
            } else {
              // Lidar com o cenário onde não há avaliações
              console.log('Não há avaliações disponíveis');
              setMediaFinal([]);
            }
          }
          



    return (
        <>
           Olá {usuario}. Seja bem vindo ao programa de feedbacks! Favor escolher uma das opções abaixo!

           {/* Seleciona se vai cadastrar ou fazer o feedback */}
           <select className="form-select " aria-label="Default select example" onChange={e=>setSelect(e.currentTarget.value)} >
                <option value="cadastrar" selected>Cadastrar funcionário</option>
                <option value="funcionario">Sistema de feedback</option>
            </select>

            {/* Aqui vai a parte do cadastro do funcionário */}
            {select==='cadastrar'&&<>
            <div className="card mt-5">
            <h5 class="card-header">Cadastro de funcionários</h5>
            <div className="card-body">
            <div className="mb-1 mt-6">
                <label htmlFor="exampleFormControlInput1" className="form-label">Nome</label>
                <input className="form-control" id="exampleFormControlInput1" placeholder="Colocar o nome do funcionário" value={nome} onChange={e=>setNome(e.currentTarget.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">E-mail</label>
                <input className="form-control" type='email' onChange={e=>setEmail(e.currentTarget.value)} value={email} id="exampleFormControlInput1" placeholder="Colocar o e-mail de contato"/>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Setor</label>
                <select className="form-select" aria-label="Default select example" onChange={e=>setSetor(e.currentTarget.value)} value={setor}>
                    <option selected>Escolha a opção</option>
                    <option value="Setor A">Setor A</option>
                    <option value="Setor B">Setor B</option>
                </select>
            </div>

            <button type="button" className="btn btn-primary" onClick={gravar}>Gravar</button>
            </div>
            </div>

            
       
            </>}

            {select==='funcionario'&&
            <>

            <div class="card mt-5">
                <h5 class="card-header">Sistema de feedback</h5>
                <div class="card-body">
                <select className="form-select mt-5 mb-3" aria-label="Default select example" onChange={handleFuncionario}>
                    <option selected>Escolha qual funcionário</option>
                    {listaCadastro.map((item,index)=><option key={index} value={item.nome}>
                        {item.nome}
                    </option>)}
                </select>
                {funcionario==='true'&&<>{dadosFuncionario.map((item, index)=><div className="list-group" key={index}>
                <div  className="list-group-item list-group-item-action active" aria-current="true">
                    Dados do funcionário
                </div>
                <div  className="list-group-item list-group-item-action"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
</svg> {item.nome}</div>
                <div  className="list-group-item list-group-item-action"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg> {item.email}</div>
                <div  className="list-group-item list-group-item-action"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
</svg> {item.setor}</div>
                <div  className="list-group-item list-group-item-action"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>
</svg> {item.administrador}</div>
                    
                    
                </div>)
                }
                
                <button type="button" className="btn btn-primary mt-3" onClick={()=>setFuncionario_selected('true')}>Avaliar</button>
                    <button type="button" className="btn btn-primary ml-3 mt-3" onClick={()=>setHistorico(true)}>Histórico</button>
                </>}

                {funcionario_selected==='true'&&
                <>
                <h3 className='mt-3'>Formulário para o feedback</h3>
                    <div className="mb-5 mt-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Qual foi o desempenho do colaborador no trabalho?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={consideracao} onChange={e=>setNota1(e.currentTarget.value)}/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Como estão as habilidades técnicas e conhecimento?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={tecnico} onChange={e=>setNota2(e.currentTarget.value)}/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Como está o comportamento profissional?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={profissional} onChange={e=>setNota3(e.currentTarget.value)}/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Como estão as habilidades interpessoais?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={interpessoal} onChange={e=>setNota4(e.currentTarget.value)}/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="exampleFormControlInput1" className="form-label">O colaborador tem iniciativa e responsabilidade?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={iniciativa} onChange={e=>setNota5(e.currentTarget.value)}/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="exampleFormControlInput1" className="form-label">É adaptável e flexível?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={adaptavel} onChange={e=>setNota6(e.currentTarget.value)}/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="exampleFormControlInput1" className="form-label">É pontual?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={pontualidade} onChange={e=>setNota7(e.currentTarget.value)}/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="exampleFormControlInput1" className="form-label">É alinhado com os objetivos e metas da empresa?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={objetivo} onChange={e=>setNota8(e.currentTarget.value)}/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="exampleFormControlInput1" className="form-label">É aberto para os feedbacks?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={feedback} onChange={e=>setNota9(e.currentTarget.value)}/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Busca o desenvolvimento profissional?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={desenvolvimento} onChange={e=>setNota10(e.currentTarget.value)}/>
                    </div>

                    <input type="date" id="data-pagamento" name="data_pagamento" value={selectedDate} 
                    onChange={e=>setSelectedDate(e.currentTarget.value)} className="form-control" />

                    <p>Selected Date: {selectedDate?formatBrazilianDate(selectedDate):''}</p>

                    <button type="button" className="btn btn-primary" onClick={avaliar}>Avaliar Profissional</button>
                    </>
                }
                </div>
                {historico&& <div className='m-3'><h3>Histórico de feedback</h3><Chart data={data}/></div>}
            </div>
            
            </>}
        </>
    );
}

if (document.getElementById('hello-react')) {
    ReactDOM.render(<HelloReact />, document.getElementById('hello-react'));
}