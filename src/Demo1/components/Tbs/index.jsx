import React,{ Component } from 'react';
import pic from '../../images/pic.jpg';
import './index.less';

class Tbs extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <div className='container'>
                <h1>demo1</h1>
                <img src={pic} alt="图片" className='pic-box'/>
            </div>
        )
    }
}

export default Tbs;