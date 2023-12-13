import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';


export default function HelloReact() {
    const [usuario, setUsuario] = useState();
    const [cadastrar, setCadastrar] = useState(true);
    const [setor, setSetor] = useState('');
    const [listaCadastro, setListaCadastro] = useState([]);


    const [selectedDate, setSelectedDate] = useState('');

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
                console.log(`Esta é a lista filtrada ${listaFiltrada}`);
                setListaCadastro(listaFiltrada);
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
      


    function gravar(){
        if(!nome||!email||!setor){
            alert('Favor colocar todos os dados!')
        }else{
            const lista = [...listaCadastro, {nome: nome, email: email, setor: setor, administrador: usuario}];
            setListaCadastro(lista);
            console.log(lista);

    axios.post('/cadastrar-usuario', {nome: nome, email: email, setor: setor, administrador: usuario})
      .then(response => {
        console.log('Usuário cadastrado com sucesso:', response.data);
        // Lidar com a resposta do servidor após o cadastro ser realizado com sucesso
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

        console.log(nota1);
        function avaliar(){
            // const novoObjeto = { ...listaCadastro[0], outraChave: { atributo1: 'valor1', atributo2: 'valor2' } };
            // const novaLista = [...listaCadastro.slice(0, 1), novoObjeto, ...listaCadastro.slice(1)];
            // setListaCadastro(novaLista);
            // console.log(novaLista);

            const media = (parseInt(nota1)+parseInt(nota2)+parseInt(nota3)+parseInt(nota4)+parseInt(nota5)+parseInt(nota6)+parseInt(nota7)+parseInt(nota8)+parseInt(nota9)+parseInt(nota10))/10;
            console.log(media);

          
        };
    
        const formatBrazilianDate = (date) => {
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
          };




    return (
        <>
           {usuario}

           {/* Seleciona se vai cadastrar ou fazer o feedback */}
           <select class="form-select" aria-label="Default select example" onChange={e=>setCadastrar(e.currentTarget.value)} >
                <option selected>Escolha a opção</option>
                <option value="true">Cadastrar funcionário</option>
                <option value="false">Fornecer feedback</option>
            </select>

            {cadastrar==='true'&&<>
            <div class="mb-1 mt-6">
                <label for="exampleFormControlInput1" class="form-label">Nome</label>
                <input class="form-control" id="exampleFormControlInput1" placeholder="Colocar o nome do funcionário" value={nome} onChange={e=>setNome(e.currentTarget.value)}/>
            </div>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">E-mail</label>
                <input class="form-control" type='email' onChange={e=>setEmail(e.currentTarget.value)} value={email} id="exampleFormControlInput1" placeholder="Colocar o e-mail de contato"/>
            </div>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Setor</label>
                <select class="form-select" aria-label="Default select example" onChange={e=>setSetor(e.currentTarget.value)} value={setor}>
                    <option selected>Escolha a opção</option>
                    <option value="Setor A">Setor A</option>
                    <option value="Setor B">Setor B</option>
                </select>
            </div>

            <button type="button" class="btn btn-primary" onClick={gravar}>Gravar</button>
       
            {listaCadastro.length > 0 && listaCadastro.map((item, index) => (
                <div key={index}>
                    <p>Nome: {item.nome}</p>
                    <p>Email: {item.email}</p>
                    <p>Setor: {item.setor}</p>
                    <p>Administrador: {item.administrador}</p>
                </div>
            ))}
            </>}

            {cadastrar==='false'&&
            <>
                <div class="mb-5 mt-6">
                    <label for="exampleFormControlInput1" class="form-label">Qual foi o desempenho do colaborador no trabalho?</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder={consideracao} onChange={e=>setNota1(e.currentTarget.value)}/>
                </div>

                <div class="mb-5">
                    <label for="exampleFormControlInput1" class="form-label">Como estão as habilidades técnicas e conhecimento?</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder={tecnico} onChange={e=>setNota2(e.currentTarget.value)}/>
                </div>

                <div class="mb-5">
                    <label for="exampleFormControlInput1" class="form-label">Como está o comportamento profissional?</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder={profissional} onChange={e=>setNota3(e.currentTarget.value)}/>
                </div>

                <div class="mb-5">
                    <label for="exampleFormControlInput1" class="form-label">Como estão as habilidades interpessoais?</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder={interpessoal} onChange={e=>setNota4(e.currentTarget.value)}/>
                </div>

                <div class="mb-5">
                    <label for="exampleFormControlInput1" class="form-label">O colaborador tem iniciativa e responsabilidade?</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder={iniciativa} onChange={e=>setNota5(e.currentTarget.value)}/>
                </div>

                <div class="mb-5">
                    <label for="exampleFormControlInput1" class="form-label">É adaptável e flexível?</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder={adaptavel} onChange={e=>setNota6(e.currentTarget.value)}/>
                </div>

                <div class="mb-5">
                    <label for="exampleFormControlInput1" class="form-label">É pontual?</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder={pontualidade} onChange={e=>setNota7(e.currentTarget.value)}/>
                </div>

                <div class="mb-5">
                    <label for="exampleFormControlInput1" class="form-label">É alinhado com os objetivos e metas da empresa?</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder={objetivo} onChange={e=>setNota8(e.currentTarget.value)}/>
                </div>

                <div class="mb-5">
                    <label for="exampleFormControlInput1" class="form-label">É aberto para os feedbacks?</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder={feedback} onChange={e=>setNota9(e.currentTarget.value)}/>
                </div>

                <div class="mb-5">
                    <label for="exampleFormControlInput1" class="form-label">Busca o desenvolvimento profissional?</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder={desenvolvimento} onChange={e=>setNota10(e.currentTarget.value)}/>
                </div>

                <input type="date" id="data-pagamento" name="data_pagamento" value={selectedDate} 
                onChange={e=>setSelectedDate(e.currentTarget.value)} class="form-control" />

                <p>Selected Date: {selectedDate?formatBrazilianDate(selectedDate):''}</p>

                <button type="button" class="btn btn-primary" onClick={avaliar}>Avaliar Profissional</button>
            </>}
        </>
    );
}

if (document.getElementById('hello-react')) {
    ReactDOM.render(<HelloReact />, document.getElementById('hello-react'));
}