"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

import Tappable from 'react-tappable';

const Keyboard = React.createClass({

    onTap: function(e) {
        this.props.onInput(e.currentTarget.getAttribute('data-value'));
    },

    render: function () {
        return (
            <div className="keyboard" >
                <div className="keyboard__row">
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="1">1</Tappable>
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="2">2</Tappable>
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="3">3</Tappable>
                </div>
                <div className="keyboard__row">
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="4">4</Tappable>
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="5">5</Tappable>
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="6">6</Tappable>
                </div>
                <div className="keyboard__row">
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="7">7</Tappable>
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="8">8</Tappable>
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="9">9</Tappable>
                </div>
                <div className="keyboard__row">
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value=".">.</Tappable>
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="0">0</Tappable>
                    <Tappable onTap={this.onTap} component="div" className="keyboard__key" data-value="BACKSPACE"><i className="icon icon-arrow_left icon1x"></i></Tappable>
                </div>
            </div>
        )
    }

})

Keyboard.BACKSPACE = 'BACKSPACE'
Keyboard.DOT = '.'
Keyboard.IS_NUMBER = (key) => (key === '0' || key === '1' || key === '2' || key === '3'
        || key === '4' || key === '5' || key === '6' || key === '7' || key === '8' || key === '9')

export default Keyboard
