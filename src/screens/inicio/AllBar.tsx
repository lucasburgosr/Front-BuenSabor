import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { HighlightScope } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';


const barChartsParams = {
    colors: ['#5bbec0', '#a6c732', '#b9d162','#afd888', '#ccdd91', '#e0ebc2'],
    categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  series: [
    
    { data: [3, 4, 1, 6, 5], label: 'BAR 1' },
    { data: [4, 3, 1, 5, 8], label: 'BAR 2' },
    { data: [4, 2, 5, 4, 1], label: 'BAR 3' },
    { data: [3, 2, 3, 1, 5], label: 'BAR 4' },
    { data: [4, 3, 1, 5, 8], label: 'BAR 5' },
    { data: [4, 1, 4, 7, 1], label: 'BAR 6' },
  ],
  height: 290,
};
const lineChartsParams = {
    colors: ['#5bbec0', '#a6c732', '#b9d162','#afd888', '#ccdd91', '#e0ebc2'],
  series: [
    { data: [3, 4, 1, 6, 5], label: 'BAR 1', area: false, stack: 'total' },
    { data: [4, 3, 1, 5, 8], label: 'BAR 2', area: false, stack: 'total' },
    { data: [4, 2, 5, 4, 1], label: 'BAR 3', area: false, stack: 'total' },
    { data: [3, 4, 1, 6, 5], label: 'BAR 4', area: false, stack: 'total' },
    { data: [4, 3, 1, 5, 8], label: 'BAR 5', area: false, stack: 'total' },
    { data: [4, 2, 5, 4, 1], label: 'BAR 6', area: false, stack: 'total' },
  ],
  xAxis: [{ data: [1, 2, 3, 4, 5], type: 'linear' }],
  height: 290,
};

export default function ElementHighlights() {
  const [chartType, setChartType] = React.useState('bar');
  const [withArea, setWithArea] = React.useState(false);
  const [highlighted, setHighlighted] = React.useState('item');
  const [faded, setFaded] = React.useState('global');

  const handleChartType = (_event: any, newChartType: string) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  return (
    <Stack
      direction={{ xs: 'column', xl: 'row' }}
      spacing={1}
      sx={{ width: '100%' }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartType}
          aria-label="chart type"
          fullWidth
        >
          {['bar', 'line'].map((type) => (
            <ToggleButton key={type} value={type} aria-label="left aligned">
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {chartType === 'bar' && (
          <BarChart
            {...barChartsParams}
            series={barChartsParams.series.map((series) => ({
              ...series,
              highlightScope: {
                highlighted,
                faded,
              } as HighlightScope,
            }))}
          />
        )}
        {chartType === 'line' && (
          <LineChart
            {...lineChartsParams}
            series={lineChartsParams.series.map((series) => ({
              ...series,
              area: withArea,
              highlightScope: {
                highlighted,
                faded,
              } as HighlightScope,
            }))}
          />
        )}
        
  
      </Box>
      <Stack
        direction={{ xs: 'row', xl: 'column' }}
        spacing={3}
        justifyContent="center"
        flexWrap="wrap"
        useFlexGap
      >
        <TextField
          select
          label="highlighted"
          value={highlighted}
          onChange={(event) => setHighlighted(event.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value={'none'}>none</MenuItem>
          <MenuItem value={'item'}>item</MenuItem>
          <MenuItem value={'series'}>series</MenuItem>
        </TextField>
        <TextField
          select
          label="faded"
          value={faded}
          onChange={(event) => setFaded(event.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value={'none'}>none</MenuItem>
          <MenuItem value={'series'}>series</MenuItem>
          <MenuItem value={'global'}>global</MenuItem>
        </TextField>
        {chartType === 'line' && (
          <FormControlLabel
            control={
              <Switch
                checked={withArea}
                onChange={(event) => setWithArea(event.target.checked)}
              />
            }
            label="Fill line area"
          />
        )}
      </Stack>
    </Stack>
  );
}