import { useEffect } from 'react'



function Timer({ timeRemains, dispatch }) {

    const mins = Math.floor(timeRemains / 60)
    const seconds = timeRemains % 60

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: 'tick' })
        }, 1000);

        return () => clearInterval(id)
    }, [dispatch])


    return (
        <div className='timer'>
            {mins < 10 && '0'}{mins} : {seconds < 10 && '0'}{seconds}
        </div>
    )
}

export default Timer