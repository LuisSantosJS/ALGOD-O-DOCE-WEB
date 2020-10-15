/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, createRef } from 'react';
import api, { URL } from '../../service/api';
import './styles.css';
import ReactDOM from 'react-dom';

interface Turmas {
    _id: string;
    name: string;
    description: string;
    imageURL: string;
}

interface Portifolio {
    _id: string;
    name: string;
    description: string;
    imageURL: string;
}

interface Galery {
    _id: string;
    description: string;
    imageURL: string;
}
const Home: React.FC = () => {
    const [turmas, setTurmas] = useState<Turmas[]>([]);
    const [galery, setGalery] = useState<Galery[]>([]);
    const [portifolio, setPortifolio] = useState<Portifolio[]>([]);
    const aboutRef = createRef<any>();
    const turmasRef = createRef<any>();
    const atividadesRef = createRef<any>();
    const venueRef = createRef<any>();
    const scheduleRef = createRef<any>();
    const galleryRef = createRef<any>();
    const contactRef = createRef<any>();
    const supportersRef = createRef<any>();
    const scrollTo = (div: string) => {
        if (div === 'about') {
            let node = ReactDOM.findDOMNode(aboutRef.current) as Element;
            node.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if (div === 'turmas') {
            let node = ReactDOM.findDOMNode(turmasRef.current) as Element;
            node.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if (div === 'atividades') {
            let node = ReactDOM.findDOMNode(atividadesRef.current) as Element;
            node.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if (div === 'venue') {
            let node = ReactDOM.findDOMNode(venueRef.current) as Element;
            node.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if (div === 'schedule') {
            let node = ReactDOM.findDOMNode(scheduleRef.current) as Element;
            node.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if (div === 'gallery') {
            let node = ReactDOM.findDOMNode(galleryRef.current) as Element;
            node.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if (div === 'contact') {
            let node = ReactDOM.findDOMNode(contactRef.current) as Element;
            node.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if (div === 'supporters') {
            let node = ReactDOM.findDOMNode(supportersRef.current) as Element;
            node.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }

    }
    const loadTurmas = () => {
        api.get('/turmas/index').then(res => {
            setTurmas(res.data);
        })
    }
    const loadGalery = () => {
        api.get('/galeria/index').then(res => {
            setGalery(res.data);
        })
    }
    const loadPortifolio = () => {
        api.get('/portifolio/index').then(res => {
            setPortifolio(res.data)
        })
    }

    useEffect(() => {
        loadTurmas();
        loadGalery();
        loadPortifolio();
    }, []);
    return (
        <>
            <header id="header">
                <div className="container">
                    <div id="logo" className="pull-left">
                        <a className="scrollto"><img src={`${URL}/assets/img/logo2.png`
                        } alt="" title="" /></a>
                    </div>
                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <li className="menu-active"><a href="#">Home</a></li>
                            <li><a onClick={() => scrollTo('turmas')} >Turmas</a></li>
                            <li><a  >Atividades</a></li>
                            <li><a onClick={() => scrollTo('about')}>A Escola</a></li>
                            <li><a >Cardápio</a></li>
                            <li><a >Calendário</a></li>
                            <li><a onClick={() => scrollTo('gallery')}>Galerias</a></li>
                            <li><a onClick={() => scrollTo('contact')}>Contato</a></li>
                            <li><a >Restrito</a></li>
                            <li className="buy-tickets"><a href="#buy-tickets">Agende uma Visita</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <section id="intro">
                <div className="intro-container" data-aos="zoom-in" data-aos-delay="100">
                    <h1 className="mb-4 pb-0">Bem vindo !<br />escola <span>Algodão</span> Doce</h1>
                    <p className="mb-4 pb-0">Rua São Luiz, nº 225 - Centro - Canoas / RS</p>
                    <a href="https://www.youtube.com/watch?v=mOVnlt7uQXg" className="venobox play-btn mb-4" data-vbtype="video"
                        data-autoplay="true" title="Video">.</a>
                    <a href="#about" className="about-btn scrollto">Conheça a nossa escola</a>
                </div>
            </section>


            <main id="main">
                <section ref={aboutRef} id="about">
                    <div className="container" data-aos="fade-up">
                        <div className="row">
                            <div className="col-lg-6">
                                <h2>Sobre a Algodão Doce</h2>
                                <p>Nossa equipe, além de ser especializada e treinada periodicamente com foco em desenvolvimento infantil,
              atende turmas reduzidas, o que lhe permite um olhar muito mais próximo e atencioso para cada criança.</p>
                                <p>Nossa abordagem educacional parte do Aprender Brincando para desenvolver as diferentes habilidades
                                (intelectuais, emocionais, motoras e sociais), contribuindo para a expansão das suas capacidades de
                                comunicação, interação social, domínio do espaço físico e do próprio corpo, pensamento, ética e estética.
            </p>
                            </div>
                            <div className="col-lg-3">
                                <h3>Oferecemos</h3>
                                <p>Salas amplas e climatizadas, sala de TV / biblioteca / contos e fantasias, área de 550 m2 destinada
              apenas para recreação, horta coletiva, parquinho ecológico e monitoramento por câmeras.</p>
                            </div>
                            <div className="col-lg-3">
                                <h3>Equipe multidisciplinar</h3>
                                <p>Todos nossos profissionais são qualificados, nossa equipe multidisciplinar é formada por Pedagoga,
                                Psicopedagoga, Professores, Auxiliares, Psicóloga, Nutricionista, Cozinheira, Auxiliar de Limpeza e
              Serviços Gerais.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <h2>Nossa História</h2>
                                <img src={`${URL}/assets/img/escola/portfolio/fachada.jpg`}
                                    className="lazy img-responsive img-thumbnail"
                                    alt="Foto da Fachada da Escola"
                                    title="Nossa fachada." />
                                <br />
                                <br />
                                <p>Em Maio de 2015 a <strong>Escola Algodão Doce</strong> (que já existia há 8 anos) foi adquirida
              pela pedagoga Taniamar Sufredini Alberton, que por ter trabalhado muitos anos na supervisão de
              creches do municipio de Canoas, sempre teve como "sonho" poder continuar esse trabalho mesmo
              após sua aposentadoria.</p>
                                <img src={`${URL}/assets/img/escola/portfolio/frente_escola.jpg`}
                                    className="lazy img-responsive img-thumbnail"
                                    alt="Foto da Fachada da Escola"
                                    title="Nossa fachada." />
                                <br />
                                <br />
                                <p>
                                    A possibilidade surgiu quando foi convidada a ser sócia da antiga proprietária, pois há quatro anos já atuava como orientadora pedagógica desta escola.
            </p>
                                <img src={`${URL}/assets/img/escola/portfolio/empresa_02.jpg`}
                                    className="lazy img-responsive img-thumbnail"
                                    alt="Foto da Fachada da Escola"
                                    title="Nossa fachada." />
                                <br />
                                <br />
                                <p>
                                    O primeiro passo foi legalizar deixando de acordo com todas as normas do conselho municipal de
                                    educação, tarefa essa que exigiu muito empenho e recursos financeiro. mas em janeiro 2016
                                    conseguimos entregar 100% das exigências e hoje estamos plenamente aptos para exercer essa
                                    função.
            </p>
                                <br />
                                <br />
                                <img src={`${URL}/assets/img/escola/portfolio/empresa_03.jpg`}
                                    className="lazy img-responsive img-thumbnail" alt="Foto das crianças no escorregador."
                                    title="Crianças no escorregador." />
                                <br />
                                <br />
                                <p>
                                    Segundo passo foi reformar e climatizar todas as salas de aula, pois acreditamos que
                                    aprendizagem necessita de um bom ambiente. investimos em brinquedos e reformamos também a area
                                    externa.
            </p>
                                <br />
                                <br />
                                <img src={`${URL}/assets/img/escola/portfolio/empresa_04.jpg`}
                                    className="lazy img-responsive img-thumbnail" alt="Foto da Menina no Brinquedo"
                                    title="Menina no Brinquedo" />
                                <br />
                                <br />
                                <p>
                                    Hoje nossa escola oferece o que tem de melhor em acomodações, pois acreditamos que o bem estar
                                    das crianças é fundamental para processo de aprendizagem.
            </p>
                                <br />
                                <img src={`${URL}/assets/img/escola/portfolio/empresa_05.jpg`}
                                    className="lazy img-responsive img-thumbnail" alt="Foto das crianças brincando."
                                    title="Crianças Brincando" />
                                <br />
                                <br />
                                <p>Temos também a satisfação de apresentar que a <strong>Escola Algodão Doce</strong> conta com
                profissionais qualificados e equipe multidisciplinar, com pedagoga, psicopedagoga e
                nutricionista. </p>
                                <br />
                                <br />
                                <h3>Missão</h3>
                                <p>
                                    Criar um ambiente acolhedor e facilitador do movimento livre para que a criança, confiando em suas habilidades motoras, possa descobrir suas potencialidades, para que aprendam a viver no coletivo sem perder sua individualidade e circulem em diferentes grupos com segurança e confiança.
            </p>
                                <br />
                                <br />
                                <h3>Visão</h3>
                                <p>
                                    Ser referência em educação infantil
            </p>
                                <br />
                                <br />
                                <h3>Valores</h3>
                                <p>
                                    Respeito à infância, respeito recíproco entre os profissionais, respeito às crianças, parceria com as famílias, comprometimento com o trabalho íntegro, ético e transparente.
            </p>

                            </div>
                            <div className="col-lg-6">
                                <h3>Nossas Instalações</h3>
                                <img src={`${URL}/assets/img/escola/portfolio/crianca_brincando.jpg`}
                                    className="lazy img-responsive img-thumbnail" alt="Foto da Criança no Berçário."
                                    title="Criança no Berçário" />
                                <br />
                                <br />
                                <p>
                                    Nossas instalações foram pensadas para o bem estar das crianças, onde todas salinhas são amplas
                                    e climatizadas.
            </p>
                                <p>
                                    Nosso berçário possui piso térmico, anti-alérgico e emborrachado, que facilitam o engatinhar e
                                    os primeiros passinhos dos bebes.
            </p>
                                <p>
                                    Possuímos um amplo espaço externo com playground , que proporciona muitas atividades ao ar
                                    livre, alem do espaço coberto com onde temos a piscina de bolinhas e cama elástica.
            </p>
                                <p>Trabalhamos com turmas reduzidas, proporcionando melhor qualidade de ensino. Com salas
                climatizadas e amplo espaço para recreação, além de termos <strong>monitoramento por
                    câmeras</strong> garantindo a segurança de seu filho/filha.</p>
                                <br />
                                {portifolio.map(res => {
                                    return (
                                        <React.Fragment key={res._id}>
                                            <img src={`${res.imageURL}`}
                                                className="lazy img-responsive img-thumbnail" alt={res.description}
                                                title={res.name} />
                                            <br />
                                            <br />
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="embed-responsive embed-responsive-4by3">
                                    <iframe title='iframe' className="embed-responsive-item" width="750" height="422"
                                        src="https://www.youtube.com/embed/mOVnlt7uQXg" frameBorder={0} allowFullScreen />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={turmasRef} id="turmas">
                    <div className="container" data-aos="fade-up">
                        <div className="section-header">
                            <h2>Turmas</h2>
                            <p>Conheça as nossas turmas</p>
                        </div>

                        <div className="row">
                            {turmas.map(res => {
                                return (
                                    <div key={res._id} className="col-lg-4 col-md-6">
                                        <div className="turma" data-aos="fade-up" data-aos-delay="100">
                                            <img src={`${res.imageURL}`} alt="turma 1" className="img-fluid" />
                                            <div className="details">
                                                <h3><a href="turma-details.html">{res.name}</a></h3>
                                                <p>{res.description}</p>
                                                <div className="social">
                                                    <a href=""><i className="fa fa-twitter"></i></a>
                                                    <a href=""><i className="fa fa-facebook"></i></a>
                                                    <a href=""><i className="fa fa-google-plus"></i></a>
                                                    <a href=""><i className="fa fa-linkedin"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section ref={galleryRef} id="gallery">

                    <div className="container" data-aos="fade-up">
                        <div className="section-header">
                            <h2>Galeria</h2>
                            <p>Fotos e vídeos dos últimos eventos.</p>
                        </div>
                    </div>
                    <div className="owl-carousel gallery-carousel " data-aos="fade-up" data-aos-delay={100}>
                            {galery.map(res => {
                                return (
                                    <a key={res._id} href={`${res.imageURL}`} className="venobox" data-gall="gallery-carousel">
                                        <img src={`${res.imageURL}`} alt={res.description} />
                                    </a>
                                )
                            })}
                    </div>

                </section>


                <section id="faq">

                    <div className="container" data-aos="fade-up">

                        <div className="section-header">
                            <h2>F.A.Q </h2>
                            <p>Sessão de perguntas e respostas.</p>
                        </div>

                        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="100">
                            <div className="col-lg-9">
                                <ul id="faq-list">

                                    <li>
                                        <a data-toggle="collapse" className="collapsed" href="#faq1">Professoras ?
            <i className="fa fa-minus-circle"></i></a>
                                        <div id="faq1" className="collapse" data-parent="#faq-list">
                                            <p>
                                                De Terça à sexta às 14h.
            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <a data-toggle="collapse" href="#faq2" className="collapsed"> Nutricionista ? <i
                                            className="fa fa-minus-circle"></i></a>
                                        <div id="faq2" className="collapse" data-parent="#faq-list">
                                            <p>
                                                Nas terças e quintas.
            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <a data-toggle="collapse" href="#faq3" className="collapsed"> Psicóloga ? <i
                                            className="fa fa-minus-circle"></i></a>
                                        <div id="faq3" className="collapse" data-parent="#faq-list">
                                            <p>
                                                Segundas e quartas após as 18h.
            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <a data-toggle="collapse" href="#faq4" className="collapsed"> Pedagoga Responsável ? <i
                                            className="fa fa-minus-circle"></i></a>
                                        <div id="faq4" className="collapse" data-parent="#faq-list">
                                            <p>
                                                Terças a sextas o dia todo.
            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <a data-toggle="collapse" href="#faq5" className="collapsed"> Conhecer a escola ? <i
                                            className="fa fa-minus-circle"></i></a>
                                        <div id="faq5" className="collapse" data-parent="#faq-list">
                                            <p>
                                                Terças à sextas das 14h até as 18h.
            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>

                <section ref={contactRef} id="contact" className="section-bg">

                    <div className="container" data-aos="fade-up">

                        <div className="section-header">
                            <h2>Fale Conosco</h2>
                            <p>Deixe seu recado que entraremos em contato.</p>
                        </div>

                        <div className="row contact-info">

                            <div className="col-md-4">
                                <div className="contact-address">
                                    <i className="ion-ios-location-outline"></i>
                                    <h3>Endereço</h3>
                                    <address>Rua São Luiz, nº 225 - Centro - Canoas - RS - Brasil.</address>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="contact-phone">
                                    <i className="ion-ios-telephone-outline"></i>
                                    <h3>Telefone</h3>
                                    <p><a href="tel:+555130313640">+55 51 3031.3644</a></p>
                                    <p><a href="tel:+5551983500009">+55 51 9 8259.9753</a></p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="contact-email">
                                    <i className="ion-ios-email-outline"></i>
                                    <h3>E-mail</h3>
                                    <p><a href="mailto:escolainfantilalgodaodoce@hotmail.com">escolainfantilalgodaodoce@hotmail.com</a></p>
                                </div>
                            </div>

                        </div>

                        <div className="form">
                            <form action="https://formspree.io/xdokenkz" method='POST' className="php-email-form">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Nome" data-rule="minlen:4"
                                            data-msg="Por favor !, informe seu nome com no mínimo 4 caracteres." />
                                        <div className="validate"></div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input type="email" className="form-control" name="_replyto" id="email" placeholder="E-mail" data-rule="email"
                                            data-msg="Por favor !, informe seu e-mail." />
                                        <div className="validate"></div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Assunto"
                                        data-rule="minlen:4" data-msg="Por favor !, informe o assunto com no mínimo 8 caracteres." />
                                    <div className="validate"></div>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="message" rows={5} data-rule="required"
                                        data-msg="Por favor, deixe alguma mensagem para nós." placeholder="Mensagem"></textarea>
                                    <div className="validate"></div>
                                </div>
                                <div className="mb-3">
                                    <div className="loading">Carregando....</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Sua mensagem foi enviada com sucesso !. Obrigado !</div>
                                </div>
                                <div className="text-center"><button type="submit">Enviar</button></div>
                            </form>
                        </div>

                    </div>
                </section>
            </main>

            <footer id="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-3 col-md-6 footer-info">
                                <img src={`${URL}/assets/img/logo2.png`} alt="TheEvenet" />
                                <p>Trabalhamos com turmas reduzidas, proporcionando melhor qualidade de ensino. Com salas climatizadas e
                                amplo espaço para recreação, além de termos monitoramento por câmeras garantindo a segurança de seu
              filho/filha.</p>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Links úteis</h4>
                                <ul>
                                    <li><i className="fa fa-angle-right"></i> <a href="#">Home</a></li>
                                    <li><i className="fa fa-angle-right"></i> <a href="#">A Escola</a></li>
                                    <li><i className="fa fa-angle-right"></i> <a href="#">Turmas</a></li>
                                    <li><i className="fa fa-angle-right"></i> <a href="#">Cardápio</a></li>
                                    <li><i className="fa fa-angle-right"></i> <a href="#">Diversos</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Links úteis</h4>
                                <ul>
                                    <li><i className="fa fa-angle-right"></i> <a href="#">Galerias</a></li>
                                    <li><i className="fa fa-angle-right"></i> <a href="#">Vídeos</a></li>
                                    <li><i className="fa fa-angle-right"></i> <a href="#">Notícias</a></li>
                                    <li><i className="fa fa-angle-right"></i> <a href="#">Na mídia</a></li>
                                    <li><i className="fa fa-angle-right"></i> <a href="#">Contato</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-contact">
                                <h4>Entre em contato</h4>
                                <p>
                                    Rua São Luiz, nº 225<br />
                    Centro - Canoas / RS<br />
                      Brasil <br />
                                    <strong>Telefone:</strong> +55 51 3031.3644<br />
                                    <strong>Whatsapp:</strong> +55 51 98259.9753<br />
                                    <strong>E-mail:</strong> escolainfantilalgodaodoce@hotmail.com<br />
                                </p>

                                <div className="social-links">
                                    <a href="https://www.facebook.com/escolainfantilalgodaodoceemcanoas/" className="facebook"><i className="fa fa-facebook"></i></a>
                                    <a href="https://www.instagram.com/algodaodocecanoas" className="instagram"><i className="fa fa-instagram"></i></a>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="container full_footer">
                    <div className="copyright">
                        &copy; Copyright <strong>Algodão Doce Canoas</strong>. Todos os direitos reservados.
      </div>
                </div>
            </footer>
            <a href="#" className="back-to-top"><i className="fa fa-angle-up"></i></a>
        </>
    );
}

export default Home;
