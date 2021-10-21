const dataImc = [
    {id:"1",nombre:"Carlos Andres",IMC:25.95,sexo:"H"},
    {id:"2",nombre:"Maria Camila",IMC:34.81,sexo:"M"},
    {id:"3",nombre:"Santiago Salcedo",IMC:29.39,sexo:"H"},
    {id:"4",nombre:"Andres García",IMC:26.49,sexo:"H"},
    {id:"5",nombre:"Natalia Herrera",IMC:34.37,sexo:"M"}
];

let miCanvas=document.getElementById("graficoBarras").getContext("2d");
var chart = new Chart(miCanvas,{
    type:"bar",
    data:{
        labels:["Hombres","Mujeres"],
        datasets:[
            {
                label:"# Participación Tamizaje (Hombres y Mujeres)",
                backgroundColor:[
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor:[
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth:2,
                data:[
                    dataImc.filter(eachDataImc => eachDataImc.sexo=='H').length,
                    dataImc.filter(eachDataImc => eachDataImc.sexo=='M').length
                ]
            }
        ]
    },
    options: {
        indexAxis: 'x'
    }
});


let miCanvas2=document.getElementById("graficoCircular").getContext("2d");
var chart = new Chart(miCanvas2,{
    type:"doughnut",
    data:{
        labels:["Hombres","Mujeres"],
        datasets:[
            {
                label:"Porcentaje Tamizaje hombres y mujeres",
                backgroundColor:[
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)'
                ],
                data:[
                    dataImc.filter(eachDataImc => eachDataImc.sexo=='H').length,
                    dataImc.filter(eachDataImc => eachDataImc.sexo=='M').length
                ]
            }
        ],
        hoverOffset: 4
    }
});