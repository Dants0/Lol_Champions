import React, { useState } from 'react'
import axios from 'axios'
import './champions.css'
import Jinx from '../assets/jinxlogo.png'

const Champions = () => {
    const [searchText, setSearchText] = useState('');
    const [champion, setChampion] = useState({});
    const [skin, setSkin] = useState([]);
    const [spells, setSpeels] = useState([]);


    async function searchChampion(e) {
        let ApiCall = `http://ddragon.leagueoflegends.com/cdn/12.14.1/data/pt_BR/champion/${searchText}.json`

        await axios.get(ApiCall).then(function (response) {
            const data = response.data.data[`${searchText}`]
            console.log(data)
            setChampion(data)
            setSkin(data.skins)
            setSpeels(data.spells)
        }).catch(err => {
            console.log(err);
        });
    }

    const splashArt = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name + '_0'}.jpg`

    const urlSkin = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}`

    const squareSkin = `http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/${champion.name}`

    console.log(spells)
    
    return (
        <>
            <div className="container">
                <div className="header">
                    <h1>Lolkipedia</h1>
                    <img src={Jinx} alt="" className="Logo" />
                </div>
                <input type="text" placeholder="Nome do Campeão" onChange={e => setSearchText(e.target.value)} className="championSearch" />
                <button onClick={e => searchChampion(e)} className="btnSearch">Status Do Campeão</button>
            </div>
            <div className="championStatus">
                {
                    JSON.stringify(champion) != '{}' ?

                        <>
                            <div className="contentChampion">
                                <h1 className="titleChampion">Campeão encontrado</h1>
                                <span>Nome: {champion.id}</span>
                                <span>Titulo: {champion.title}</span>
                                <img src={splashArt} alt="SplashArt" className="splashArtImg" />
                                <div className="infos">
                                    <span>Lore: {champion.lore}</span>
                                    <h2>Estilo De Jogo: {champion.tags[0]}</h2>
                                    <img src={squareSkin + '.png'} alt="" className='LogoChampion' />
                                    <h2>Nome da Passiva: {champion.passive.name}</h2>
                                    <h2>Descrição da Passiva: {champion.passive.description}</h2>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/12.14.1/img/passive/${champion.image.full}`} alt="" />
                                    <h2>Habilidade_1: {spells[0].name}</h2>
                                    <h2>Habilidade_2: {spells[1].name}</h2>
                                    <h2>Habilidade_3: {spells[2].name}</h2>
                                    <h2>Ultimate: {spells[3].name + '. ' + spells[3].description}</h2>
                                    <h2>Estilo De Jogo: {champion.tags}</h2>
                                </div>
                            </div>

                            <div className="estrategy">
                                <h2>Estratégias Jogando Contra</h2>
                                <ul>
                                    <li>{champion.enemytips[0]}</li>
                                    <li>{champion.enemytips[1]}</li>
                                </ul>
                            </div>

                            <div className="estrategy">
                                <h2>Estratégias Jogando A Favor</h2>
                                <ul>
                                    <li>{champion.allytips[0]}</li>
                                    <li>{champion.allytips[1]}</li>
                                </ul>
                            </div>

                            <div className="contentSkins">
                                <h2>Skins</h2>
                                {

                                    JSON.stringify(skin) != [] ?

                                        <>
                                            <img src={urlSkin + `_${skin[2].num}.jpg`} alt="" className="splashArtImg" />
                                            <img src={urlSkin + `_${skin[1].num}.jpg`} alt="" className="splashArtImg" />
                                            <img src={urlSkin + `_${skin[3].num}.jpg`} alt="" className="splashArtImg" />
                                        </>
                                        :
                                        <>
                                            <p>Sem Skin Recente</p>
                                        </>

                                }

                            </div>
                        </>

                        :

                        <>



                        </>
                }
            </div>
        </>
    )
}

export default Champions