export const fastClick = (cb) => {
    return (el) => {
        if(el !== null && el.__fast_click_binded !== true) {
            const event = ('ontouchend' in document) ? 'touchend' : 'click'
            el.addEventListener(event, cb)
            el.__fast_click_binded = true
        }
    }
}
