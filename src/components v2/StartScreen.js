import React from 'react'

function StartScreen({ numQuestions, dispatch }) {

    return (
        <div className='start'>
            <h2>Welcome to googoosh Quiz!</h2>
            <h3>This test is to identify your knowledge of Gogoosh, dear <strong>Mr. Mortazi</strong></h3>
            <button onClick={() => dispatch({ type: 'start' })} className='btn btn-ui'>Let's start</button>
        </div>
    )
}

export default StartScreen