import React, {useState, useEffect, useContext} from 'react';
import Header from './components/header';
import NavigationBusiness from './components/navigationBusiness';
import CardVouchers from './components/cardVouchers';
import Button from './components/buttonVouchers';
import SearchBarVouchers from './components/searchBarVouchers';

import '../styles/pages/vouchers.css';
import { Context } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function Vouchers() {

    const { authenticated } = useContext(Context); 
    const history = useHistory();

    const [ vouchers, setVouchers ] = useState([]);
    const [ allVouchers, setAllVouchers ] = useState([]);
    const [ searchValue, setSearchValue ] = useState('');
    const [ page, setPage ] = useState(0);
    const [ vouchersPerPage ] = useState(4);

    useEffect(() => {
        if(!authenticated) {
            history.push('/');
        }
        loadVouchers();
    }, [])


    const loadVouchers = async() => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const vouchers = await response.json();
        setVouchers(vouchers.slice(page, vouchersPerPage));
        setAllVouchers(vouchers);
    }

    function loadMoreVouchers () {
        const nextPage = page + vouchersPerPage;
        const nextVouchers = allVouchers.slice(nextPage, nextPage + vouchersPerPage);
        vouchers.push(...nextVouchers);
        setVouchers(vouchers);
        setPage(nextPage);
    }

    function handleChange(e) {
        const {value} = e.target;
        setSearchValue(value);
    }

    const noMoreVouchers = page + vouchersPerPage >= allVouchers.length;
    const filteredVouchers = !!searchValue ? vouchers.filter(voucher => {
        return voucher.name.toLowerCase().includes(searchValue.toLowerCase());
    }) : vouchers;

    return(

        <div>
            <header>
            <Header/>
            <NavigationBusiness />
                {!!searchValue && (
                    <>
                        <br></br><p>Pesquisa: {searchValue}</p>
                    </>
                )}
            </header>
            <body>
                
            <SearchBarVouchers onChange={handleChange} value={searchValue}/>

            {filteredVouchers.length > 0 && (
                    <div className="containerVoucher">
                    {filteredVouchers.map(voucher => (
                        <CardVouchers id={voucher.id} name={voucher.name} className="cardAlinhamento"/>
                    ))}
                    </div>
            )}

            {filteredVouchers.length === 0 && (
                    <p>Ainda não existem vouchers =(</p>
            )}
            
        </body>
        <footer>
            {!searchValue && (
                <Button 
                textButton="Carregue mais Vouchers"
                onClick={loadMoreVouchers}
                disabled={noMoreVouchers}
                />
            )}
            
        </footer>
        </div>
    )
}