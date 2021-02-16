import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Logo from './components/Logo'
import Header from '../Header'
import DarkLightBtn from '../DarkLightBtn'
import Footer from '../Footer'
import axios from 'axios'
import $ from 'jquery'
import { isEmptyObject } from 'jquery';
import { BASE_URL } from '../../constants/API'

const Home = () => {
    const [search, setSearch] = useState('')
    const [logosList, setLogosList] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [buttonLoadIsVisible, setButtonLoadIsVisible] = useState(true)
    const [page, setPage] = useState(0);

    useEffect(() => {
        // Search Form
        $(".crt-search-btn i").on("click", function () {
            $(".crt-header-content > div").css("opacity", "0.0");
            $(".crt-header-search").css({ "display": "block", "opacity": "1.0" });
            $(".crt-header-search input[type='text']").focus();
        });
        $(".crt-header-search input[type='button']").on("click", function () {
            // - On nettoie le champ de recherche
            $(".crt__search-item").val('');
            // - Recuperation des 32 premiers logos
            getAllLogos()
            $(".crt-header-content > div").css("opacity", "1.0");
            $(".crt-header-search").css({ "display": "none" });
        });
        // - Recuperation des 32 premiers logos
        getAllLogos()

    }, [])

    useEffect(() => {
        // - Stopper s'il y'a déjà une requête en cours
        if (isFetching) return
        // - Lancer la requete 1/2 seconde après la saisie de l'utilisateur
        // - cela évite de lancer la requete après chaque touche tapée
        const timer = setTimeout(() => {
            setButtonLoadIsVisible(true);
            // - Requête de récupération
            axios.get(`${BASE_URL}/search-logos/${search}`)
            .then(function (response) {
                setPage(1)
                setLogosList(() => {
                    return response.data.data;
                });
                (response.data.data.length<32) && setButtonLoadIsVisible(false)
            })
            .catch(function (error) {
                console.log(error);
            });
        }, 500);
        // - Toujours nettoyer le setTimeout
        return () => clearTimeout(timer);
    }, [search]);

    const getAllLogos = () => {
        // - On vérifie si une recherche n'est pas en cours
        var url =''
        if (search==null || search==undefined || search=='') {
            url = `${BASE_URL}/logos/page/${page}`
        }else {
            url = `${BASE_URL}/search-logos/${search}/page/${page}`
        }
        setIsFetching(true);
        // - Requête de récupération
        axios.get(url)
        .then(function (response) {
            setPage(page + 1)
            setLogosList(() => {
                return [...logosList, ...response.data.data]
            });
            setIsFetching(false);
            // - Cacher le bouton quand il s'agit des derniers éléments de la bd
            (response.data.data.length<32) && setButtonLoadIsVisible(false)
        })
        .catch(function (error) {
            setIsFetching(false)
            console.log('error', error)
        });
        // - Cacher le loader de la page
        $(".crt-loader").fadeOut();
    }

    return (
        <>
            <div className="crt-loader">
                <div>
                    <h1>CI Logos</h1>
                    <img src="assets/images/oval.svg" alt="Loading" />
                    <p>Powered By CreativeTeam</p>
                </div>
            </div>
            <div className="crt-background">
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
                <div className="crt-background-item"></div>
            </div>
            <div className="crt-wrapper">
                {/* <div className="crt-theme-style">
                    <a href="javascript:;">Dark Mode</a>
                </div> */}
                <DarkLightBtn/>

                <Header searchVisible={true} setSearch={setSearch}/>

                <div className="crt-main">
                    <div className="crt-main__title">
                        <div className="crt-main__title-img">
                            <img src="assets/images/logo.png" />
                        </div>
                        <h1>
                            CI Logos, une collection <a href="#" target="_blank">open source</a> de logos d'entreprise ivoiriennes de haute qualité pour une utilisation gratuite.
                        </h1>
                        <button className="crt__btn__contribute">
                            <i className="fa fa-github"></i>
                            &nbsp;
                            Contribuer sur GitHub
                        </button>
                        <a style={{ marginLeft: 20 }} href="#">
                            <Link to='/submit-logo'>
                                <button className="crt__btn__submission">
                                    <i className="fa fa-paper-plane"></i>
                                    &nbsp;
                                    Soumettre un logo
                                </button>
                            </Link>
                        </a>
                    </div>

                    {
                        !isEmptyObject(logosList) 
                        ? logosList.map(logo => <Logo data={logo} />) 
                        : (
                            <div style={{ marginTop: 40, marginBottom: 100, textAlign: 'center', width: '100%' }}>
                                <h1 style={{ fontSize: 30 }}>Aucun logo ne correspond à votre recherche.</h1>
                                <p style={{ marginTop: 10 }}>Il se pourrait que l'entreprise que vous rechercher n'existe as encore sur notre site.</p>
                                <img style={{ marginTop: 50 }} width={300} src="assets/images/search_no_found.svg" alt="Logo Not Found" />
                            </div>
                        )
                    }
                    
                </div>
                {
                    buttonLoadIsVisible && (
                        <div style={{marginBottom:50,marginTop:50}}  className='row justify-content-center'>
                            <div style={{width:250, margin:'auto'}}>
                                <button disabled={isFetching} onClick={getAllLogos} style={{width:250, padding:10, fontWeight:'bold', backgroundColor:'#F9F9F9', borderRadius:5,border:'2px solid black',cursor:'pointer'}}>
                                    Afficher plus
                                </button>
                            </div>
                        </div>
                    ) 
                }

                <Footer/>

            </div>
        </>
    );
}

export default Home;
