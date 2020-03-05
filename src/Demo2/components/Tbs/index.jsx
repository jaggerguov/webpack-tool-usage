import React,{ Component } from 'react';
import pic from '../../images/pic.jpg';

class Tbs extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <div className='container'>
                <h1>demo2</h1>
                <img src={pic} alt="图片"/>
            </div>
        )
    }
}

export default Tbs;