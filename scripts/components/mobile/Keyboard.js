"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

import {fastClick} from './helpers'

const Keyboard = React.createClass({

    onInput: function(key) {
        this.props.onInput(key)
    },

    render: function () {
        return (
            <div className="keyboard">
                <div className="keyboard__row">
                    <div className="keyboard__key" ref={fastClick(() => this.onInput(1))} >1</div>
                    <div className="keyboard__key" ref={fastClick(() => this.onInput(2))} >2</div>
                    <div className="keyboard__key" ref={fastClick(() => this.onInput(3))} >3</div>
                </div>
                <div className="keyboard__row">
                    <div className="keyboard__key" ref={fastClick(() => this.onInput(4))}>4</div>
                    <div className="keyboard__key" ref={fastClick(() => this.onInput(5))}>5</div>
                    <div className="keyboard__key" ref={fastClick(() => this.onInput(6))}>6</div>
                </div>
                <div className="keyboard__row">
                    <div className="keyboard__key" ref={fastClick(() => this.onInput(7))}>7</div>
                    <div className="keyboard__key" ref={fastClick(() => this.onInput(8))}>8</div>
                    <div className="keyboard__key" ref={fastClick(() => this.onInput(9))}>9</div>
                </div>
                <div className="keyboard__row">
                    <div className="keyboard__key" ref={fastClick(() => this.onInput('.'))}>.</div>
                    <div className="keyboard__key" ref={fastClick(() => this.onInput(0))}>0</div>
                    <div className="keyboard__key" ref={fastClick(() => this.onInput('BACKSPACE'))}>b</div>
                </div>
            </div>
        )
    }

})

Keyboard.BACKSPACE = 'BACKSPACE'
Keyboard.DOT = '.'

export default Keyboard
