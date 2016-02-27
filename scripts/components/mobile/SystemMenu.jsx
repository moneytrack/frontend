"use strict";
/**
 * Copyright (c) 2016 Nikolai Mavrenkov <koluch@koluch.ru>
 *
 * Distributed under the MIT License (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT).
 *
 * Created: 27.02.2016 10:28
 */
import React from 'react'

import {removeQueueTask} from '../../action-creators'
import Tappable from 'react-tappable';


const Queue = React.createClass({

    onClearCache: function () {
        window.localStorage.clear()
    },

    render: function () {
        return (
            <div className="system-menu">
                <Tappable component="div" className="system-menu__item" onTap={this.onClearCache}>Clear cache</Tappable>
            </div>
        )
    }

})

Queue.contextTypes = {
    store: React.PropTypes.object
}

export default Queue
