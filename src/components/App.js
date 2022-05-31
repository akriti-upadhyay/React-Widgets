import React, { useState } from 'react'
import Accordion from './Accordion'
import Search from './Search'
import Dropdown from './Dropdown'
import Translate from './Translate'
import Route from './Route'
import Header from './Header'

// for Accordian component
const items = [
    {
        title: 'What is React?',
        content: 'React is a front end JS framework',
    },
    {
        title: 'Why use React?',
        content: 'React is a favourite JS library',
    },
    {
        title: 'How do you use React?',
        content: 'You use React by creating components',
    },
]

// for Dropdown component
const options = [
    {
        label: 'Color Red',
        value: 'red',
    },
    {
        label: 'Color Green',
        value: 'green',
    },
    {
        label: 'Color Blue',
        value: 'blue',
    },
]

const App = () => {
    const [selected, setSelected] = useState(options[0])

    return (
        <div>
            <Header />
            <Route path="/">
                <Accordion items={items}></Accordion>
            </Route>
            <Route path="/list">
                <Search />
            </Route>
            <Route path="/dropdown">
                <Dropdown
                    label="Select a color:"
                    options={options}
                    selected={selected}
                    onSelectedChange={setSelected}
                />
            </Route>
            <Route path="/translate">
                <Translate />
            </Route>
        </div>
    )
}

export default App
