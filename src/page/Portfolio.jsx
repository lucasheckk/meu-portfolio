import "./style.scss";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

// ─── Componentes de biblioteca ─────────────────────────────────────────────
import ProfileCard from "../components/ProfileCard/ProfileCard.jsx";
import GlassSurface from "../components/GlassSurface/GlassSurface.jsx";
import BorderGlow from "../components/BorderGlow/BorderGlow.jsx";
import LogoLoop from "../components/LogoLoop/LogoLoop.jsx";
import Antigravity from "../components/Antigravity/Antigravity.jsx";
import StarBorder from "../components/StarBorder/StarBorder.jsx";
import SplitText from "../components/SplitText/SplitText.jsx";
import ShinyText from "../components/ShinyText/ShinyText.jsx";

// ─── Assets ───────────────────────────────────────────────────────────────
import GrainTexture from "../assets/dark-stone-desk-texture-with-concrete-background-high-resolution-top-view-table-with-copy-space-idea-advertising-banner-product-article.jpg";
import LogoHex from "../assets/Logotipo-Dev_hex-completoR-sbg.png";
import LogoHexSimple from "../assets/Logotipo-Dev_hex-white-sbg.png";
import ProfilePick from "../assets/ProfilePick-Lucas.webp";

// ─── Logos para o LogoLoop ─────────────────────────────────────────────────
import logoReact from "../assets/react.svg";
import logoNode from "../assets/nodedotjs.svg";
import logoVite from "../assets/vite.svg";
import logoSCSS from "../assets/sass.svg";
import logoMySQL from "../assets/mysql-light.svg";
import logoGit from "../assets/git.svg";
import logoSpring from "../assets/spring.svg";
import logoGitHub from "../assets/github.svg";
import logoVercel from "../assets/vercel.svg";
import logoRailway from "../assets/railway.svg";
import logoJava from "../assets/java.svg";
import logoMotion from "../assets/motion.svg";
import logoDocker from "../assets/docker.svg";
import logoGemini from "../assets/gemini.svg";
import logoClaude from "../assets/claude.svg";

// ─── Logos do footer ───────────────────────────────────────────────────────
import logoDiscord from "../assets/discord.svg";
import logoIg from "../assets/instagram-mono.svg";
import logoWpp from "../assets/whatsapp.svg";

// ─── Dados dos projetos ────────────────────────────────────────────────────
const projetos = [
  {
    id: 1,
    titulo: "Portfólio Web",
    descricao:
      "SPA desenvolvida para demonstrar habilidades visualmente, contendo informações de quem sou, formações, projetos, tecnologias e formas de contato.",
    link: "https://seu-projeto.vercel.app",
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
    icone: <i className="fi-tr-computer" />,
    titulo: "Técnico em Informática",
    local: "Universidade de Santa Cruz - UNISC",
    periodo: "2023 – 2025",
    descricao:
      "Base sólida em lógica de programação, redes, banco de dados e desenvolvimento de sistemas. Ponto de partida para a jornada no desenvolvimento web.",
  },
  {
    id: 2,
    icone: <i className="fi-ts-globe" />,
    titulo: "Inglês Avançado",
    local: "Wizard Santa Cruz do Sul",
    periodo: "2012 – 2018",
    descricao:
      "Seis anos de imersão no idioma para consumo fluente de documentações técnicas, artigos internacionais e comunicação com equipes globais.",
  },
  {
    id: 3,
    icone: <i className="fi-tr-palette" />,
    titulo: "Design Gráfico",
    local: "Senac RS",
    periodo: "2022",
    descricao:
      "Fundamentos de composição visual, tipografia e teoria das cores, diretamente aplicados na criação de interfaces com noções sólidas de UX/UI.",
  },
  {
    id: 4,
    icone: <i className="fi-tr-chart-histogram" />,
    titulo: "Ciência de Dados",
    local: "DNC",
    periodo: "2024 – 2025",
    descricao:
      "Análise e visualização com Python, Power BI e Excel. ETL, tratamento de dados e geração de insights dinâmicos para tomada de decisão.",
  },
];

