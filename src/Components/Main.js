import React, { useState } from 'react'
import UpperBar from './UpperBar.js'
import FiltersBar from './FiltersBar.js'
import TheChart from './TheChart.js'

//global state using Context Api
export const SelectContext1 = React.createContext()
export const SelectContext2 = React.createContext()
export const SelectContext3 = React.createContext()

export default function Main(){
	const [stateSelect1, setStateSelect1] = useState('')
	const [stateSelect2, setStateSelect2] = useState('')
	const [stateSelect3, setStateSelect3] = useState('')
	
	return(
		<div className="main">
			<SelectContext1.Provider value={{stateSelect1, setStateSelect1}}>
			 <SelectContext2.Provider value={{stateSelect2, setStateSelect2}}>
			  <SelectContext3.Provider value={{stateSelect3, setStateSelect3}}>
				<UpperBar />
				<FiltersBar />
				<TheChart />
			  </SelectContext3.Provider>
			 </SelectContext2.Provider>
			</SelectContext1.Provider>
		</div>
	)	
}