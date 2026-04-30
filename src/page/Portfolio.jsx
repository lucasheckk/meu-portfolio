import "./style.scss";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoadingLottie from "../assets/Lottie/LoadingAnimationHex.lottie";
import { useScrollSystem } from "../hooks/useScrollSystem";

// ─── Componentes de biblioteca ─────────────────────────────────────────────
import ProfileCard from "../components/ProfileCard/ProfileCard.jsx";
import GlassSurface from "../components/GlassSurface/GlassSurface.jsx";
import BorderGlow from "../components/BorderGlow/BorderGlow.jsx";
import CarouselFront from "../components/Carousel/CarouselFront/CarouselFront.jsx";
import CarouselBack from "../components/Carousel/CarouselBack/CarouselBack.jsx";
import CarouselExtra from "../components/Carousel/CarouselExtra/CarouselExtra.jsx";
import Antigravity from "../components/Antigravity/Antigravity.jsx";
import StarBorder from "../components/StarBorder/StarBorder.jsx";
import SplitText from "../components/SplitText/SplitText.jsx";
import ShinyText from "../components/ShinyText/ShinyText.jsx";

// ─── Assets ───────────────────────────────────────────────────────────────
import GrainTexture from "../assets/dark-stone-desk-texture-with-concrete-background-high-resolution-top-view-table-with-copy-space-idea-advertising-banner-product-article.jpg";
import LogoHex from "../assets/Logotipo-Dev_hex-completoR-sbg.png";
import HexPattern from "../assets/HexPattern.png";
import ProfilePick from "../assets/ProfilePick-Lucas.png";

// ─── Logos do footer ───────────────────────────────────────────────────────
import logoDiscord from "../assets/discord.svg";
import logoIg from "../assets/instagram-mono.svg";
import logoWpp from "../assets/whatsapp.svg";
import logoGitHub from "../assets/github.svg";

// ─── Dados dos projetos ────────────────────────────────────────────────────
const projetos = [
  {
    id: 1,
    titulo: "Portfólio Web",
    descricao:
      "SPA desenvolvida para demonstrar habilidades visualmente, contendo informações de quem sou, formações, projetos, tecnologias e formas de contato.",
    link: "#sobre",
    tags: ["React", "React Bits", "SCSS", "Motion", "GitHub"],
  },
  {
    id: 2,
    titulo: "Self Management Database (Self MD)",
    descricao:
      "TCC do curso técnico em Informática. Sistema No-Code que espelha todas as funcionalidades do MySQL de forma visual, interativa e intuitiva, sem nenhuma linha de código.",
    link: "https://self-md-chi.vercel.app/",
    tags: ["React", "Node", "Spring Boot", "MySQL", "Docker"],
  },
];

// ─── Dados de formação ────────────────────────────────────────────────────
const formacoes = [
  {
    id: 1,
    icone: <i className="fi fi-sr-computer"></i>,
    titulo: "Técnico em Informática",
    local: "Universidade de Santa Cruz - UNISC",
    periodo: "2023 – 2025",
    descricao:
      "Base sólida em lógica de programação, redes, banco de dados e desenvolvimento de sistemas. Ponto de partida para a minha jornada no desenvolvimento web.",
  },
  {
    id: 2,
    icone: <i className="fi fi-sr-flag-usa" />,
    titulo: "Inglês Avançado",
    local: "Wizard Santa Cruz do Sul",
    periodo: "2012 – 2018",
    descricao:
      "Seis anos de imersão no idioma para consumo fluente de documentações técnicas, artigos internacionais e comunicação com equipes globais.",
  },
  {
    id: 3,
    icone: <i className="fi-sr-palette" />,
    titulo: "Design Gráfico",
    local: "Senac RS",
    periodo: "2022",
    descricao:
      "Fundamentos de composição visual, tipografia e teoria das cores, diretamente aplicados na criação de interfaces com noções sólidas de UX/UI.",
  },
  {
    id: 4,
    icone: <i className="fi-sr-graduation-cap" />,
    titulo: "Ciência de Dados",
    local: "DNC",
    periodo: "2024 – 2025",
    descricao:
      "Análise e visualização de dados com Python, Power BI e Excel. ETL, tratamento de dados e geração de insights dinâmicos para tomada de decisão.",
  },
];

