"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

import Queue from './Queue'
import SystemMenu from './SystemMenu'
import ModalContainer from '../presentational/ModalContainer'
import Tappable from 'react-tappable';

const Header = React.createClass({

    getInitialState: function() {
        return {
            showQueue: false,
            showSystemMenu: false,
        }
    },

    showHideQueue: function() {
        this.setState({
            showQueue: !this.state.showQueue
        })
    },

    showSystemMenu: function() {
        this.setState({
            showSystemMenu: !this.state.showSystemMenu
        })
    },

    render: function () {
        const {queue} = this.context.store.getState();
        return (
            <div className="header">
                <div className="header__placeholder"></div>
                <div className="header__body">
                    <Tappable component="div" className='header__hamburger' onTap={this.showSystemMenu}><i className="icon icon-reorder icon1x"></i></Tappable>
                    {
                        (this.state.showSystemMenu)
                            ? (
                            <ModalContainer>
                                <SystemMenu />
                                <button onClick={this.showSystemMenu}>Close</button>
                            </ModalContainer>
                        )
                            : null
                    }

                    <div onClick={this.showHideQueue} className='header__queue-status'>Queue: {queue.length}</div>
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
                    <div className='header__separator'></div>
                    <div className='header__net-status'>Online</div>
                </div>
            </div>
        )
    }

})

Header.contextTypes = {
    store: React.PropTypes.object
}

export default Header
