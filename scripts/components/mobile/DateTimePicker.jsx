"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

const DateTimePicker = React.createClass({

    render: function () {

        return (
            <div className="date-time-picker">
                <button>{moment(this.props.value).format("DD-MM-YYYY HH:mm")}</button>
            </div>
        )
    }

})

export default DateTimePicker
