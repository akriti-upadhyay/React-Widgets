import React, { useState, useEffect } from 'react'
import axios from 'axios'
import purify from 'dompurify'

const Search = () => {
    const [term, setTerm] = useState('programming')
    const [debouncedTerm, setDebouncedTerm] = useState(term)
    const [results, setResults] = useState([])

    // USER TYPES SOMETHING
    useEffect(() => {
        const timerId = setTimeout(() => {
            // timer to update debouncedTerm
            setDebouncedTerm(term)
        }, 1000)

        // clean-up function to cancel the timer
        return () => {
            clearTimeout(timerId)
        }
    }, [term])

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get(
                'https://en.wikipedia.org/w/api.php',
                {
                    params: {
                        action: 'query',
                        list: 'search',
                        origin: '*',
                        format: 'json',
                        srsearch: debouncedTerm,
                    },
                }
            )
            // updating the 'results' piece of state
            setResults(data.query.search)
        }
        // make a request to API
        search()
    }, [debouncedTerm])

    const renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                    <a
                        href={`https://en.wikipedia.org/?curid=${result.pageid}`}
                        className="ui button"
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">{result.title}</div>
                    <div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: purify.sanitize(result.snippet),
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term:</label>
                    <input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className="input"
                    />
                </div>
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    )
}

export default Search
