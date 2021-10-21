import './App.css';
import './components/MoviewRow';
import tmdb from './tmdb';
import React, { useEffect, useState } from 'react';
import MoviewRow from './components/MoviewRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import loading from './assets/loading.gif'

function App() {
  const [moveList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await tmdb.getHomeList();
      setMovieList(list);

      const originals = list.filter(item => item.slug === 'originals');
      const randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let movieChosen = originals[0].items.results[randomChosen];
      let movieChosenInfo = await tmdb.getMovieInfo(movieChosen.id, 'tv');
      setFeatureData(movieChosenInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => { window.removeEventListener('scroll', scrollListener) };
  }, []);

  return (
    <div className="App">
      <Header black={blackHeader} />
      {featureData &&
        <FeaturedMovie item={featureData} />
      }
      <section className="lists">
        {moveList.map((item, key) => (
          <MoviewRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito por Renato Santos<br />
        Direitos de imagem para Netflix<br />
        Dados pegos do site themoviedb.org<br />
      </footer>

      {!moveList.length &&
        <div className="loading">
          <img src={loading} alt="loading" />
        </div>
      }
    </div>
  );
}

export default App;
