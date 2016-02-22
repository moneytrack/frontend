"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

const AmountInput = React.createClass({

    render: function () {
        return (
            <div className="amount-input">
                <input  className="amount-input__input" value="41.99" readOnly={true}/>
            </div>
        )
    }

})

AmountInput.contextTypes = {
    store: React.PropTypes.object
}

export default AmountInput
