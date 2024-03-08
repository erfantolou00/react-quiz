import React from 'react'
import Options from './Options'

function Question({ question, dispatch, answer }) {
    return (
        <>
            <h4>{question.question}</h4>
            <Options
                question={question}
                dispatch={dispatch}
                answer={answer}
            />
            {answer
                ? <div className='timer'>
                    00:30
                </div>
                : ''
            }

        </>
    )
}

export default Question