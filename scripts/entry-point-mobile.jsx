"use strict"
/**
 * --------------------------------------------------------------------
 * Copyright 2015 Nikolay Mavrenkov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * --------------------------------------------------------------------
 *
 * Author:  Nikolay Mavrenkov <koluch@koluch.ru>
 * Created: 01.11.2015 23:04
 */
import {Promise} from 'es6-promise'
import React from 'react'
import ReactDOM from 'react-dom'
import update from 'react-addons-update'
import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux'
import moment from 'moment'
import {FastClick} from 'fastclick';

import ajax from './ajax'
import Root from './components/mobile/Root.jsx'
import {find} from './arrays'
import {updateState,offline,online, unauthorized} from './action-creators'

if(window.context.env === "PROD" && window.location.protocol === "http:") {
    window.location.href = window.location.href.replace(/^http/, "https")
}

const DISPATCH_URL = window.context.backend_url + "/dispatch"

function restoreState() {
    var item = window.localStorage.getItem("reduxState");
    if(item === null) {
        return {
            "seq": 0,
            "offline": false,
            "unauthorized": false,
            "queue": [],
            "history": [],
            "rootCategoryId": null,
            "categoryList": [],
            "userSettings": {"currency": "USD", "firstDayOfWeek": "SUNDAY"}
        }
    }
    else {
        return JSON.parse(item)
    }
}

function saveState(state) {
    window.localStorage.setItem("reduxState", JSON.stringify(state))
    return state;
}

const initState = restoreState()

const reducer = (state = initState, action) => {
    const {type, status} = action
    switch(type) {
        case 'UPDATE_STATE': {
            return Object.assign({}, state, action.newState)
        }

        case 'OFFLINE': {
            return Object.assign({}, state, {
                offline: true
            })
        }

        case 'ONLINE': {
            return Object.assign({}, state, {
                offline: false
            })
        }

        case 'QUEUE_PUSH': {
            const {data} = action
            var newSeq = state.seq + 1;
            const task = {
                id: newSeq,
                data
            }
            return Object.assign({}, state, {
                seq: newSeq,
                queue: state.queue.concat([task])
            })
        }

        case 'QUEUE_POP': {
            return Object.assign({}, state, {
                queue: state.queue.slice(1)
            })
        }

        case 'QUEUE_REMOVE': {
            const {id} = action
            return Object.assign({}, state, {
                queue: state.queue.filter(x => x.id !== id)
            })
        }

        case 'WAIT': {
            return update(state, {
                waiting: {$set:true},
            })
        }

        case 'STOP_WAIT': {
            return update(state, {waiting: {$set:false} })
        }

        case 'UNAUTHORIZED': {
            return update(state, {unauthorized: {$set:action.value} })
        }

        case 'NEW_EXPENSE': {
            const amount = parseFloat(action.amount)
            const categoryId = parseInt(action.categoryId)
            const comment = action.comment;
            const id = action.id
            const date = moment(action.date).valueOf()

            const valid = !isNaN(amount) && state.categoryList.filter((x) => x.id === categoryId).length > 0;
            if(valid) {
                return update(state, {
                    history: {$push: [{
                        id,
                        amount,
                        categoryId,
                        comment,
                        date
                    }]}
                })
            }
            else {
                console.error("Invalid action", action)
                return;
            }
            //todo: handle "failed" case
        }

        case 'EDIT_EXPENSE': {
            const id = action.id
            const amount = parseFloat(action.amount)
            const categoryId = parseInt(action.categoryId)
            const comment = action.comment;
            const date = moment(action.date).valueOf()

            let newHistory = state.history.map((expense) => {
                if(expense.id === id) {
                    return {id, amount, categoryId, comment, date}
                }
                else {
                    return expense
                }
            })

            return update(state, {
                history: {$set: newHistory}
            })
            //todo: handle "failed" case
        }


        case 'DELETE_EXPENSE': {
            return update(state, {
                history: {$set: state.history.filter(expense => expense.id !== action.id)}
            })
            //todo: handle "failed" case
        }

        case 'NEW_CATEGORY': {
            const id = parseFloat(action.id)
            const title = action.title
            const parentId = action.parentId

            const newCategory = {
                id,
                title,
                parentId,
                childIdList: []
            }

            let newCategoryList = state.categoryList.map(category => {
                if(category.id === parentId) {
                    return update(category, {
                        childIdList: {$push: [id]}
                    })
                }
                else {
                    return category;
                }
            })
            newCategoryList = newCategoryList.concat([newCategory])

            return update(state, {
                categoryList: {$set: newCategoryList},
            })
            //todo: handle "failed" case
        }

        case 'EDIT_CATEGORY': {
            const id = parseFloat(action.id)
            const title = action.title
            const parentId = action.parentId

            let newCategoryList = state.categoryList;

            if(title !== null) {
                newCategoryList = newCategoryList.map(category => {
                    if(category.id === id) {
                        return update(category, {
                            title: {$set: title}
                        })
                    }
                    else {
                        return category
                    }
                })
            }
            if (parentId !== null) {
                const category = state.categoryList.filter(x => x.id == id)[0]
                const oldParentId = category.parentId;
                if (oldParentId !== parentId) {
                    newCategoryList = newCategoryList.map(category => {
                        if (category.id === id) {
                            return update(category, {
                                parentId: {$set: parentId}
                            })
                        }
                        if (category.id === oldParentId) {
                            let newChildIdList = category.childIdList.filter(x => x !== id);
                            return update(category, {
                                childIdList: {$set: newChildIdList}
                            })
                        }
                        else if (category.id === parentId) {
                            let newChildIdList = category.childIdList.concat([id]);
                            return update(category, {
                                childIdList: {$set: newChildIdList}
                            })
                        }
                        return category
                    })
                }
            }

            return update(state, {
                categoryList: {$set: newCategoryList}
            })
            //todo: handle "failed" case
        }

        case 'DELETE_CATEGORY': {
            const id = action.id

            const category = state.categoryList.filter(x => x.id == id)[0]
            const parentId = category.parentId

            let newCategoryList = state.categoryList
                .filter(category => category.id !== id)
                .map(category => {
                    if(category.id === parentId) {
                        return update(category, {
                            childIdList: {$set: category.childIdList.filter(x => x !== action.id)}
                        })
                    }
                    else {
                        return category;
                    }
                })

            return update(state, {
                categoryList: {$set: newCategoryList},
            })
            //todo: handle "failed" case
        }

        case 'SET_CURRENCY': {
            const {currency} = action
            return update(state, {
                userSettings: {
                    currency: {$set: currency}
                }
            })
        }

        case 'SET_FIRST_DAY_OF_WEEK': {
            const {firstDayOfWeek} = action
            return update(state, {
                userSettings: {
                    firstDayOfWeek: {$set: firstDayOfWeek}
                }
            })
        }

        default:
        {
            if(action.type !== "@@redux/INIT") {
                console.warn("Unhandled action", action);
            }
        }
    }
    return state
}

