import React, { useState } from 'react';
import { BarChart} from "@mui/x-charts";
import { Grid, Container, Box, Button } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsReferenceLine } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
export function Graph() {
  const [selectedGraph, setSelectedGraph] = useState('bar');
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];
  const handleButtonClick = () => {
    setSelectedGraph(selectedGraph === 'bar' ? 'line' : 'bar');
  };

  return (
    <Container maxWidth="xl">
      <Grid item sx={{ margin: "20px" }} container spacing={10}></Grid>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {selectedGraph === 'bar' ? (
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: [
                  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", 
                  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
                  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", 
                  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
                ],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                color: "#2196f3",
              },
            ]}
            width={800}
            height={500}
          />
        ) : (
          <LineChart
            xAxis={[
              {
                id: "lineCategories",
                data: [0, 1, 2, 3, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
              },
            ]}
            series={[
              {
                data: [0, 8, 2, 3, 8, 9, 10, 11, 12, 2, 4, 6, 6, 14, 10, 14, 8, 17, 7, 12, 16],
                area: true,
              },
            ]}
            width={800}
            height={500}
          />
          
        )}<LineChart
        width={500}
        height={300}
        series={[
          { data: pData, label: 'pv', yAxisKey: 'leftAxisId' },
          { data: uData, label: 'uv', yAxisKey: 'rightAxisId' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
        rightAxis="rightAxisId"
      /> <ChartContainer
      width={500}
      height={300}
      series={[
        { data: pData, label: 'pv', type: 'line' },
        { data: uData, label: 'uv', type: 'line' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    >
      <LinePlot />
      <MarkPlot />
      <ChartsReferenceLine
        x="Page C"
        label="Max PV PAGE"
        lineStyle={{ stroke: 'red' }}
      />
      <ChartsReferenceLine y={9800} label="Max" lineStyle={{ stroke: 'red' }} />
      <ChartsXAxis />
      <ChartsYAxis />
    </ChartContainer>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          {selectedGraph === 'bar' ? 'Show Line Graph' : 'Show Bar Graph'}
        </Button>
      </Box>
    </Container>
    
  );
}

