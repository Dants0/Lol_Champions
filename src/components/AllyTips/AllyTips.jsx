import React from 'react';
import styles from './styles.module.scss';

const AllyTips = ({ tips }) => {
  return (
    <div className={styles.containerAllyTips}>
      <h3>Estratégias Jogando a Favor</h3>
      {tips.map((tip, index) => (
        <p key={index}>{tip}</p>
      ))}
    </div>
  );
};

export default AllyTips;
