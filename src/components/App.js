import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import { useEffect, useReducer } from "react"
import Progress from "./Progress"
import FinishScreen from "./FinishScreen"
import Timer from "./Timer"

const initialState = {
  questions: [],
  //'loading', 'error', 'active', 'ready', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemains: 360,
}
function reducer(state, action) {
  switch (action.type) {
    case 'dataRecived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      };
    case 'dataFailed':
      return {
        ...state, status: 'error'
      }
    case 'start':
      return {
        ...state, status: 'active'
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ?
          state.points + question.points
          : state.points,
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    case 'finishScreen':
      return {
        ...state, status: 'finished',
        highscore: state.points > state.highscore
          ? state.points
          : state.highscore
      }
    case 'restart':
      return {
        ...state, status: 'active', answer: null, index: 0, points: 0,
      }
    case 'tick':
      return {
        ...state, timeRemains: state.timeRemains - 1,
        status: state.timeRemains === 0 ? 'finished' : state.status
      }
    default:
      throw new Error("Action unknown")
  }

}

export default function App() {

  const [{ questions, status, index, answer, points, highscore, timeRemains }, dispatch] = useReducer(reducer, initialState)


  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)
  const numQuestions = questions.length

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data =>
        dispatch({ type: 'dataRecived', payload: data }))

      .catch(err =>
        dispatch({ type: "dataFailed" }))

  }, [])


  return <div className="app">
    <Header />

    <Main>


      {status === "loading" && <Loader />}
      {status === "error" && <Error />}

      {status === "ready" &&
        <StartScreen
          dispatch={dispatch}
          numQuestions={numQuestions}
        />}

      {status === "active" &&
        <>
          <Progress
            index={index}
            numQuestions={numQuestions}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            answer={answer} />

          <Question
            dispatch={dispatch}
            question={questions[index]}
            answer={answer}
            points={points} />

          <NextButton
            dispatch={dispatch}
            answer={answer}
            index={index}
            numQuestions={numQuestions} />
        </>
      }
      {status === "finished" &&
        <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highscore={highscore}
          dispatch={dispatch} />}

      {status === "active" && <Timer timeRemains={timeRemains} dispatch={dispatch} />}


    </Main>

  </div>
}
