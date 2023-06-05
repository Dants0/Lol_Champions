import React, { useRef, useState } from 'react'
import axios from 'axios'
import './champions.css'
import Jinx from '../assets/jinxlogo.png'
import GitHub from '../assets/GitHub-Mark-32px.png'
import LinkedIn from '../assets/icons8-linkedin-48.png'
import ImageSlider from './ImageSlider'
import Modal from './Modal/Modal'
// import Modal_2 from './Modal/Modal_2'
import Titles from './Titles.js'


const Champions = (props) => {

    const [show, setShow] = useState(false);
    const [nextShow, setNextShow] = useState(false);
    const [continueShow, setContinueShow] = useState(false);
    const [finalShow, setFinalShow] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [champion, setChampion] = useState({});
    const [skin, setSkin] = useState([]);
    const [spells, setSpeels] = useState([]);


    async function searchChampion(e) {
        let ApiCall = `https://ddragon.leagueoflegends.com/cdn/12.14.1/data/pt_BR/champion/${searchText}.json`
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

    const splashArt = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name + '_0'}.jpg`

    const urlSkin = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}`

    const squareSkin = `https://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/${champion.name}`

    const takeSkins = skin.map(id => id.num)

    const slides = [
        { url: urlSkin + `_${takeSkins[1]}.jpg`, title: 'skin1' },
        { url: urlSkin + `_${takeSkins[2]}.jpg`, title: 'skin2' },
        { url: urlSkin + `_${takeSkins[3]}.jpg`, title: 'skin3' },
        { url: urlSkin + `_${takeSkins[4]}.jpg`, title: 'skin4' },
    ];

    const containerStyles = {
        width: "1550px",
        height: "900px",
        margin: "0 auto",
    };

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

                <div className="testModal">

                </div>
            </div>
            <div className="championStatus">
                {
                    JSON.stringify(champion) != '{}' ?

                        <>

                            <div className="wrapper">
                                <div className="contentChampion">
                                    <div className="firstContentChampion">
                                        <h1 className="titleChampion">Campeão encontrado</h1>
                                        <span>Nome: {champion.id}</span>
                                        <span>Titulo: {champion.title}</span>
                                        <img src={splashArt} alt="SplashArt" className="splashArtImg" />
                                    </div>
                                    <div className="statusChampion">
                                        <span>Vida: {champion.stats.hp}</span>
                                        <span>Vida por level: {champion.stats.hpperlevel}</span>
                                        <span>Regeneração de vida: {champion.stats.hpregen}</span>
                                        <span>Armadura: {champion.stats.armor}</span>
                                        <span>Armadura por Level: {champion.stats.armorperlevel}</span>
                                        <span>Dano: {champion.stats.attackdamage}</span>
                                        <span>Velocidade de Ataque: {champion.stats.attackspeed}</span>
                                        <span>Velocidade de Ataque por level: {champion.stats.attackspeedperlevel}</span>
                                        <span>Alcance de Ataque: {champion.stats.attackrange}</span>
                                        <span>Velocidade de Movimento: {champion.stats.movespeed}</span>
                                        <span>Ataque: {champion.info.attack}</span>
                                        <span>Defesa: {champion.info.defense}</span>
                                        <span>Dificuldade: {champion.info.difficulty}</span>
                                        <span>Magia: {champion.info.magic}</span>
                                    </div>
                                </div>



                                <div className="infos">
                                    <div className="loreAndPhoto">
                                        <img src={squareSkin + '.png'} alt="" className='LogoChampion' />
                                        <p className='loreChampion'>Lore: {champion.lore}</p>
                                    </div>
                                    <div className="introInfo">
                                        <p>Estilo De Jogo: {champion.tags[0]}</p>
                                        <p>Nome da Passiva: {champion.passive.name}</p>
                                        <p>Custo: {champion.partype}</p>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/12.14.1/img/passive/${champion.passive.image.full}`} alt="" className='logoSpells' />
                                        <p>Descrição da Passiva: <span>{champion.passive.description}</span></p>
                                    </div>
                                    <div className="spells">
                                        <span>Q: {spells[0].name}</span>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/${spells[0].id}.png`} alt="" className='logoSpells' onClick={() => setShow(true)} />
                                        <Modal title={spells[0].name} onClose={() => setShow(false)} show={show} >
                                            <span className='descModalSpan'>Q: {spells[0].description}</span>
                                        </Modal>

                                        <span>W: {spells[1].name}</span>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/${spells[1].id}.png`} alt="" className='logoSpells' onClick={() => setNextShow(true)} />
                                        <Modal title={spells[1].name} onClose={() => setNextShow(false)} show={nextShow}>
                                            <span className='descModalSpan'>W: {spells[1].description}</span>
                                        </Modal>

                                        <span>E: {spells[2].name}</span>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/${spells[2].id}.png`} alt="" className='logoSpells' onClick={() => setContinueShow(true)} />
                                        <Modal title={spells[2].name} onClose={() => setContinueShow(false)} show={continueShow}>
                                            <span className='descModalSpan'>E: {spells[2].description}</span>
                                        </Modal>

                                        <span>R: {spells[3].name}</span>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/${spells[3].id}.png`} alt="" className='logoSpells' onClick={() => setFinalShow(true)} />
                                        <Modal title={spells[3].name} onClose={() => setFinalShow(false)} show={finalShow}>
                                            <span className='descModalSpan'>R: {spells[3].description}</span>
                                        </Modal>

                                    </div>

                                </div>
                            </div>

                            <div className="estrategy">
                                <h2>Estratégias Jogando Contra</h2>
                                <ul>
                                    <li>{champion.enemytips[0]}</li>
                                    <li>{champion.enemytips[1]}</li>
                                </ul>
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