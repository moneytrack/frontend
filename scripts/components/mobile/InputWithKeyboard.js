"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'


import Keyboard from './Keyboard'
import AmountInput from './AmountInput'

const InputWithKeyboard = React.createClass({

    getInitialState: function() {
        return {
            amount: "0"
        }
    },

    onKeyboardInput: function(key) {
        var oldValue = this.props.value;
        var value = oldValue
        if(Keyboard.IS_NUMBER(key)) {
            value = oldValue + key.toString()
        }
        else if(key === Keyboard.BACKSPACE) {
            if( oldValue.length > 1 ) {
                value = oldValue.substring(0, oldValue.length - 1);
            }
            else {
                value = "0"
            }
        }
        else if(key === Keyboard.DOT) {
            if(oldValue.indexOf(key) == -1) {
                value = oldValue + key;
            }
        }

        if(value !== "0" && value.startsWith("0") && !value.startsWith("0.")) {
            value = value.substring(1)
        }
        if(value.indexOf(".") != -1 ) {
            if(value.substring(value.indexOf(".")).length > 3) {
                value = oldValue.substring(0, oldValue.length);
            }
        }

        this.props.onChange(value)
    },

    render: function () {

        return (
            <div className="input-with-keyboard">
                <AmountInput value={this.props.value}/>
                <Keyboard onInput={this.onKeyboardInput}/>
            </div>
        )
    }

})


export default InputWithKeyboard
