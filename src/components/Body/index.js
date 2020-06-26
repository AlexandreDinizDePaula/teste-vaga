import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import axios from 'axios';


export default function Body() {

    //Cria um variável(state) chamada response que só pode ser alterada através do setResponse
    const[resBrazil, setResBrazil] = useState([]);
    const[resWorld, setResWorld] = useState([]);
    const[resRanking, setResRanking] = useState([]);
    const[ranking, setRanking] = useState([]);
    const[count, setCount] = useState(0);
    //Nesse caso do useEffect, ele vai executar a função uma única vez quando a página for renderizada.
    //Está fazendo um requisição GET e colocando na variável response a última posição do array através
    // da função pop().
    useEffect(() =>{

        api.get('/total/country/brazil').then(res => setResBrazil(res.data.pop()))

        //OBS: As vezes os dados mostram 0, pois a última posição está sendo atualizada na API

        //Nesse caso a API já fornece os dados totais de uma vez, não há necessidade de pegar o último dado 
        //do array
        api.get('/world/total').then(res => setResWorld(res.data))


        //Não encontrei na API recomendada uma maneira de fazer um ranking, por isso utilizei outra
        axios.get('https://covid19-brazil-api.now.sh/api/report/v1/countries')
        .then(res => setResRanking(res.data.data))
    },[]);


    //Neste UseEffect, estou ordenando a resposta da API de acordo quantidade de casos com o sort()
    //e limitando o array as 5 primeiras posições
    useEffect(() => {
        
        var newRanking = resRanking;
        newRanking.sort(function (a,b){
            if(a.cases > b.cases){
                return -1
            }
            if(a.cases < b.cases){
                return 1
            }
            return 0
        }).splice(5, Number.POSITIVE_INFINITY);    
        
        setRanking(newRanking);

        }, [resRanking]);

    return (

        <body className="body-container">
            
            <section className="project">
                <p>
                    Projeto Front-End para concorrer a uma vaga na xxxx que
                    consiste em:  <br />
                    - Um dashboard informativo monstrando alguns dados do COVID-19 no Brasil
                    e no Mundo em tempo real( fornecido por uma API ). <br />
                    - Feito com framework ReactJS
                    - Dados retirados da API https://covid19api.com
                </p>

            </section>

            <section className="main">

                <div>

                    <h2>
                        Brasil
                    </h2>

                    <ul className="cases">

                        <li className="cases-item-confirmed">
                            <p>Casos confirmados</p>
                            <span>{resBrazil.Confirmed}</span>
                        </li>
                        <li className="cases-item-recovered">
                            <p>Casos recuperados</p>
                            <span>{resBrazil.Recovered}</span>
                        </li>
                        <li className="cases-item-deaths">
                            <p>Mortes confirmadas</p>
                            <span>{resBrazil.Deaths}</span>
                        </li>
                    </ul>

                    <h2>
                        Mundo
                    </h2>

                    <ul className="cases">

                        <li className="cases-item-confirmed">
                            <p>Casos confirmados</p>
                            <span>{resWorld.TotalConfirmed}</span>
                        </li>
                        <li className="cases-item-recovered">
                            <p>Casos recuperados</p>
                            <span>{resWorld.TotalRecovered}</span>
                        </li>
                        <li className="cases-item-deaths">
                            <p>Mortes confirmadas</p>
                            <span>{resWorld.TotalDeaths}</span>
                        </li>
                    </ul>

                </div>

                <div className="ranking">
                    <h2 className="ranking-title">Ranking</h2>
                    <ul>
                        {   
                            ranking.map(item=>(
                            <li>
                                {item.country}
                            </li>
                        ))}
                       
                    </ul>
                    
                </div>

            </section>
            
        </body>
    
    )
}