const reducerWithSave = (state, action) => saveState(reducer(state, action)) // todo: implement as middleware

const store = applyMiddleware(thunkMiddleware, createLogger())(createStore)(reducerWithSave)


window.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
    ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
        document.getElementById("react")
    )
});


// Try update initial state
store.dispatch(unauthorized({unauthorized:false}))
ajax.get(DISPATCH_URL).then((response) => {
    store.dispatch(updateState({newState:response}))
}, (err) => {
    if(err.code === 403) {
        store.dispatch(unauthorized({value:true}))
    }
    else {
        console.error(err)
        console.error("Failed to load state, use default state");
    }
})

// Todo: check in different browswers
window.addEventListener('online', () => store.dispatch(online()));
window.addEventListener('offline', () => store.dispatch(offline()));
var checkOnline = () => {
    if(window.navigator.onLine) {
        store.dispatch(online())
    }
    setTimeout(checkOnline, 10000)
};
checkOnline()


// Run process to submit items from queue
const checkQueue = function(){
    const DISPATCH_URL = window.context.backend_url + "/dispatch" //todo: move to common place

    const {queue} = store.getState();
    if(queue.length > 0) {
        var task = queue[0];
        const action = task.data;
        ajax.post(DISPATCH_URL, action).then((result) => {
            store.dispatch(action)
            store.dispatch({type: 'QUEUE_REMOVE', id:task.id})
            checkQueue()
        }, (err) => {
            console.log("error", err);
            setTimeout(checkQueue, 5000)
        })
    }
    else {
        setTimeout(checkQueue, 1000)
    }

};

checkQueue()
