"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'


import InputWithKeyboard from './InputWithKeyboard'
import Header from './Header'
import CategoryPicker from './CategoryPicker'
import DateTimePicker from './DateTimePicker'

const Root = React.createClass({

    getInitialState: function() {
        return {
            amount: "0"
        }
    },

    onAmountChange: function(amount) {
        this.setState({amount})
    },

    render: function () {

        return (
            <div className="root">
                <Header/>
                <InputWithKeyboard  value={this.state.amount} onChange={this.onAmountChange}/>
                <input  className="comment" />
                <CategoryPicker />
                <DateTimePicker />
                <button className="add-button" >Add</button>
            </div>
        )
    }

})

Root.contextTypes = {
    store: React.PropTypes.object
}

export default Root
