import './App.css';
import { useMemo, useState, useMemo as useMemo2, useEffect, useRef } from 'react';
import Logo from '../src/assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function useImageFolder(globResult) {
  return useMemo(() => {
    const items = Object.entries(globResult).map(([path, mod]) => ({
      src: mod.default || mod,
      file: path.split('/').pop()
    }));
    return items.sort((a, b) => a.file.localeCompare(b.file));
  }, [globResult]);
}

function findImageByName(globResult, needle) {
  const hit = Object.entries(globResult).find(([p]) =>
    p.toLowerCase().includes(needle.toLowerCase())
  );
  if (!hit) return null;
  const mod = hit[1];
  return mod.default || mod;
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((s) => !s);

  // --- NEW: Lightbox state ---
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });
  const openLightbox = (src, alt = '') => setLightbox({ open: true, src, alt });
  const closeLightbox = () => setLightbox({ open: false, src: '', alt: '' });

  // Lock scroll + ESC to close when open
  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e) => e.key === 'Escape' && closeLightbox();
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox.open]);

  const thumbGlob = import.meta.glob('./assets/Thumbnails/*.{png,jpg,jpeg,webp,avif}', { eager: true });
  const gameGlob  = import.meta.glob('./assets/Games/*.{png,jpg,jpeg,webp,avif}',       { eager: true });

  const thumbnails = useImageFolder(thumbGlob);
  const games = useMemo(() => {
    const thumbImg1 = findImageByName(gameGlob, 'thumb1');
    const thumbImg2 = findImageByName(gameGlob, 'thumb2');
    const thumbImg3 = findImageByName(gameGlob, 'thumb3');
    const thumbImg4 = findImageByName(gameGlob, 'thumb4');
    const thumbImg5 = findImageByName(gameGlob, 'thumb5');
    const thumbImg6 = findImageByName(gameGlob, 'thumb6');
    const thumbImg7 = findImageByName(gameGlob, 'thumb7');
    const thumbImg8 = findImageByName(gameGlob, 'thumb8');
    return [
      {
        name: 'Build A Boat',
        link: 'https://www.roblox.com/games/125443691992855/Build-A-Boat',
        img: thumbImg1,
        stats: [{ label: 'Visits', value: '9M+' }]
      },
      {
        name: 'Build And Destroy',
        link: 'https://www.roblox.com/games/89413975336733/Build-and-Destroy-2-Player-Obby',
        img: thumbImg2,
        stats: [{ label: 'Visits', value: '23M+' }]
      },
      {
        name: 'Car Mechanic',
        link: 'https://www.roblox.com/games/9265443535/Car-Mechanic-Simulator',
        img: thumbImg3,
        stats: [{ label: 'Visits', value: '28M+' }]
      },
      {
        name: 'Eat & Bungee Jump!',
        link: 'https://www.roblox.com/games/117810615764614/Eat-Bungee-Jump',
        img: thumbImg4,
        stats: [{ label: 'Visits', value: '3M+' }]
      },
      {
        name: 'Hire a Fisher',
        link: 'https://www.roblox.com/games/82912499835188/UPD-Hire-a-Fisher',
        img: thumbImg5,
        stats: [{ label: 'Visits', value: '15M+' }]
      },
      {
        name: 'My Fishing Pier',
        link: 'https://www.roblox.com/games/94682676231618/My-Fishing-Pier',
        img: thumbImg6,
        stats: [{ label: 'Visits', value: '45M+' }]
      },
      {
        name: 'Prospecting',
        link: 'https://www.roblox.com/games/129827112113663/Prospecting',
        img: thumbImg7,
        stats: [{ label: 'Visits', value: '137M+' }]
      },
      {
        name: 'Sisyphus Training',
        link: 'https://www.roblox.com/games/114113024880209/Sisyphus-Training-Squid',
        img: thumbImg8,
        stats: [{ label: 'Visits', value: '33M+' }]
      },
    ];
  }, [gameGlob]);

  const thumbnailNames = {
    "thumb1.png": "Build A Boat",
    "thumb2.png": "Build And Destroy",
    "thumb3.png": "Car Mechanic",
    "thumb4.png": "Eat & Bungee Jump!",
    "thumb5.png": "Hire a Fisher",
    "thumb6.png": "My Fishing Pier",
    "thumb7.png": "Prospecting",
    "thumb8.png": "Sisyphus Training",
    "thumb9.png": "Survive Overnight in a Mega Store"
  };


  const modalRef = useRef(null);
const [modalImg, setModalImg] = useState({ src: '', alt: '' });

const openModal = (src, alt = '') => {
  setModalImg({ src, alt });
  modalRef.current?.showModal();
};

const closeModal = () => {
  modalRef.current?.close();
  setModalImg({ src: '', alt: '' });
};

