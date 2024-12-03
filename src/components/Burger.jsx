import '../styles/burger.scss'
import React, { forwardRef } from 'react';

export const Burger = forwardRef(({ active, onToggleMenu }, ref) => {
    let className = 'burger'

    if (active) {
        className += ' burger_active'
    }

    return (
        <div className={className} onClick={onToggleMenu} ref={ref}>
            <div className="burger__line"></div>
            <div className="burger__line"></div>
            <div className="burger__line"></div>
        </div>
    )
})