const Logotipos = [
  { name: "React", img: logoReact },
  { name: "Node.js", img: logoNode },
  { name: "Vite", img: logoVite },
  { name: "SCSS", img: logoSCSS },
  { name: "Motion", img: logoMotion },
  { name: "Java", img: logoJava },
  { name: "Spring Boot", img: logoSpring },
  { name: "MySQL", img: logoMySQL },
  { name: "Docker", img: logoDocker },
  { name: "Git", img: logoGit },
  { name: "GitHub", img: logoGitHub },
  { name: "Vercel", img: logoVercel },
  { name: "Railway", img: logoRailway },
  { name: "Gemini", img: logoGemini },
  { name: "Claude", img: logoClaude },
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
  const tecnologiasRef = useRef(null);
  const tecnologiasInView = useInView(tecnologiasRef, {
    once: true,
    amount: 0.15,
  });

  return (
    <div className="container-principal">
      <div className="antigravity-bg" aria-hidden="true">
        <Antigravity
          color="#2B124C"
          autoAnimate={true}
          count={300}
          particleSize={1.5}
          magnetRadius={12}
          ringRadius={8}
        />
      </div>

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav
        className="menu-nav"
        role="navigation"
        aria-label="Navegação principal"
      >
        <GlassSurface
          className="glassbk"
          width="100%"
          height="100%"
          borderRadius={25}
          opacity={0.5}
          blur={40}
        >
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
      </nav>

      {/* ── HERO — SOBRE MIM ─────────────────────────────────────────────── */}
      <section className="sobre-mim" id="sobre" aria-label="Sobre mim">
        <motion.div
          className="sobre-texto"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.span className="sobre-tag" variants={fadeUp}>
            <ShinyText text="Olá, me chamo" speed={4} />
          </motion.span>

          <motion.h1 className="sobre-nome" variants={fadeUp}>
            <SplitText
              text="Lucas Felipe"
              delay={40}
              animationFrom={{ opacity: 0, transform: "translate3d(0,28px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            />{" "}
            <span className="destaque">
              <SplitText
                text="Heck"
                delay={40}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,28px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              />
            </span>
          </motion.h1>

          <motion.p className="sobre-codinome" variants={fadeUp}>
            {/* ShinyText no codinome */}
            <ShinyText text="— Dev Hex" speed={3} />
          </motion.p>

          <motion.p className="sobre-bio" variants={fadeUp}>
            Desenvolvedor Web Junior com formação técnica em informática e base
            multidisciplinar em design gráfico, ciência de dados e inglês
            avançado. Construo soluções web como SPAs, MPAs e SaaS, equilibrando
            a robustez do back-end com experiências de front-end fluidas e bem
            projetadas. Lógica, persistência e estética funcionam juntas aqui.
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
            handle="heckkz_"
            status="Online"
            contactText="Me chame"
            avatarUrl="../assets/Logotipo-Dev_hex-completoR-sbg.png"
            miniAvatarUrl={ProfilePick}
            iconUrl={LogoHexSimple}
            grainUrl={GrainTexture}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
            onContactClick={() => console.log("Contact clicked")}
            behindGlowColor="rgba(95, 38, 170, 0.65)"
            behindGlowEnabled={true}
          />
        </motion.div>
      </section>

      {/* ── PROJETOS ──────────────────────────────────────────────────────── */}
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
            color="#5F26AA"
            speed="6s"
            className="section-tag-star"
          >
            <span className="section-tag-inner">Experiências</span>
          </StarBorder>

          <h2 className="section-titulo">
            <SplitText
              text="Projetos que desenvolvi"
              delay={35}
              animationFrom={{ opacity: 0, transform: "translate3d(0,18px,0)" }}
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
                glowColor="#5F26AA"
                secondaryGlowColor="#421878"
                background="rgba(43, 18, 76, 0.55)"
                borderRadius={16}
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

      {/* ── FORMAÇÃO ─────────────────────────────────────────────────────── */}
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
            color="#421878"
            speed="7s"
            className="section-tag-star"
          >
            <span className="section-tag-inner">Trajetória</span>
          </StarBorder>
          <h2 className="section-titulo">
            <SplitText
              text="Formação acadêmica"
              delay={35}
              animationFrom={{ opacity: 0, transform: "translate3d(0,18px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            />
          </h2>
          <p className="section-subtitulo">
            Uma base multidisciplinar que conecta técnica, dados e design.
          </p>
        </motion.div>

        <div className="formacao-grid">
          {formacoes.map((item) => (
            <article key={item.id} className="formacao-card">
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
            </article>
          ))}
        </div>
      </motion.section>

      {/* ── TECNOLOGIAS ──────────────────────────────────────────────────── */}
      <motion.section
        ref={tecnologiasRef}
        className="tecnologias"
        id="tecnologias"
        aria-label="Tecnologias que utilizo"
        initial="hidden"
        animate={tecnologiasInView ? "visible" : "hidden"}
        variants={fadeUp}
      >
        <div className="section-header">
          <StarBorder
            as="span"
            color="#5F26AA"
            speed="5s"
            className="section-tag-star"
          >
            <span className="section-tag-inner">Stack</span>
          </StarBorder>
          <h2 className="section-titulo">
            <SplitText
              text="Tecnologias"
              delay={55}
              animationFrom={{ opacity: 0, transform: "translate3d(0,18px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            />
          </h2>
          <p className="section-subtitulo">
            Ferramentas que uso no dia a dia para construir soluções completas.
          </p>
        </div>

        <div className="logo-loop-wrapper" aria-label="Logos das tecnologias">
          <LogoLoop logos={Logotipos} speed={35} direction="left" />
        </div>
      </motion.section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="footer" id="contato" aria-label="Rodapé e contato">
        <div className="footer-inner">
          {/* Coluna 1 — Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              {/* FIX: tamanho controlado via CSS (.footer-logo img) */}
              <img src={LogoHex} alt="Logo Dev Hex" />
            </div>
            <p className="footer-descricao">
              Desenvolvedor apaixonado por unir estética e código. Sempre aberto
              a novos desafios e colaborações.
            </p>
          </div>

          {/* Coluna 2 — Contato */}
          <div className="footer-contato">
            <h3 className="footer-titulo-col">Contato</h3>
            <ul role="list" className="footer-links">
              <li>
                <a
                  href="https://discord.com/users/heckkz_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord heckkz_"
                >
                  {/* FIX: classe footer-icon para controlar tamanho */}
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
                  aria-label="Instagram @heckkz_"
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
                <a href="tel:+5551998277764" aria-label="WhatsApp de Lucas">
                  <img
                    src={logoWpp}
                    alt=""
                    className="footer-icon"
                    aria-hidden="true"
                  />
                  +55 (51) 99827-7764
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 — Navegação */}
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

        {/* FIX: copyright corrigido — direitos são somente do Uicons/Flaticon */}
        <div className="footer-copy">
          <p>Desenvolvido por Lucas Felipe Heck</p>
          <span className="footer-sep" aria-hidden="true">
            ·
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
        </div>
      </footer>
    </div>
  );
}
