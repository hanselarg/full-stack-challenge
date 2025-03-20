import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MapView from './components/MapView';
import ListView from './components/ListView';
import { setViewMode, setSelectedType } from './store/projectSlice';

function App() {
  const dispatch = useDispatch();
  const { viewMode, selectedType } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECTS', payload: selectedType });
  }, [dispatch, selectedType]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, newMode) => {
              if (newMode !== null) {
                dispatch(setViewMode(newMode));
              }
            }}
          >
            <ToggleButton value="map">Map View</ToggleButton>
            <ToggleButton value="list">List View</ToggleButton>
          </ToggleButtonGroup>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Project Type</InputLabel>
            <Select
              value={selectedType || ''}
              label="Project Type"
              onChange={(e) => dispatch(setSelectedType(e.target.value || null))}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="solar">Solar</MenuItem>
              <MenuItem value="wind">Wind</MenuItem>
              <MenuItem value="hydroelectric">Hydroelectric</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {viewMode === 'map' ? <MapView /> : <ListView />}
      </Box>
    </Container>
  );
}

export default App; 