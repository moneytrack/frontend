"use strict"

import ajax from "./ajax"

const DISPATCH_URL = window.context.backend_url + "/dispatch" //todo: move to common place

function asyncDispatch(cb) {
	return dispatch => {
		dispatch({type:"WAIT"})

		ajax.post(DISPATCH_URL, cb(null)).then((result) => {
			dispatch({type:"STOP_WAIT"})
	        dispatch(cb(result))
	    }, (err) => {
	    	console.log("error", err);
			dispatch({type:"STOP_WAIT"})
			dispatch({type:"ERROR"})
	    })
	}
}

function syncDispatch(action) {
    return dispatch => dispatch(action)
}



export const updateState = ({newState}) => {
    return syncDispatch({
        type: 'UPDATE_STATE',
        newState
    })
}

export const newExpense = ({amount, categoryId, comment, date}) => {
	return asyncDispatch((id) => {
    	return {
	        type: 'NEW_EXPENSE',
	        amount,
	        categoryId,
	        comment,
	        id,
	        date
	    }
    })
}

export const editExpense = ({id, amount, categoryId, comment, date}) => {
	return asyncDispatch(() => {
    	return {
	        type: 'EDIT_EXPENSE',
	        id,
	        amount,
	        categoryId,
	        comment,
	        date
	    }
    })
}

export const deleteExpense = (id) => {
	return asyncDispatch((result) => {
    	return {
	        type: 'DELETE_EXPENSE',
	        id
	    }
    })
}

export const newCategory = ({title, parentId}) => {
	return asyncDispatch((id) => {
    	return {
	        type: 'NEW_CATEGORY',
            id,
	        title,
            parentId
	    }
    })
}

export const editCategory = ({id, title = null, parentId  = null}) => {
	return asyncDispatch((result) => {
		return {
			type: 'EDIT_CATEGORY',
			id,
			title,
			parentId
		}
	})
}

export const deleteCategory = ({id}) => {
	return asyncDispatch((result) => {
		return {
			type: 'DELETE_CATEGORY',
			id
		}
	})
}

export const setCurrency = ({currency}) => {
	return asyncDispatch((result) => {
		return {
			type: 'SET_CURRENCY',
			currency
		}
	})
}

export const setFirstDayOfWeek = ({firstDayOfWeek}) => {
	return asyncDispatch((result) => {
		return {
			type: 'SET_FIRST_DAY_OF_WEEK',
			firstDayOfWeek
		}
	})
}

export const enqueueNewExpense = ({amount, categoryId, comment, date}) => {
    return syncDispatch({
        type: 'QUEUE_PUSH',
        data: {
            type: 'NEW_EXPENSE',
            id: -1,
            amount,
            categoryId,
            comment,
            date
        }
    })
}

export const removeQueueTask = ({id}) => {
	return syncDispatch({
		type: 'QUEUE_REMOVE',
		id
	})
}


export const offline = () => {
	return syncDispatch({
		type: 'OFFLINE'
	})
}

export const online = () => {
	return syncDispatch({
		type: 'ONLINE'
	})
}


export const unauthorized = ({value}) => {
	return syncDispatch({
		type: 'UNAUTHORIZED',
		value
	})
}