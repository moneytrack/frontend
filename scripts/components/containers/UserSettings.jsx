"use strict"
import React from 'react'

import {setCurrency, setFirstDayOfWeek} from '../../action-creators'

const UserSettings = React.createClass({

    onChangeCurrency: function(e) {
        this.context.store.dispatch(setCurrency({currency:e.target.value}))
    },

    onChangeFirstDayOfWeek: function(e) {
        this.context.store.dispatch(setFirstDayOfWeek({firstDayOfWeek:e.target.value}))
    },

    render: function () {
        const {currency, firstDayOfWeek} = this.context.store.getState().userSettings
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Currency:</label>
                        </td>
                        <td>
                            <select value={currency} onChange={this.onChangeCurrency}>
                                <option value="USD">U.S. dollars</option>
                                <option value="EUR">Euro</option>
                                <option value="RUR">Russian rubles</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>First day of week:</label>
                        </td>
                        <td>
                            <select value={firstDayOfWeek} onChange={this.onChangeFirstDayOfWeek}>
                                <option value="SUNDAY">Sunday</option>
                                <option value="MONDAY">Monday</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
})

UserSettings.contextTypes = {
    store: React.PropTypes.object
}

export default UserSettings
