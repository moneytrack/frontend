"use strict"
import React from 'react'
import update from 'react-addons-update'
import InputMoment from 'input-moment'
import moment from 'moment'

import ModalContainer from './ModalContainer'
import EditExpense from './EditExpense'
import {editExpense} from './action-creators'
import ConfirmDialog from './ConfirmDialog'

const History = React.createClass({

    getInitialState: function() {
        var now = moment();
        now.startOf('month')
        var from = now.valueOf()
        now.endOf('month')
        var to = now.valueOf()

        return {
            editingExpense: false,
            deletingExpense: false,
            filterDateFrom: from,
            filterDateTo: to,
            filterItem: now.year() + "-" + now.month()
        }
    },

    onEdit: function(id) {
        this.setState(update(this.state, {
            editingExpense: {$set: true},
            editingExpenseId: {$set: id}
        }))
    },

    onExpenseSave: function(data) {
        this.context.store.dispatch(editExpense(data));
        this.setState(update(this.state, {
            editingExpense: {$set: false},
        }))  
    },

    onExpenseEditCancel: function() {
        this.setState(update(this.state, {
            editingExpense: {$set: false},
        }))  
    },

    onFilterByYearMonth: function(year, month) {

        const m = moment().year(year).month(month)
        m.startOf('month')
        const from = m.valueOf();
        m.endOf('month')
        const to = m.valueOf();

        this.setState(update(this.state, {
            filterDateFrom: {$set: from},
            filterDateTo: {$set: to},
            filterItem: {$set: year + "-" + month}
        }))
    },

    render: function () {
        const {store} = this.context
        const {history, categoryList, waiting} = store.getState()
        const {filterDateFrom, filterDateTo, filterItem} = this.state

        function groupBy(arr, f) {
            const result = [];
            var group = null;
            var lastGroupValue = null;
            for(var i = 0; i<arr.length; ++i) {
                var next = arr[i]
                var newGroupValue = f(next)
                if(group === null || f(next) !== lastGroupValue) {
                    group = []
                    result.push(group)
                }
                group.push(next)
                lastGroupValue = newGroupValue
            }
            return result;
        }

        function collectCategoryAncestors(category) {
            var parentId = category.parentId;
            const result = [category];
            while(parentId) {
                var parent = categoryList.filter(x => x.id === parentId)[0];
                result.unshift(parent)
                parentId = parent.parentId;
            }
            return result;
        }


        const yearMonthMap = {};
        history.forEach((expense) => {
            var month = moment(expense.date).month()
            var year = moment(expense.date).year()
            if(!(year in yearMonthMap)) {
                yearMonthMap[year] = [];
            }
            if(yearMonthMap[year].indexOf(month)==-1) {
                yearMonthMap[year].push(month)
            }
        })

        const filteredHistory = history.filter((x) => x.date >= filterDateFrom && x.date <= filterDateTo)
        const sortedHistory = filteredHistory.sort((e1, e2) => e2.date - e1.date)
        const expensesByDays = groupBy(filteredHistory, (expense) => moment(expense.date).format('YYYY MM DD'))

        /*
        
            2015         2016
            ----         ----
            September    January
            October      Febuary
            November
            December

            2015   September October November December
            2016   January Febuary

            http://localhost:8080/#history/by-month/2016/Febuary
            http://localhost:8080/#history/by-year/2016
        */

        return (
            <div className="history">

                <ModalContainer visible={this.state.editingExpense}>
                    <EditExpense expenseId={this.state.editingExpenseId}
                                 onSave={this.onExpenseSave}
                                 onCancel={this.onExpenseEditCancel}/>
                </ModalContainer>

                {(filterDateFrom != 0 && filterDateTo != Number.MAX_VALUE)
                  ? (<div className="history__current-filter">
                        <span className="history__current-filter__title">Filter:</span>  <span>{
                            moment(filterDateFrom).format("MMMM Do YYYY")
                        }</span> — <span>{
                            moment(filterDateTo).format("MMMM Do YYYY")
                        }</span>
                    </div>)
                  : null
                }
                <div className="history__year-month-filter">
                {
                    Object.keys(yearMonthMap).sort((x,y) => x - y).map((year) => (
                        <div key={year}><b>{year}:</b>
                            {
                                yearMonthMap[year].sort((x,y) => x - y).map((month) => {
                                    var m = moment().month(month).year(year)
                                    if(filterItem === (year + "-" + month)) {
                                        return (<span key={month} className="history__year-month-filter__item history__year-month-filter__item--active">
                                                    {m.format("MMMM")}
                                                </span>)

                                    }
                                    else {
                                        return (<a href="#"
                                              key={month}
                                               className="pseudo history__year-month-filter__item"
                                               onClick={(e) => {e.preventDefault(); this.onFilterByYearMonth(year, month)}}>
                                                {m.format("MMMM")}
                                            </a>)
                                    }

                                })
                            }
                        </div>
                    ))
                }
                </div>

                {
                    expensesByDays.map((group) => {
                        var day = moment(group[0].date).format('MMMM Do YYYY (dddd)')
                        return (<div key={day} className="history__group">
                            <div className="history__group__title">{day}</div>
                            {
                                group.map((expense) => {
                                    const category = categoryList.filter(x => x.id === expense.categoryId)[0]

                                    const cats = collectCategoryAncestors(category).map(cat => cat.title).join(" / ")

                                    return (
                                        <div key={expense.id} className="history__expense">
                                            <div className="history__expense__time">
                                                {moment(expense.date).format("HH:mm")}
                                            </div>
                                            <div>
                                                <div  className="history__expense__first-line">
                                                    <div className="history__expense__amount">
                                                        {expense.amount / 100} &#8381;
                                                    </div>
                                                    <div  className="history__expense__category">
                                                       {' '} — {cats}
                                                    </div>
                                                </div>
                                                <div  className="history__expense__comment">
                                                    {expense.comment}
                                                </div>
                                            </div>
                                            <div  className="history__expense__controls" >
                                                <a href="#" className="pseudo warning" onClick={(e) => {e.preventDefault(); this.props.onDelete(expense.id)}}>Delete</a>
                                                <a href="#" className="pseudo" onClick={(e) => {e.preventDefault(); this.onEdit(expense.id); }}>Edit</a>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>)
                    })
                }
            </div>
        )
    }
})

History.contextTypes = {
    store: React.PropTypes.object
}

export default History
