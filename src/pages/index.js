import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import frontPageGraphic from './front_page_graphic.png';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src={frontPageGraphic} />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <a
            className="button button--secondary button--lg margin-horiz--md margin-vert--md"
            href="/book"
          >
            Buy Ebook or Paperback
          </a>
        </div>
        <Link to="/about-this-book" className={styles.heroLink}>
          Or, read an older version online
        </Link>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="An extended tutorial in outside-in test-driven development in React and Vue."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
