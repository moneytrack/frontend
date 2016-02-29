"use strict";
/**
 * Copyright (c) 2016 Nikolai Mavrenkov <koluch@koluch.ru>
 *
 * Distributed under the MIT License (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT).
 *
 * Created: 26.02.2016 22:04
 */
"use strict"
import React from 'react'

import {removeQueueTask} from '../../action-creators'
import money from '../../money'

const Queue = React.createClass({

    onDelete: function (id) {
        this.context.store.dispatch(removeQueueTask({id}))
    },

    render: function () {
        const {queue, userSettings} = this.context.store.getState()
        const {currency} = userSettings
        const format = money.format(money.settings.byCurrency[currency]);

        return (
            <div className="queue">
                {
                    (queue.length > 0)
                    ? (
                        queue.map((task) => {
                            console.log(task);
                            const action = task.data;
                            let msg;
                            if (action.type === "NEW_EXPENSE") {
                                msg = "Expense: " + format(action.amount)
                            }
                            else {
                                msg = action.type;
                            }
                            return (
                                <div key={task.id} className="queue__task">
                                    <span className="queue__msg">{msg}</span>
                                    <button className="queue__btn" onClick={() => this.onDelete(task.id)}><i className="icon icon-trash_can icon1x"/></button>
                                </div>
                            )
                        })
                    )
                    : (
                        <div className="queue__empty-msg">Queue is empty</div>
                    )
                }
            </div>
        )
    }

})

Queue.contextTypes = {
    store: React.PropTypes.object
}

export default Queue
