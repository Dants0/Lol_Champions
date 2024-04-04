import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import JinxLogo from "../../assets/jinxlogo.png";
import GitHubMark from "../../assets/GitHub-Mark-32px.png";
import LinkedInIcon from "../../assets/icons8-linkedin-48.png";
import Spells from "../Spells/Spells";
import AllyTips from "../AllyTips/AllyTips";
import EnemyTips from "../EnemyTips/EnemyTips";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Search } from "lucide-react";

const Champions = () => {
  const [searchText, setSearchText] = useState("");
  const [champion, setChampion] = useState(null);
  const [loader, setLoader] = useState(false);
  const [skins, setSkins] = useState([]);
  const [spells, setSpells] = useState([]);

  async function searchChampion() {
    setLoader(true);
    if (!searchText) {
      setLoader(false);
      alert("Adicione um nome!");
      return;
    } else {
      const ApiCall = `https://ddragon.leagueoflegends.com/cdn/14.7.1/data/pt_BR/champion/${searchText}.json`;
      try {
        const response = await axios.get(ApiCall);
        const data = response.data.data[searchText];
        console.log(data);
        setChampion(data);
        setSkins(data.skins);
        setSpells(data.spells);
        setLoader(false);
      } catch (err) {
        setLoader(false);
        alert("Campeão não encontrado");
      }
    }
  }

  const handleKeyEnter = (e) => {
    if (e.code === "Enter") {
      searchChampion();
    }
  };

  console.log(searchText);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Lolkipedia</h1>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Nome do Campeão"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyEnter}
            className={styles.championSearch}
          />
          <Search
            onClick={searchChampion}
            className={styles.searchIcon}
            color="white"
          />
        </div>
        <img src={JinxLogo} alt="Jinx Logo" className="Logo" />
      </div>

      <div className={styles.championStatus}>
        {loader ? <p>Loading...</p> : ""}
        {champion && !loader && (
          <div className={styles.containerChampion}>
            <div className={styles.topBox}>
              <div className={styles.card}>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${champion.name}.png`}
                  alt="card image champion"
                />
                <div className={styles.cardInformations}>
                  <h2>{champion.name}</h2>
                  <p>{champion.title}</p>
                  <p>Lore: {champion.lore}</p>
                </div>
              </div>
            </div>
            <div className={styles.middleBoxStatus}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_0.jpg`}
                alt="Splash Art Champion"
              />
                <h3>Status</h3>
              <div className={styles.statusInformations}>
                <div className={styles.leftInformation}>
                  <p>Vida: {champion.stats.hp}</p>
                  <p>Vida por level: {champion.stats.hpperlevel}</p>
                  <p>Regeneração de vida: {champion.stats.hpregen}</p>
                  <p>Armadura: {champion.stats.armor}</p>
                  <p>Armadura por Level: {champion.stats.armorperlevel}</p>
                  <p>Dano: {champion.stats.attackdamage}</p>
                  <p>Velocidade de Ataque: {champion.stats.attackspeed}</p>
                </div>
                <div className={styles.rightInformation}>
                  <p>Velocidade de Ataque por level: {champion.stats.attackspeedperlevel}</p>
                  <p>Alcance de Ataque: {champion.stats.attackrange}</p>
                  <p>Velocidade de Movimento: {champion.stats.movespeed}</p>
                  <p>Ataque: {champion.info.attack}</p>
                  <p>Defesa: {champion.info.defense}</p>
                  <p>Dificuldade: {champion.info.difficulty}</p>
                  <p>Magia: {champion.info.magic}</p>
                </div>
              </div>
            </div>
            <div className={styles.middleBoxInformations}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${champion.name}.png`}
                alt=""
              />
              <p>
                Estilo De Jogo:{" "}
                {champion.tags.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </p>
              <p>Nome da Passiva: {champion.passive.name}</p>
              <p>Custo: {champion.partype}</p>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/passive/${champion.passive.image.full}`}
                alt=""
                className="logoSpells"
                key={champion.id}
              />
              <div className={styles.spells}>
                <h3>Spells</h3>
                {spells.map((item) => (
                  <Spells props={item} />
                ))}
              </div>
              <div className={styles.strategy}>
                <AllyTips tips={champion.allytips} />
                <EnemyTips tips={champion.enemytips} />
              </div>
            </div>
            <div className={styles.bottomBoxSkins}>
              <Carousel
                showArrows={true}
                showIndicators={false}
                infiniteLoop={true}
                dynamicHeight={false}
                autoPlay={true}
                className={styles.mySwiper}
              >
                {skins.map((item) => (
                  <div key={item.id} className={styles.skins}>
                    <h4>{item.name}</h4>
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_${item.num}.jpg`}
                      alt=""
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        )}
        {!champion && !loader && (
          <div className={styles.credits}>
            <div className={styles.box}>
              <a href="https://github.com/Dants0">
                <img src={GitHubMark} alt="GitHub" className="links" />
              </a>
              <a href="https://www.linkedin.com/in/guilherme-góes-8b72531b0/">
                <img src={LinkedInIcon} alt="LinkedIn" className="links" />
              </a>
            </div>
            <footer>
              <h3>Não tem conta no jogo?</h3>
              <a href="https://signup.leagueoflegends.com/pt-br/signup/index#/">
                <button className="registerBtn">Cadastre-se agora</button>
              </a>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Champions;
