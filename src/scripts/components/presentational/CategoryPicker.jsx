"use strict"
import React from 'react'

const CategoryPicker = React.createClass({

    propTypes: {
        rootCategoryId: React.PropTypes.number,
        categoryList: React.PropTypes.arrayOf(React.PropTypes.object),
        allowEmpty: React.PropTypes.bool,
        value: React.PropTypes.number // active category id
    },

    onChange: function(category) {
        this.props.onChange(category)
    },

    renderRecurse: function(list, level) {
        var sorted = list.slice().sort((c1, c2) => c1.order - c2.order)

        return sorted.map((category) => {
            const childList = category.childIdList.map(id => this.props.categoryList.filter(x => x.id === id)[0])
            let classes = ["category-picker__category"]
            if(this.props.value === category.id) {
                classes.push("category-picker__category--selected")
            }
            classes = classes.join(" ")
            const paddingStyle = {"paddingLeft":(5 + (20 * (level ) )) + "px"}
            if(childList.length > 0) {
                const childListRendered = childList.length > 0 ? this.renderRecurse(childList, level+1) : ""
                return [
                    <div key={category.id} className={classes} style={paddingStyle}  onClick={() => this.onChange(category.id)}>
                        <div className="category-picker__category__title">
                            {category.title}
                        </div>
                    </div>,
                    childListRendered
                ]
            }
            else {
                return [
                    <div key={category.id} className={classes} style={paddingStyle}  onClick={() => this.onChange(category.id)}>
                        <div className="category-picker__category__title">
                            {category.title}
                        </div>
                    </div>
                ]
            }

        })
    },

    render: function() {
        const rootCategoryList = this.props.categoryList.filter(category => category.parentId === this.props.rootCategoryId)
        const children = this.renderRecurse(rootCategoryList, 0)
        if(this.props.allowEmpty) {
            let classes = ["category-picker__category"]
            if(this.props.value === null) {
                classes.push("category-picker__category--selected")
            }
            classes = classes.join(" ")
            children.unshift(<div key="empty" className={classes} onClick={() => this.onChange(null)}>
                <div className="category-picker__category__empty category-picker__category__title">
                    {this.props.emptyText || "Not selected"}
                </div>
            </div>)
        }
        return  (
            <div className="category-picker">
                {children}
            </div>
        )
    }
})

export default CategoryPicker
