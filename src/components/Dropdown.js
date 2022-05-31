import React, { useState, useEffect, useRef } from 'react'

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    // run only once
    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) {
                return
            }
            setOpen(false)
        }

        document.body.addEventListener('click', onBodyClick, {
            capture: true,
        })

        // removing the Event listener
        return () => {
            document.body.removeEventListener('click', onBodyClick, {
                capture: true,
            })
        }
    }, [])

    const renderedOption = options.map((option) => {
        // don't display selected option on the screen
        if (option.value === selected.value) {
            // don't render anything
            return null
        }

        return (
            <div
                onClick={() => onSelectedChange(option)}
                key={option.value}
                className="item"
            >
                {option.label}
            </div>
        )
    })

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${
                        open ? 'visible active' : ''
                    }`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOption}
                    </div>
                </div>
                {/* <div style={{ color: selected.value }}>This is a text</div> */}
            </div>
        </div>
    )
}

export default Dropdown
