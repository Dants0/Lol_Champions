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
import { Spinner } from "@chakra-ui/react";
import toast from "react-hot-toast";
import ModalComponent from "../Modal/ModalComponent";
import ModalUnique from "../ModalUnique/ModalUnique";

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
      toast.error("Adicione um nome antes...")
      return;
    } else {
      const ApiCall = `https://ddragon.leagueoflegends.com/cdn/14.7.1/data/pt_BR/champion/${searchText}.json`;
      try {
        const response = await axios.get(ApiCall);
        const data = response.data.data[searchText];
        setChampion(data);
        setSkins(data.skins);
        setSpells(data.spells);
        setLoader(false);
        toast.success("Campeão encontrado! 🎉")
      } catch (err) {
        setLoader(false);
        toast.error("Campeão não encontrado! 😓")
      }
    }
  }

  const handleKeyEnter = (e) => {
    if (e.code === "Enter") {
      searchChampion();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Lolkipedia</h1>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Nome do Campeão"
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
        {loader ? <Spinner
          color='blue.500'
        /> : ""}
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
              <div className={styles.topMiddleBoxInformations}>
                <div className={styles.centerMiddleBoxInformations}>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${champion.name}.png`}
                    alt=""
                  />
                  <p>
                    Estilo De Jogo
                    {champion.tags.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </p>
                </div>
                <div className={styles.passive}>
                  <ModalUnique id={champion.id} title={champion.passive.name} description={champion.passive.description} image={champion.passive.image.full} />
                </div>
                <div className={styles.spells}>
                  {spells.map((item) => ( // Adicionei um index como segundo parâmetro na função de mapeamento
                    <ModalComponent props={item}/>
                  ))}
                </div>

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
                    <h4>{item.name == "default" ? <p>Padrão</p> : <p>{item.name}</p>}</h4>
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
            <h2>Desenvolvido por
              Guilherme
            </h2>
            <div className={styles.box}>
              <a href="https://github.com/Dants0">
                <img src={GitHubMark} alt="GitHub" className="links" />
              </a>
              <a href='https://ko-fi.com/X8X0IUSJV' target='_blank'><img height='36' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
              <a href="https://www.linkedin.com/in/guilherme-góes-8b72531b0/">
                <img src={LinkedInIcon} alt="LinkedIn" className="links" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Champions;
