import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

import '../styles/tools.css';
import '../styles/pages/posts.css';
import '../styles/pages/vouchers.css';

import CardAdverts from './components/cardAdverts';

// import CardVouchers from './components/cardVouchers';
import Header from './components/header';
import NavigationBusiness from './components/navigationBusiness';
import SearchBarVouchers from './components/searchBarVouchers';
import Button from './components/buttonVouchers';
import Source from './components/source';
import Carousel from 'react-elastic-carousel';
import List from './components/List/index';

import Card from './tools/Card';



import img1 from '../img/carousel/img-1.jpg';
import img2 from '../img/carousel/img-2.jpg';
import img3 from '../img/carousel/img-3.jpg';

export default function Panel() {

    const { authenticated } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        if (!authenticated) {
            history.push('/');
        }
        loadAdverts();
        loadDataAssociate();

    }, []);
    const [adverts, setAdverts] = useState([]);
    const [allAdverts, setAllAdverts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(0);
    const [advertsPerPage] = useState(4);

    const loadAdverts = async () => {
        const response = await fetch('https://raw.githubusercontent.com/BestBuyAPIs/open-data-set/master/products.json');
        const adverts = await response.json();
        setAdverts(adverts.slice(page, advertsPerPage));
        setAllAdverts(adverts);
    }

    function loadMoreAdverts() {
        const nextPage = page + advertsPerPage;
        const nextAdverts = allAdverts.slice(nextPage, nextPage + advertsPerPage);
        adverts.push(...nextAdverts);
        setAdverts(adverts);
        setPage(nextPage);
    }

    function handleChange(e) {
        const { value } = e.target;
        setSearchValue(value);
    }


    const noMoreAdverts = page + advertsPerPage >= allAdverts.length;
    const filteredAdverts = !!searchValue ? adverts.filter(adverts => {
        return adverts.name.toLowerCase().includes(searchValue.toLowerCase());
    }) : adverts;

    const loadDataAssociate = async () => {
        const tokenHeader = api.defaults.headers.Authorization;
        api.get('/painel', {
            params: {
                authHeader: tokenHeader
            }
        }).then((result) => {
            console.log(result)
        }).catch(function (err) {
            console.log(err)
        })
    }


    return (
        <div>
            <body id="containerBox">
                <main id='main'>
                    <header>
                        <Header />
                        <NavigationBusiness
                            home={'/eu_compro/painel'}
                            routerBusines={'/eu_compro/vendedores'} 
                            nameBusines={'Lojas'}
                            perfil={'/eu_compro/perfil'}
                        />

                        <SearchBarVouchers onChange={handleChange} value={searchValue} />
                    </header>
                    <List />
                    <section id="items-wrapper">
                        <Carousel /*breakPoints={breakPoints}*/>
                            <Card Img={img1} />
                            <Card Img={img2} />
                            <Card Img={img3} />
                        </Carousel>
                    </section>

                    <div id="titleSection">
                        {!!searchValue && (
                            <>
                                <br></br><p>Pesquisa: {searchValue}</p>
                            </>
                        )}

                        {filteredAdverts.length === 0 && (
                            <p>Ainda não existem vouchers =(</p>
                        )}
                        
                    </div>

                    <div id="cards">

                        {filteredAdverts.length > 0 && (
                            <div className="SectionCards">
                                {filteredAdverts.map(adverts => (
                                    
                                    <CardAdverts 
                                        id={adverts.id}
                                        image={adverts.image} 
                                        name={adverts.name} 
                                        description={adverts.description}  
                                        price={adverts.price}  
                                        className="cardAlinhamento"
                                    />
                                
                                ))}
                            </div>
                        )}
                       
                    </div>

                    <footer>
                        {!searchValue && (
                            <Button
                                textButton="Carregue mais Anúncios"
                                onClick={loadMoreAdverts}
                                disabled={noMoreAdverts}
                            />
                        )}

                    </footer>


                </main>
            </body>

                           

        </div>

    )
}
