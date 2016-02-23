"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'


import InputWithKeyboard from './InputWithKeyboard'
import Header from './Header'
import CategoryPicker from './CategoryPicker'
import DateTimePicker from './DateTimePicker'



const Root = React.createClass({

    createState: function() {
        const {rootCategoryId, categoryList} = this.context.store.getState()
        let rootCategoryList = categoryList.sort((c1,c2) => c1.order - c2.order).filter(x => x.parentId === rootCategoryId)
        let firstCategoryId = rootCategoryList.length > 0 ? rootCategoryList[0].id : -1;

        return {
            amount: "0",
            date: moment(),
            categoryId: firstCategoryId,
            comment: ""
        }
    },

    // todo: this code isn't good: user could remove first category
    getInitialState: function() {
        return this.createState()
    },

    componentDidMount: function() {
        this.unsubscribe = this.context.store.subscribe(() => {
            this.setState(this.createState(), () => {
                this.forceUpdate()
            })
        })
    },


    onAmountChange: function(amount) {
        this.setState({amount})
    },

    onAdd: function() {

    },

    render: function () {
        return (
            <div className="root">
                <Header/>
                <InputWithKeyboard  value={this.state.amount} onChange={this.onAmountChange}/>
                <input className="comment" value={this.state.comment} />
                <CategoryPicker value={this.state.categoryId}/>
                <DateTimePicker value={this.state.date} />
                <button className="add-button" onAdd={this.onAdd} >Add</button>
            </div>
        )
    }

})

Root.contextTypes = {
    store: React.PropTypes.object
}

export default Root
