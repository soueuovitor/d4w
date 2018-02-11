var chart = null;
var dataPoints = [];

function salariosTotais() {

chart = new CanvasJS.Chart("salariosTotais", {
	animationEnabled: true,
	theme: "light1",
	title: {
        text: "Salários a Pagar"
        
    },
    axisY: {
		title: "",
		titleFontSize: 24
	},  
	data: [{
		indexLabelFontSize: 16,

        type: "column",
		yValueFormatString: "##0\" €\"",
            indexLabel: " {y}",
            dataPoints: [{
                

                label: "Speakers",

                y: totalSpeaker(),
                color: "#2196F3",

			},
			
			
            {
                

                label: "Colaboradores",

                y: totalDinheiroColab(),
                color: "#2196F3",

            }]
	}]
});



	
    chart.render(); 
}


var chart = null;
var dataPoints = [];

 function funcionarios() {
	 
	
	var chart = new CanvasJS.Chart("funcionarios", {
		animationEnabled: true,
		title: {
			text: "Funcionários"
		},
		data: [{
			type: "pie",
			startAngle: 200,
			yValueFormatString: "##0''",
			indexLabel: "{label} {y}",
			dataPoints: [
				{y: numeroColabPago() , label: "Colaboradores Pagos"},
				{y: numeroColabVol(), label: "Colaboradores Voluntários"},
				{y: numeroSpeaker(), label: "Speakers"},
				{y:  numeroPatrocinio(), label: "Patrocínios"},
				
		
		       
			]
		}]
	});
	chart.render();
	
	} 
	var chart = null;
var dataPoints = [];

function ganhos() {

chart = new CanvasJS.Chart("ganhos", {
	animationEnabled: true,
	theme: "light1",
	title: {
        text: "Ganhos"
        
    },
    axisY: {
		title: "",
		titleFontSize: 24
	},  
	data: [{
		indexLabelFontSize: 16,

        type: "column",
		yValueFormatString: "##0\" €\"",
            indexLabel: " {y}",
            dataPoints: [{
                

                label: "Bilhetes",

                y: lucroBilhetes(),
                color: "#2196F3",

			},
			
			
            {
                

                label: "Patrocínios",

                y: totalPatrocinio(),
                color: "#2196F3",

            }]
	}]
});



	
    chart.render(); 
}


var chart = null;
var dataPoints = [];

	