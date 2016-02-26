"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

import Tappable from 'react-tappable';

const Keyboard = React.createClass({

    onInput: function(key) {
        this.props.onInput(key)
    },

    onTap: function(e) {
        this.props.onInput(e.target.getAttribute('data-value'));
    },

    render: function () {
        return (
            <Tappable onTap={this.onTap} className="keyboard" component="div">
                <div className="keyboard__row">
                    <div className="keyboard__key" data-value="1">1</div>
                    <div className="keyboard__key" data-value="2">2</div>
                    <div className="keyboard__key" data-value="3">3</div>
                </div>
                <div className="keyboard__row">
                    <div className="keyboard__key" data-value="4">4</div>
                    <div className="keyboard__key" data-value="5">5</div>
                    <div className="keyboard__key" data-value="6">6</div>
                </div>
                <div className="keyboard__row">
                    <div className="keyboard__key" data-value="7">7</div>
                    <div className="keyboard__key" data-value="8">8</div>
                    <div className="keyboard__key" data-value="9">9</div>
                </div>
                <div className="keyboard__row">
                    <div className="keyboard__key" data-value=".">.</div>
                    <div className="keyboard__key" data-value="0">0</div>
                    <div className="keyboard__key" data-value="BACKSPACE">b</div>
                </div>
            </Tappable>
        )
    }

})

Keyboard.BACKSPACE = 'BACKSPACE'
Keyboard.DOT = '.'
Keyboard.IS_NUMBER = (key) => (key === '0' || key === '1' || key === '2' || key === '3'
        || key === '4' || key === '5' || key === '6' || key === '7' || key === '8' || key === '9')

export default Keyboard
