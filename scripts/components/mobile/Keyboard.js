"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

const Keyboard = React.createClass({

    render: function () {
        return (
            <div className="keyboard">
                <div className="keyboard__row">
                    <div className="keyboard__key">1</div>
                    <div className="keyboard__key">2</div>
                    <div className="keyboard__key">3</div>
                </div>
                <div className="keyboard__row">
                    <div className="keyboard__key">4</div>
                    <div className="keyboard__key">5</div>
                    <div className="keyboard__key">6</div>
                </div>
                <div className="keyboard__row">
                    <div className="keyboard__key">7</div>
                    <div className="keyboard__key">8</div>
                    <div className="keyboard__key">9</div>
                </div>
                <div className="keyboard__row">
                    <div className="keyboard__key">.</div>
                    <div className="keyboard__key">0</div>
                    <div className="keyboard__key">b</div>
                </div>
            </div>
        )
    }

})

export default Keyboard
