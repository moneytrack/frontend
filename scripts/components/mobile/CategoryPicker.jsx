"use strict"
import React from 'react'
import moment from 'moment'
import update from 'react-addons-update'

const CategoryPicker = React.createClass({

    createOptions: function(categoryList, parentId, prefix = "") {
        var children = categoryList.filter(x => x.parentId === parentId);
        children = children.slice().sort((c1, c2) => c1.order - c2.order)
        children = children.map(category => {
            var withChildren = [<option key={category.id} value={category.id}>{prefix + category.title}</option>];
            withChildren = withChildren.concat(this.createOptions(categoryList, category.id, prefix + category.title + " / "))
            return withChildren
        })
        children = [].concat(...children)
        return children
    },

    onChange: function(e) {
        this.props.onChange(parseInt(e.target.value));
    },

    render: function () {
        const {categoryList, rootCategoryId } = this.context.store.getState();
        if(categoryList.length > 1) {
            return (
                <div className="category-picker">
                    <select value={this.props.value} onChange={this.onChange}>
                        {
                            this.createOptions(categoryList, rootCategoryId)
                        }
                    </select>
                </div>
            )
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
