import { useState, ChangeEvent, Dispatch, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { categories } from '../data/categories'
import type { Activity } from '../types'
import { ActivityActions, ActivityState } from '../reducers/activity-reducer'

type FromProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

function Form({ dispatch, state }: FromProps) {

    const [activity, setActivity] = useState<Activity>(initialState)
    useEffect(() => {
        if (state.activeId) {
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save_activity', payload: { newActivity: activity } })
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form
            className=" space-y-5 bg-white p-10 rounded-lg shadow-md"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className='font-bold'> Categoria: </label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className='font-bold'> Actividad:</label>
                <input
                    className="border border-slate-300 p-2 rounded-lg w-full"
                    type='text'
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    id="name"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className='font-bold'> Calorias:</label>
                <input
                    className="border border-slate-300 p-2 rounded-lg w-full"
                    type='number'
                    id="calories"
                    placeholder='Calorias. ej. 300 o 500'
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>


            <input type="submit"
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg w-full uppercase cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />

        </form>
    )
}

export default Form