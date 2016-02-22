"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'


import Keyboard from './Keyboard'
import Header from './Header'
import PseudoInput from './PseudoInput'
import CategoryPicker from './CategoryPicker'
import DateTimePicker from './DateTimePicker'

function fixSafaryDelay(el) {
    el.addEventListener("touchend", (e) => {
        var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        el.dispatchEvent(event)
    })
}

const Root = React.createClass({

    render: function () {

        return (
            <div className="root">
                <PseudoInput value={41.99}/>
                <Keyboard/>
                <input  className="comment" ref={fixSafaryDelay}/>
                <CategoryPicker />
                <DateTimePicker />
                <button className="add-button"  ref={fixSafaryDelay}>Add</button>
            </div>
        )
    }

})

Root.contextTypes = {
    store: React.PropTypes.object
}

export default Root
