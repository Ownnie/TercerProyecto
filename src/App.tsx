import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducer"

import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)
  const canResetApp = () => useMemo(() => state.activities.length === 0, [state.activities])

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  return (
    <>
      <header className=" bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between">
          <h1 className=" text-center text-lg font-bold text-white uppercase content-center">
            Contador de Calorias
          </h1>
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg uppercase cursor-pointer disabled:opacity-10"
            onClick={() => dispatch({ type: 'reset' })}
            disabled={canResetApp()}
          > Reiniciar Aplicacion </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className=" bg-gray-800 py-10">
        <div className=" max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
