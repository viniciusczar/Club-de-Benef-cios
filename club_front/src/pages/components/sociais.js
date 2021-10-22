import React from 'react';
import '../../styles/components/sociais.css';

import faceLogo from '../../img/face-logo.png';
import instaLogo from '../../img/insta-logo.png';
import linkedinLogo from '../../img/linkedin-logo.png';

export default function Sociais(){
    return(
        <div id="container_socials">
            <div class="row">
                <div class="col s2 m4 l9"></div>
                <div class="col s8 m4 l2">
                    <div class="row">
                        <div class="col s3 m2 l3"></div>
                        <div class=" col s2 m3 l3">
                            <a href="https://www.facebook.com/sicoobcredcoop/">
                                <img class="social" width="100%" src={faceLogo} />
                            </a>
                        </div>
                        <div class="col s2 m3  l3 ">
                            <a href="https://www.instagram.com/sicoobcredcoop/">
                                <img class="social" width="100%" src={instaLogo} />
                            </a>
                        </div>
                        <div class="col s2 m3 l3 ">
                            <a href="https://br.linkedin.com/company/sicoob-credcoop">
                                <img class="social" width="100%" src={linkedinLogo} />
                            </a>
                        </div>
                    </div>

                </div>
                </div>
        </div>
        
    )
}