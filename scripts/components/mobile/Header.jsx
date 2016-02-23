"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

const Header = React.createClass({

    render: function () {
        const {queue} = this.context.store.getState();
        return (
            <div className="header">
                <i className="icon fa fa-bars"></i>
                <div>Queue: {queue.length}</div>
            </div>
        )
    }

})

Header.contextTypes = {
    store: React.PropTypes.object
}

export default Header
