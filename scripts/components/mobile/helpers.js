export const fastClick = (onClick) => {
    return (el) => {
        if(el != null && !el.__processed) {
            const event = ("ontouchend" in window )? 'touchend' : 'click'
            el.addEventListener(event, (e) => {
                onClick(e)
            })
            el.__processed = true
        }
    }
}