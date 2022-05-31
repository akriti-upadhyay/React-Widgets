import React, { useState } from 'react'

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null)

    const onTitleClick = (index) => {
        setActiveIndex(index)
    }

    const renderedItems = items.map((item, index) => {
        // add semantic-ui class 'active' only if 'index' is equal to 'activeIndex' (i.e. user has selected the current index)
        const active = index === activeIndex ? 'active' : '' 
        return (
            <React.Fragment key={item.title}>
                <div
                    className={`title ${active}`}
                    onClick={() => onTitleClick(index)}
                >
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        )
    })
    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>
    )
}

export default Accordion
