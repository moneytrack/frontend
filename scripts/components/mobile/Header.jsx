"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

import Queue from './Queue'
import ModalContainer from '../presentational/ModalContainer'

const Header = React.createClass({

    getInitialState: function() {
        return {
            showQueue: false
        }
    },

    showHideQueue: function() {
        this.setState({
            showQueue: !this.state.showQueue
        })
    },

    render: function () {
        const {queue} = this.context.store.getState();
        return (
            <div className="header">
                <i className="icon fa fa-bars"></i>
                <div onClick={this.showHideQueue}>Queue: {queue.length}</div>
                {
                    (this.state.showQueue)
                    ? (
                        <ModalContainer>
                            <Queue/>
                            <button onClick={this.showHideQueue}>Close</button>
                        </ModalContainer>
                      )
                    : null
                }
            </div>
        )
    }

})

Header.contextTypes = {
    store: React.PropTypes.object
}

export default Header
