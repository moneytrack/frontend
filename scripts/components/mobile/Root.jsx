"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'


import Keyboard from './Keyboard'
import AmountInput from './AmountInput'

const Root = React.createClass({

    render: function () {
        return (
            <div className="root">
                <AmountInput/>
                <Keyboard/>
            </div>
        )
    }

})

Root.contextTypes = {
    store: React.PropTypes.object
}

export default Root
