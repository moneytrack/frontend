"use strict"
import React from 'react'

import money from '../../money'

const AmountInput = React.createClass({

    render: function () {
        const {userSettings} = this.context.store.getState()
        const {currency} = userSettings
        const format = money.formatString(money.settings.byCurrency[currency]);

        return (
            <div className="amount-input">{format(this.props.value)}</div>
        )
    }

})

AmountInput.contextTypes = {
    store: React.PropTypes.object
}

export default AmountInput
