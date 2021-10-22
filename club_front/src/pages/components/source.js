import React, {Component} from 'react';

/*export default class Source extends Component{
    constructor(props) {
        super(props)
    }

    state= {
        sourcers: [],
    }
}*/

export default function Source() {
    return(
        <div className="row">
            <nav>
            <div class="nav-wrapper">
            <form>
                <div class="input-field">
                <input id="search" type="search" required />
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
                </div>
            </form>
            </div>
            </nav>   
        </div>



        
    )
}