// ─── Variantes Motion ─────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Componente Principal ─────────────────────────────────────────────────
export default function Portfolio() {
  useScrollSystem();

  // ── Estado de loading em dois estágios ──────────────────────────────────
  // isLoading → controla a tela de loading
  // contentReady → só vira true depois que a tela de loading SAIU da tela,
  //                garantindo que NENHUMA animação dispara por baixo dos panos.
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Dura o mesmo tempo da animação de loading
    const loadTimer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Espera a transição de saída da loading screen (0.55s) antes de montar o conteúdo.
      // Isso garante que os whileInView só existem no DOM quando o usuário já está vendo.
      const readyTimer = setTimeout(() => setContentReady(true), 600);
      return () => clearTimeout(readyTimer);
    }
  }, [isLoading]);

  return (
    <div className="container-principal">
      {/* ── TELA DE LOADING ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-screen"
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            aria-label="Carregando portfólio"
            role="status"
          >
            <DotLottieReact
              src={LoadingLottie}
              loop
              autoplay
              style={{ width: 260, height: 260 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PARTÍCULAS — renderiza sempre para não piscar ao montar ─────── */}
      <div className="antigravity-bg" aria-hidden="true">
        <Antigravity
          color="#2B124C"
          autoAnimate={true}
          count={900}
          particleSize={1.4}
          magnetRadius={6}
          ringRadius={4}
        />
      </div>

      {/*
       * Todo o conteúdo principal só monta depois que a loading screen saiu.
       * Isso reseta todos os whileInView / useInView naturalmente, sem gambiarras.
       */}
      {contentReady && (
        <>
          {/* ── NAVBAR ────────────────────────────────────────────────── */}
          <motion.nav
            className="menu-nav"
            role="navigation"
            aria-label="Navegação principal"
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <GlassSurface mixBlendMode="overlay">
              <div className="nav-inner">
                <div className="container-direito" aria-label="Logo Dev Hex">
                  <img src={LogoHex} alt="Logo do desenvolvedor Dev Hex" />
                </div>
                <div className="container-esquerdo">
                  <ul role="list">
                    <li>
                      <a href="#sobre">Sobre</a>
                    </li>
                    <li>
                      <a href="#projetos">Projetos</a>
                    </li>
                    <li>
                      <a href="#formacao">Formação</a>
                    </li>
                    <li>
                      <a href="#tecnologias">Tecnologias</a>
                    </li>
                    <li>
                      <a href="#contato" className="nav-cta">
                        Contato
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </GlassSurface>
          </motion.nav>

          {/* ── HERO — SOBRE MIM ───────────────────────────────────────── */}
          {/*
           * Usa animate="visible" diretamente porque o componente só monta
           * quando contentReady = true, então o usuário sempre vê a animação.
           */}
          <section className="sobre-mim" id="sobre" aria-label="Sobre mim">
            <motion.div
              className="sobre-texto"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.span className="sobre-tag" variants={fadeUp}>
                <p /> Olá, me chamo
              </motion.span>

              <motion.h1 className="sobre-nome" variants={fadeUp}>
                <ShinyText
                  text="Lucas Felipe Heck"
                  speed={4}
                  color="rgb(66,24,120)"
                  shineColor="rgb(118, 44, 215)"
                />
              </motion.h1>

              <motion.p className="sobre-codinome" variants={fadeUp}>
                - Dev Hex
              </motion.p>

              <motion.p className="sobre-bio" variants={fadeUp}>
                Desenvolvedor Web Junior com formação técnica em informática e
                base multidisciplinar em design gráfico, ciência de dados e
                inglês avançado. Construo soluções web como SPAs, MPAs e SaaS,
                equilibrando a robustez do back-end com experiências de
                front-end fluidas e bem projetadas. Lógica, persistência e
                estética funcionam juntas aqui.
              </motion.p>

              <motion.div className="sobre-acoes" variants={fadeUp}>
                <a href="#projetos" className="btn-primario">
                  Ver projetos
                </a>
                <a href="#contato" className="btn-secundario">
                  Entre em contato
                </a>
              </motion.div>
            </motion.div>

            {/* ProfileCard */}
            <motion.div
              className="sobre-card"
              aria-label="Card de perfil"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.25 }}
            >
              <ProfileCard
                name="Lucas F. Heck"
                title="Desenvolvedor FullStack"
                avatarUrl={ProfilePick}
                iconUrl={HexPattern}
                grainUrl={GrainTexture}
                behindGlowColor="rgba(95, 38, 170, 0.65)"
                behindGlowEnabled={true}
              />
            </motion.div>
          </section>

          {/* ── PROJETOS ────────────────────────────────────────────────── */}
          {/*
           * whileInView funciona corretamente aqui porque o elemento só existe
           * no DOM após o loading, então o Intersection Observer parte do zero.
           */}
          <motion.section
            className="meus-projetos"
            id="projetos"
            aria-label="Meus projetos"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={fadeUp}
          >
            <div className="section-header">
              <StarBorder
                as="span"
                color="rgb(157, 100, 255)"
                speed="5s"
                className="section-tag-star"
              >
                <span className="section-tag-inner">Experiências</span>
              </StarBorder>

              <h2 className="section-titulo">
                <SplitText
                  text="Projetos que desenvolvi"
                  delay={35}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,18px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                />
              </h2>
              <p className="section-subtitulo">
                Soluções construídas com foco em performance, usabilidade e boas
                práticas de código.
              </p>
            </div>

            <div className="projetos-grid">
              {projetos.map((projeto) => (
                <motion.div
                  key={projeto.id}
                  variants={cardAnim}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <BorderGlow
                    glowRadius={80}
                    glowIntensity={0.5}
                    borderRadius={16}
                    coneSpread={25}
                  >
                    <article className="projeto-card">
                      <div className="projeto-card-topo">
                        <h3 className="projeto-titulo">{projeto.titulo}</h3>
                        <div className="projeto-tags">
                          {projeto.tags.map((tag) => (
                            <span key={tag} className="projeto-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="projeto-descricao">{projeto.descricao}</p>
                      <a
                        href={projeto.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projeto-link"
                        aria-label={`Acessar projeto ${projeto.titulo}`}
                      >
                        Acessar sistema
                        <span className="projeto-link-seta" aria-hidden="true">
                          <i className="fi fi-sr-arrow-right" />
                        </span>
                      </a>
                    </article>
                  </BorderGlow>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── FORMAÇÃO ─────────────────────────────────────────────────── */}
          <motion.section
            className="formacao"
            id="formacao"
            aria-label="Formação e cursos"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={stagger}
          >
            <motion.div className="section-header" variants={fadeUp}>
              <StarBorder
                as="span"
                color="rgb(157, 100, 255)"
                speed="5s"
                className="section-tag-star"
              >
                <span className="section-tag-inner">Trajetória</span>
              </StarBorder>
              <h2 className="section-titulo">
                <SplitText
                  text="Formação acadêmica"
                  delay={35}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,18px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                />
              </h2>
              <p className="section-subtitulo">
                Uma base multidisciplinar que conecta técnica, dados e design.
              </p>
            </motion.div>

            <motion.div
              className="formacao-grid"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {formacoes.map((item) => (
                <motion.article
                  key={item.id}
                  className="formacao-card"
                  variants={cardAnim}
                >
                  <div className="formacao-icone" aria-hidden="true">
                    {item.icone}
                  </div>
                  <div className="formacao-conteudo">
                    <div className="formacao-header">
                      <h3 className="formacao-titulo">{item.titulo}</h3>
                      <span className="formacao-periodo">{item.periodo}</span>
                    </div>
                    <p className="formacao-local">{item.local}</p>
                    <p className="formacao-descricao">{item.descricao}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.section>

          {/* ── TECNOLOGIAS ──────────────────────────────────────────────── */}
          {/*
           * whileInView garante que o observer é criado no momento em que o
           * elemento monta, evitando o problema do useInView com ref nulo.
           */}
          <motion.section
            className="tecnologias"
            id="tecnologias"
            aria-label="Tecnologias que utilizo"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
          >
            <div className="section-header">
              <StarBorder
                as="span"
                color="rgb(157, 100, 255)"
                speed="5s"
                className="section-tag-star"
              >
                <span className="section-tag-inner">Stack</span>
              </StarBorder>
              <h2 className="section-titulo">
                <SplitText
                  text="Tecnologias"
                  delay={55}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,18px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                />
              </h2>
              <p className="section-subtitulo">
                Ferramentas que utilizo para construir as soluções necessárias.
              </p>
            </div>

            <div
              className="logo-loop-wrapper"
              aria-label="Logos das tecnologias"
            >
              <CarouselFront
                baseWidth={260}
                autoplay
                autoplayDelay={7000}
                pauseOnHover={false}
                loop
                round
              />
              <CarouselBack
                baseWidth={260}
                autoplay
                autoplayDelay={7000}
                pauseOnHover={false}
                loop
                round
              />
              <CarouselExtra
                baseWidth={280}
                autoplay
                autoplayDelay={7000}
                pauseOnHover={false}
                loop
                round
              />
            </div>
          </motion.section>

          {/* ── FOOTER ──────────────────────────────────────────────────── */}
          <footer className="footer" id="contato" aria-label="Rodapé e contato">
            <div className="footer-inner">
              {/* Coluna 1 — Contato */}
              <div className="footer-contato">
                <h3 className="footer-titulo-col">Contato</h3>
                <ul role="list" className="footer-links">
                  <li>
                    <a
                      href="https://github.com/lucasheckk"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHUB do Lucas"
                    >
                      <img
                        src={logoGitHub}
                        alt=""
                        className="footer-icon"
                        aria-hidden="true"
                      />
                      lucasheckk
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.com/users/heckkz_"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Discord do Lucas"
                    >
                      <img
                        src={logoDiscord}
                        alt=""
                        className="footer-icon"
                        aria-hidden="true"
                      />
                      heckkz_
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/heckkz_"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram do Lucas"
                    >
                      <img
                        src={logoIg}
                        alt=""
                        className="footer-icon"
                        aria-hidden="true"
                      />
                      @heckkz_
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/+555198277764"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp do Lucas"
                    >
                      <img
                        src={logoWpp}
                        alt=""
                        className="footer-icon"
                        aria-hidden="true"
                      />
                      +55 (51) 9827-7764
                    </a>
                  </li>
                </ul>
              </div>

              {/* Coluna 2 — Navegação */}
              <div className="footer-nav">
                <h3 className="footer-titulo-col">Navegação</h3>
                <ul role="list" className="footer-links">
                  <li>
                    <a href="#sobre">Sobre</a>
                  </li>
                  <li>
                    <a href="#projetos">Projetos</a>
                  </li>
                  <li>
                    <a href="#formacao">Formação</a>
                  </li>
                  <li>
                    <a href="#tecnologias">Tecnologias</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-copy">
              <p>Desenvolvido por Lucas Felipe Heck</p>
              <span className="footer-sep" aria-hidden="true">
                •
              </span>
              <p>
                Ícones por{" "}
                <a
                  href="https://www.flaticon.com/uicons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-credit-link"
                >
                  Uicons — Flaticon
                </a>
              </p>
              <span className="footer-sep" aria-hidden="true">
                •
              </span>
              <p>
                Grain texture por{" "}
                <a
                  href="http://www.freepik.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-credit-link"
                >
                  GarryKillian / Freepik
                </a>
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
