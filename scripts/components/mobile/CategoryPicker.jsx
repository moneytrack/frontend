"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

const CategoryPicker = React.createClass({

    render: function () {
        const {categoryList, rootCategoryId } = this.context.store.getState();

        if(categoryList.length > 0) {
            let sorted = categoryList.slice().sort((c1, c2) => c1.order - c2.order)
            sorted = sorted.filter(x => x.id !== rootCategoryId)


            const selected = categoryList.filter(x => x.id === this.props.value)[0] || null
            if(selected !== null) {
                return (
                    <div className="category-picker">
                        <button>{selected.title}</button>
                    </div>
                )
            }
        }
        return (
            <div className="category-picker">
                <button disabled={true}>No categories...</button>
            </div>
        )
    }

})

CategoryPicker.contextTypes = {
    store: React.PropTypes.object
}

export default CategoryPicker
