/*
 * @Author: g05047
 * @Date: 2020-03-05 19:47:44
 * @LastEditors: g05047
 * @LastEditTime: 2020-03-08 15:12:25
 * @Description: file content
 */

import React, { Component } from 'react';
import pic from '../../images/pic.jpg';
import './index.less';
class Tbs extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.des = "123"
    }
    render() {
        return (
            <div className='container'>
                <h1>demo1</h1>
                <img src={pic} alt="图片" className='pic-box' />
            </div>
        )
    }
}

export default Tbs;