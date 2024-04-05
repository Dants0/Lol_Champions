import React from "react";
import styles from "./styles.module.scss";

const Spells = ({ props }) => {

  return (
    <div className={styles.containerSpells}>
      <p>{props.name}</p>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/${props.id}.png`}
        alt="Imagem da habilidade"
      />
    </div>
  );
};

export default Spells;
