/*
 * @Author: g05047
 * @Date: 2020-03-05 20:13:11
 * @LastEditors: g05047
 * @LastEditTime: 2020-03-08 15:12:57
 * @Description: file content
 */

import React, { Component } from 'react'
import pic from '../../images/pic.jpg'

class Tbs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    sum() {
        let a = 10
        if (a == 1) {

        }
    }
    /**
     * @method: 
     * @param {type} 
     * @return: 
     */
    dec = a => {

    }
    render() {
        return (
            <div className='container'>
                <h1>demo2</h1>
                <img src={pic} alt="图片" />
            </div>
        )
    }
}

export default Tbs;