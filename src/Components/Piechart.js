import React from 'react'
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 


function PieChart({data}) {
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        title:{
            text: data.name
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",		
            startAngle: -90,
            dataPoints: [
                { y: data.very_good, label: "Very Good" },
                { y: data.good, label: "Good" },
                {y: data.neutral, label: "Neutral"},
                {y: data.bad, label: "Bad"},
                {y: data.very_bad, label: "Very Bad"}
            ]
        }]
    }
  return (
    
			<CanvasJSChart options = {options} 
			/>
			
		
  )
}

export default PieChart