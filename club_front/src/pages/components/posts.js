import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import '../../styles/pages/posts.css';

import Item from './List/item';

export default function posts ({dados}){
    return (
            <div class="row">
                <div class="col s12 m10 l8 offset-m2 offset-l3"><br></br>
                    
                    <ul>
                        
                        <div class="row">
                        <li class="col s12 m3 l3 center">
                            <div className="col s8 m12 l12 cardLogo">
                                <Item dados={dados}></Item>
                            </div>
                        </li>
                        <li class="col s12 m3 l3 center"> 
                        <div className="col s8 m12 l12 cardLogo">
                                <Item dados={dados}></Item>
                            </div>
                        </li>
                        <li class="col s12 m3 l3 center">
                        <div className="col s8 m12 l12 cardLogo">
                                <Item dados={dados}></Item>
                            </div>
                        </li>
                        </div>
                    </ul>
                    </div>
                </div>
            
    );
}