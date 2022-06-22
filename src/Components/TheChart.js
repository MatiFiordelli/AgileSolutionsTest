import React,{ useState, useEffect, useContext, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { SelectContext3 } from './Main.js'
import { capitalize } from './FiltersBar'

export default function TheChart(){
	const {stateSelect3, setStateSelect3} = useContext(SelectContext3)
	const [ventasxMes, setVentasxMes] = useState('') //second table containing Months and Sales values
	
	useEffect(()=>{
		if(ventasxMes!=='' && ventasxMes.length!==0){
			const estado = {
				labels: [capitalize(ventasxMes[0].mes),
						capitalize(ventasxMes[1].mes),
						capitalize(ventasxMes[2].mes),
						capitalize(ventasxMes[3].mes),],
				datasets: [{
					label: 'Ventas', 
					backgroundColor: '#5cb8f7',
					borderColor: 'rgba(0,0,0,1)',
					borderWidth: 0,
					data: [capitalize(ventasxMes[0].ventas),
						capitalize(ventasxMes[1].ventas),
						capitalize(ventasxMes[2].ventas),
						capitalize(ventasxMes[3].ventas),]
				}]
			}	
		
			//bar chart
			const barChart = (<Bar
						// width={"100%"}
						// height={"100%"}
						data={estado}
						options={{
							responsive: true, 
							mantainAspectRatio: false,
							legend:{
								display:true,
								position:'right',
							},

							plugins: {
								legend: {
									display:true,
									position: "bottom", 
									labels: {
										boxWidth:7,
										usePointStyle: true,
										font: {
											size: 11,
											weight: 'bold',
										}
									},
								},
								title: {
									display: true,
									text: 'Sales By Month for:',
									font: {
										size: 14,
										weight: 'bold',
										lineHeight: 1.2,
									},
								}
							},
							scales: {
								x: {
									display: true,
									title: {
										display: true,
										text: 'Meses',
									},
									grid: {
										display: false
									}
								},
								y: {
									display: true,
									title: {
										display: true,
										text: 'Ventas',
									},
								}
							}
						}}
					/>)
			
		
			root.current.render(barChart)
			//ReactDOM.render(barChart, content)
		}
	},[ventasxMes])
	
	let root = useRef('')
	useEffect(()=>{
		const containerChart = document.querySelector('.theChart')
		root.current = ReactDOM.createRoot(containerChart)
	},[])
	
	//every time the third select(marca) changes, it reload a new chart for that element
	useEffect(()=>{
		if(stateSelect3 !== ''){
			let url = `http://agilesolutions.atwebpages.com/consultapormes.php?name=${stateSelect3}`
			fetch(url)
				.then((response)=>response.json())
				.then((data)=>{
					setVentasxMes(data)
				})
		}
	}, [stateSelect3])

	return(
		<div className="theChart" />
	)
}

