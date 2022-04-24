import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Agile Development Practices',
    description: (
      <>
        See the problems that cause software development to get slower and more
        frustrating, and how agile development practices solve them.
      </>
    ),
  },
  {
    title: 'Outside-In TDD',
    description: (
      <>
        Learn a unique test-driven development approach that increases
        confidence, decreases test fragility, and improves your design.
      </>
    ),
  },
  {
    title: 'Exercises in React and Vue',
    description: (
      <>
        Put outside-in TDD and other agile development practices to work in an
        extended exercise in either React or Vue.js.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
