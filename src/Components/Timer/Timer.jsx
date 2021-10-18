import React, { useState, useEffect } from 'react';

import './Timer.scss';

export default function Timer (props) {

    const [time, setTime] = useState(0);
    const [active, setActive] = useState(props.active);

    function padNum (num) {
        return num < 10 ? '0' + num : num
    }

    function updateDisplay () {
        const minutes = padNum(Math.floor(time/60))
        const seconds = padNum(Math.floor(time%60))
        return `${minutes}:${seconds}`
    }

    useEffect(() => {
        if (active) {
            const interval = setInterval(() => {
                setTime(time + 1)
            }, 1000)

            return function cleanUp () {
                clearInterval(interval)
            }
        }
    })

    return (
        <div id="timer-container">
            {updateDisplay()}
        </div>
    )
}