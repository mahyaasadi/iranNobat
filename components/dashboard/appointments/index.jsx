import React, {useEffect, useState} from 'react';
import ReactApexChart from "react-apexcharts";
import FeatherIcon from 'feather-icons-react';
import Select from 'react-select';
const Appointments =()=>  {
    const options = [
        { value: '2022', label: '2022' },
        { value: '200', label: '2022' },
      ];
    const options1 = [
    { value: 'Select Type', label: 'Select Type' },
    { value: 'Video', label: 'Video' },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

  const salesChartData ={ 
    
    series: [{
        name: 'Video Call',
        type: "column",
        data: [4, 2.8, 5, 2, 3.2, 1.2, 2, 3, 2, 3.5, 5, 2]
      }, {
        name: "Audio call",
        type: "column",
        data: [3, 3, 2, 3, 1.5, 1, 3, 2, 3, 1.5, 2, 3]
      }, {
        
        name: "Chat",
        type: "column",
        data: [4.5, 3.8, 2.5, 3, 4.5, 3, 4.5, 3, 4, 5, 1.5, 2]

      }],
      options: {
        colors: ['#0CE0FF', '#1B5A90', '#DFE5FC'],
        chart: {
            type: 'bar',
            fontFamily: 'Poppins, sans-serif',
            height: 350,
            toolbar: {
                show: false
            }
        },
            plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '60%',
            },
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: false,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
         },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val + "k"
                }
            },
            axisBorder: {
                show: true,
            },
        },
        fill: {
          opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "k"
                }
            }
        }
      },
}
    
  
    return (
      
             <div className="col-xl-7 d-flex">
                <div className="card flex-fill">
                <div className="card-header">
                    <div className="row align-items-center">
                    <div className="col">
                        <h5 className="card-title">Appointments</h5>
                    </div>
                    <div className="col-auto select-option me-3">
                        <div className='d-flex'>
                        <Select className="select"
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            placeholder={2022}
                            />  
          
                        <div className="ms-2 w-100">
                            <Select className=""
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options1}
                                placeholder={"Select Type"}
                                />                    
                        </div>
                     </div>
                    </div>
                    </div>
                </div>
                <div className="card-body">
                    <div id="sales_chart">
                    <ReactApexChart options={salesChartData.options} series={salesChartData.series} type="bar" height={350} />
                    </div>
                     </div>
                    </div>
                </div>
    )
  
};

export default Appointments;