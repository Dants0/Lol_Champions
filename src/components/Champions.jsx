import React, { useState } from 'react'
import axios from 'axios'
import './champions.css'
import Jinx from '../assets/jinxlogo.png'
import GitHub from '../assets/GitHub-Mark-32px.png'
import LinkedIn from '../assets/icons8-linkedin-48.png'
import ImageSlider from './ImageSlider'

const Champions = () => {



    const [searchText, setSearchText] = useState('');
    const [champion, setChampion] = useState({});
    const [skin, setSkin] = useState([]);
    const [spells, setSpeels] = useState([]);


    async function searchChampion(e) {
        let ApiCall = `http://ddragon.leagueoflegends.com/cdn/12.14.1/data/pt_BR/champion/${searchText}.json`
        if (searchText == false || champion == null) {
            alert('Adicione um nome!');
        } else if (champion.id == '') {
            alert('Campeão não existe!');
        }
        else {
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
    }

    const splashArt = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name + '_0'}.jpg`

    const urlSkin = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}`

    const squareSkin = `http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/${champion.name}`

    const takeSkins = skin.map(id => id.num)

    console.log(spells)

    console.log(takeSkins)

    const slides = [
        { url: urlSkin + `_${takeSkins[1]}.jpg`, title: 'skin1' },
        { url: urlSkin + `_${takeSkins[2]}.jpg`, title: 'skin2' },
        { url: urlSkin + `_${takeSkins[3]}.jpg`, title: 'skin3' },
        { url: urlSkin + `_${takeSkins[4]}.jpg`, title: 'skin4' },
    ];

    const containerStyles = {
        width: "500px",
        height: "280px",
        margin: "0 auto",
    };

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
                            <div className="wrapper">
                                <div className="contentChampion">
                                    <h1 className="titleChampion">Campeão encontrado</h1>
                                    <span>Nome: {champion.id}</span>
                                    <span>Titulo: {champion.title}</span>
                                    <img src={splashArt} alt="SplashArt" className="splashArtImg" />
                                </div>
                                <div className="infos">
                                    <img src={squareSkin + '.png'} alt="" className='LogoChampion' />
                                    <p className='loreChampion'>Lore: {champion.lore}</p>
                                    <p>Estilo De Jogo: {champion.tags[0]}</p>
                                    <p>Nome da Passiva: {champion.passive.name}</p>
                                    <p>Descrição da Passiva: {champion.passive.description}</p>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/12.14.1/img/passive/${champion.image.full}`} alt="" />
                                    <p>Habilidade_1: {spells[0].name}</p>
                                    <p>Habilidade_2: {spells[1].name}</p>
                                    <p>Habilidade_3: {spells[2].name}</p>
                                    <p>Ultimate: {spells[3].name + '. ' + spells[3].description}</p>
                                    <p>Estilo De Jogo: {champion.tags}</p>
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
                                            <div style={containerStyles}>
                                                <ImageSlider slides={slides}></ImageSlider>
                                            </div>
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

                            <div className="box">
                                <div className="github">
                                    <a href="https://github.com/Dants0"><img src={GitHub} alt="" className="links" /></a>
                                </div>
                                <div className="linkedin">
                                    <a href="https://www.linkedin.com/in/guilherme-góes-8b72531b0/"><img src={LinkedIn} alt="" className="links" /></a>
                                </div>
                            </div>
                            <footer className="footer">
                                <h3>Não tem conta no jogo?</h3>
                                <a href="https://signup.leagueoflegends.com/pt-br/signup/index#/"><button className='registerBtn'>Cadastre-se agora</button></a>
                            </footer>
                        </>
                }
            </div>
        </>
    )
}

export default Champions