useEffect(() => {
  const onKey = (e) => e.key === 'Escape' && closeModal();
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, []);

  return (
    <div className="app">
      <nav className="nav">
        <img id="logo" src={Logo} alt="JuanArtxz Logo" />
        <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>
        <ul className={isOpen ? 'open' : ''} onClick={() => setIsOpen(false)}>
          <li><a href="#hero">Home</a></li>
          <li><a href="#games">Games</a></li>
          <li><a href="#thumbnails">Thumbnails</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <header id="hero" className="hero">
        <h1>
          <span>Juan</span>Artxzz
        </h1>
        <p className="hero-desc">
          Leveling up games through visuals.<br />
          High CTR <b>Thumbnails</b> & <b>Icons</b>.
        </p>
        <div className="stats" aria-label="Portfolio stats">
          <div className="stat">
            <div className="stat-value">5B+</div>
            <div className="stat-label">Visits Contributed</div>
          </div>
          <div className="stat">
            <div className="stat-value">100+</div>
            <div className="stat-label">Devs Worked With</div>
          </div>
        </div>

        <div id='cta_hold'>
    <a href="#thumbnails" className="hero-cta" style={{ marginTop: 24 }}>
              <FontAwesomeIcon icon={faFolder} />
              &nbsp;View Thumbnails
            </a>
            <a href="https://discord.gg/juanartxz" target='_blank' className="hero-cta" style={{ marginTop: 24 }}>
          <FontAwesomeIcon icon={faShoppingBag} />
          &nbsp;Order Now
        </a>
        </div>
      </header>

      {/* Games Contributed */}
      <section id="games" className="section">
        <h2 className="section-title">Games <span>Contributed</span> To</h2>

        {/* Infinite Carousel */}
        <div className="carousel" style={{ '--carousel-speed': '42s' }}>
          <div className="track">
            {[...games, ...games].map((g, i) => (
              <article className="game-card" key={`${g.name}-${i}`}>
                <a
                  className="game-media"
                  href={g.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${g.name} on Roblox`}
                >
                  {g.img ? (
                    <img src={g.img} alt={`${g.name} cover`} className="game-img" loading="lazy" />
                  ) : (
                    <div className="game-placeholder">
                      Add image at <code>src/assets/Games/grow-a-garden.jpg</code>
                    </div>
                  )}

                  {/* Overlay: title left + stats right (stays like you had it) */}
                  <div className="game-overlay">
                    <h3 className="game-title">{g.name}</h3>
                    <div className="game-stats">
                      {g.stats.map((s, idx) => (
                        <span className="pill" key={idx}>
                          <b>{s.label}:</b>&nbsp;{s.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="thumbnails" className="section">
        <h2 className="section-title">High-CTR <span>Thumbnails</span></h2>
        {thumbnails.length === 0 ? (
          <p className="hero-desc">Drop images into <code>src/assets/Thumbnails</code> to populate this grid.</p>
        ) : (
          <div className="grid">
            {thumbnails.map((img, i) => (
              <div className="card" key={img.file + i}>
                <img
                  src={img.src}
                  alt={`Thumbnail ${i + 1}`}
                  className="thumb-img"
                  loading="lazy"
                  onClick={() => openModal(img.src, thumbnailNames[img.file] || `Thumbnail ${i + 1}`)}
                />
                <h3>{thumbnailNames[img.file] || `Thumbnail ${i + 1}`}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="contact" className="section contact">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-grid">
          <a className="contact-card" href='https://x.com/juanartxz?s=11' target="_blank">
            <div className="icon-pill" aria-hidden>
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </div>
            <div className="contact-body">
              <h3>Twitter</h3>
              <p>@JuanArtxzz</p>
            </div>
          </a>

          <a className="contact-card" href="https://discord.gg/juanartxz" target="_blank" rel="noreferrer">
            <div className="icon-pill" aria-hidden>
              <FontAwesomeIcon icon={faDiscord} size="lg" />
            </div>
            <div className="contact-body">
              <h3>Discord</h3>
              <p>https://discord.gg/juanartxz</p>
            </div>
          </a>
        </div>
      </section>

      <dialog
        ref={modalRef}
        className="modal-img"
        onClick={(e) => {
          // click backdrop (outside content) closes
          if (e.target === modalRef.current) closeModal();
        }}
        onCancel={(e) => {
          // prevent default close behavior if you want custom logic
          e.preventDefault();
          closeModal();
        }}
      >
        <figure className="modal-img__frame">
          {modalImg.src && (
            <img className="modal-img__img" src={modalImg.src} alt={modalImg.alt} />
          )}
          {modalImg.alt && <figcaption className="modal-img__caption">{modalImg.alt}</figcaption>}
          <button className="modal-img__close" aria-label="Close" onClick={closeModal}>&times;</button>
        </figure>
      </dialog>


      <footer className="footer">
        <p>© {new Date().getFullYear()} JuanArts — High CTR Thumbnails & Icons.</p>
      </footer>
    </div>
  );
}

export default App;
