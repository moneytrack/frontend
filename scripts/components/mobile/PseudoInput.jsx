"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

const PseudoInput = React.createClass({

    render: function () {
        return (
            <div className="amount-input">{this.props.value}</div>
        )
    }

})

export default PseudoInput
