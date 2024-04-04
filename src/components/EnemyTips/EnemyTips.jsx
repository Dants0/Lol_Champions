import React from 'react';
import styles from './styles.module.scss';

const EnemyTips = ({ tips }) => {
  return (
    <div className={styles.containerAllyTips}>
      <h3>Estratégias Jogando Contra</h3>
      {tips.map((tip, index) => (
        <p key={index}>{tip}</p>
      ))}
    </div>
  );
};

export default EnemyTips;
