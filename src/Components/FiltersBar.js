import React, { useEffect, useContext } from 'react'
import { SelectContext1, SelectContext2, SelectContext3 } from './Main.js'

//Capitalize function
export const capitalize = (str) => {
	let firstLetter = str.charAt(0).toUpperCase()
	let restOfLetters = str.substr(1, str.length-1)
	return firstLetter + restOfLetters
}

//Loading form Selects with the data from the database
export default function FiltersBar(){
	const {stateSelect1, setStateSelect1} = useContext(SelectContext1)
	const {stateSelect2, setStateSelect2} = useContext(SelectContext2)
	const {stateSelect3, setStateSelect3} = useContext(SelectContext3)
	
	const insertOptions = async (data, select) => {
		let opts
		if(data.length !== 0){
			if(select === 1){ //categoria
				setStateSelect1(data[0].categoria)
				opts = document.querySelector("#categoria")
				opts.innerHTML = ''
				for(let i of data){
					opts.innerHTML += `<option value="${i.categoria}">${capitalize(i.categoria)}</option>`
				}
			}
			if(select === 2){ //producto
				setStateSelect2(data[0].name)
				opts = document.querySelector("#producto")
				opts.innerHTML = ''
				for(let i of data){
					opts.innerHTML += `<option value="${i.name}">${capitalize(i.name)}</option>`
				}
			}
			if(select === 3){ //marca
				setStateSelect3(data[0].marca)
				opts = document.querySelector("#marca")
				opts.innerHTML = ''
				for(let i of data){
					opts.innerHTML += `<option value="${i.marca}">${capitalize(i.marca)}</option>`
				}
				//poner un spiner
			}
		}
	}
	
	const fetchData = (value, select)=>{
		let url
		if(select === 1 || select === 2){ //categoria || producto
			url = `http://agilesolutions.atwebpages.com/consulta.php?categoria=${value}`
		}
		if (select === 3){	//marca
			url = `http://agilesolutions.atwebpages.com/consulta.php?name=${value}`
		}
		
		fetch(url)
			.then((response)=>response.json())
			.then((data)=>{			
				insertOptions(data, select)
			})
	}
	
	useEffect(()=>{
		fetchData('all', 1) //initial load of category only
	},[])
	
	useEffect(()=>{
		fetchData(stateSelect1, 2)
	},[stateSelect1])
	
	useEffect(()=>{
		fetchData(stateSelect2, 3)
	},[stateSelect2])
	
	return(
		<div className="filtersBar">
			<div>
				<label htmlFor="categoria">Categoria:</label>
				<select id="categoria" name="categoria" 
					onChange={(e)=>setStateSelect1(e.target.value)}
					value={stateSelect1}>
					
				</select>
			</div>
			<div>
				<label htmlFor="producto">Producto:</label>
				<select id="producto" name="producto" 
					onChange={(e)=>setStateSelect2(e.target.value)}
					value={stateSelect2}>
				</select> 
			</div>
			<div>
				<label htmlFor="marca">Marca:</label>
				<select id="marca" name="marca"
					onChange={(e)=>setStateSelect3(e.target.value)}
					value={stateSelect3}>
				</select>
			</div>
		</div>
	)
}