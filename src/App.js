import React, { useEffect, useRef, useState } from 'react'
import { createChart, ColorType } from 'lightweight-charts'

const App = props => {
  //states
  const [seriesVisibility, setSeriesVisibility] = useState({
    chart1: true,
    chart2: true,
    chart3: true
  });
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState({
    chart1: null,
    chart2: null,
    chart3: null
  });

  //reference hook
  const myChart = useRef();
  const myToolTip = useRef();


  //toggle button functions
  const toggleSeriesVisibility = (seriesName) => {
    setSeriesVisibility(prevState => ({
      ...prevState,
      [seriesName]: !prevState[seriesName]
    }));
  }

  //chart design
  const {
    data,
    colors: {
      backgroundColor = 'white',
      textColor = 'black',

      lineColor1 = '#2962FF', // Change the lineColor to red
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',

      lineColor = 'red',
      areaTopColor1 = 'red',
      areaBottomColor1 = 'rgba(255, 0, 0, 0.28)',

      lineColor2 = 'green', // Change the lineColor to red
      areaTopColor2 = 'green',
      areaBottomColor2 = 'rgba(0, 128, 0, 0.28)',
    } = {},
  } = props;

  //static data
  const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
  ];
  const initialData1 = [
    { time: '2018-12-22', value: 40.25 },
    { time: '2018-12-23', value: 38.92 },
    { time: '2018-12-24', value: 42.77 },
    { time: '2018-12-25', value: 45.63 },
    { time: '2018-12-26', value: 41.88 },
    { time: '2018-12-27', value: 39.74 },
    { time: '2018-12-28', value: 37.56 },
    { time: '2018-12-29', value: 35.91 },
    { time: '2018-12-30', value: 36.45 },
    { time: '2018-12-31', value: 39.01 },
  ];
  const initialData2 = [
    { time: '2018-12-22', value: 29.75 },
    { time: '2018-12-23', value: 33.21 },
    { time: '2018-12-24', value: 30.88 },
    { time: '2018-12-25', value: 32.09 },
    { time: '2018-12-26', value: 28.45 },
    { time: '2018-12-27', value: 31.77 },
    { time: '2018-12-28', value: 35.12 },
    { time: '2018-12-29', value: 36.98 },
    { time: '2018-12-30', value: 34.62 },
    { time: '2018-12-31', value: 30.55 },
  ];



  useEffect(() => {
    //creating charts

    const chart = createChart(myChart.current, {
      layout: {
        background: { type: ColorType.solid, color: backgroundColor },
        textColor,
      },
      width: myChart.current.clientWidth,
      height: 500,
    });

    chart.applyOptions({
      rightPriceScale: {
        scaleMargins: {
          top: 0.3, // leave some space for the legend
          bottom: 0.25,
        },
      },
      crosshair: {
        // hide the horizontal crosshair line
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        // hide the vertical crosshair label
        vertLine: {
          labelVisible: false,
        },
      },
      // hide the grid lines
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });

    //creating area series
    const newSeries = chart.addAreaSeries({ lineColor: 'blue', topColor: areaTopColor, bottomColor: areaBottomColor, });
    const newSeries1 = chart.addAreaSeries({ lineColor, topColor: areaTopColor1, bottomColor: areaBottomColor1 });
    const newSeries2 = chart.addAreaSeries({ lineColor2, topColor: areaTopColor2, bottomColor: areaBottomColor2 });

    //providing data to our series
    if (seriesVisibility.chart1) {
      newSeries.setData(initialData);
    }

    if (seriesVisibility.chart2) {
      newSeries1.setData(initialData1);
    }

    if (seriesVisibility.chart3) {
      newSeries2.setData(initialData2);
    }

    //ToolTip Code
    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const data = param.seriesData.get(newSeries);
        const linePriceData = param.seriesData.get(newSeries);

        const data1 = param.seriesData.get(newSeries1);
        const linePriceData1 = param.seriesData.get(newSeries1);


        const data2 = param.seriesData.get(newSeries2);
        const linePriceData2 = param.seriesData.get(newSeries2);

        //initializing coordinates
        let coordinateY = 0;
        let coordinateX = 0;

        //to prevent undefined state error, we will provide coordinates on the basis of active charts
        // if (seriesVisibility.chart1) {
        //   coordinateY = newSeries.priceToCoordinate(linePriceData.value)
        //   coordinateX = param.point.x;
        // }
        // else if (seriesVisibility.chart2) {
        //   coordinateY = newSeries.priceToCoordinate(linePriceData1.value)
        //   coordinateX = param.point.x;
        // } else {
        //   coordinateY = newSeries.priceToCoordinate(linePriceData2.value)
        //   coordinateX = param.point.x;
        // }

        if (seriesVisibility.chart1) {
          coordinateY = param.point.y;
          coordinateX = param.point.x;
        }
        else if (seriesVisibility.chart2) {
          coordinateY = param.point.y;
          coordinateX = param.point.x;
        } else {
          coordinateY = param.point.y;
          coordinateX = param.point.x;
        }
        // console.log(myChart.current.clientHeight + " " + coordinateY)

        // if (coordinateY > myChart.current.clientHeight - 40 || coordinateX > myChart.current.clientWidth) {
        //   myToolTip.current.style.opacity = "0";
        // } else {
        //   myToolTip.current.style.opacity = "100";
        // }
        // if (coordinateY > myChart.current.clientHeight - 40 || coordinateX > myChart.current.clientWidth) {
        //   myToolTip.current.style.display = "none";
        // } else {
        //   myToolTip.current.style.display = "block";
        // }
        //setting time and price
        setTime(param.time)
        setPrice({ chart1: linePriceData, chart2: linePriceData1, chart3: linePriceData2 })

        //debug code

        // console.log(coordinateY + " " + coordinateX)
        // console.log(time)
        // console.log(linePriceData.value)
        // console.log(price)

        //setting coordinate to tooltip div
        myToolTip.current.style.left = coordinateX + "px";
        myToolTip.current.style.top = coordinateY + "px";

        if (!seriesVisibility.chart1 && !seriesVisibility.chart2 && !seriesVisibility.chart3 || coordinateY > myChart.current.clientHeight - 40 || coordinateX > myChart.current.clientWidth) {
          if (myToolTip.current) {
            myToolTip.current.style.display = "none";
          }
        } else {
          if (myToolTip.current) {
            myToolTip.current.style.display = "block";
          }
        }
      }
    })


    //this will make our graph filled with screen
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    }

  }, [seriesVisibility, price])

  //to  hide tooltip if no chart is selected or active




  return (

    <div className='main_container'>
      {/* chart block */}
      <div ref={myChart} className='chartBox'></div>

      {/* tooltip div */}
      <div ref={myToolTip} className='tooltip'>
        <h3> Company : </h3>
        {price?.chart1?.value !== undefined && (
          <h5> Value blue : {price?.chart1?.value}</h5>
        )}
        {price.chart2?.value !== undefined && (
          <h5> Value red : {price.chart2.value}</h5>
        )}
        {price.chart3?.value !== undefined && (
          <h5> Value green : {price.chart3.value}</h5>
        )}
        <h5> Date : {time}</h5>
      </div>

      {/* button block */}
      <div className='container'>
        <button onClick={() => toggleSeriesVisibility('chart1')}>Toggle Series 1</button>
        <button onClick={() => toggleSeriesVisibility('chart2')}>Toggle Series 2</button>
        <button onClick={() => toggleSeriesVisibility('chart3')}>Toggle Series 3</button>
      </div>
    </div>



  )
}

export default App