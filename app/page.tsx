"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangle, Check, Activity, Gauge, Thermometer, Droplet, Plane } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import FlightCard from './components/flightcard';

// Cathay Pacific color palette
const colors = {
  primary: '#006564',    // Teal Green
  secondary: '#A88C48',  // Metallic Gold
  success: '#04605e',    // Darker Teal
  warning: '#c1b49a',    // Brighter Gold
  background: '#F5F5F5', // Light Gray
  text: '#2D2926',       // Dark Gray
  white: '#FFFFFF'
};

const MaintenanceDashboard = () => {
  const [fleetStatus, setFleetStatus] = useState({
    needsMaintenance: false,
    probability: 0,
    featureImportance: []
  });

  const [sensorData, setSensorData] = useState({
    engine_temperature: 350,
    vibration_level: 0.5,
    fuel_consumption: 800,
    flight_hours: 2500,
    cycles: 500
  });

  const [historicalData, setHistoricalData] = useState([
    { time: '1h', temp: 345, vib: 0.48 },
    { time: '2h', temp: 350, vib: 0.5 },
    { time: '3h', temp: 348, vib: 0.52 },
    { time: '4h', temp: 352, vib: 0.49 },
    { time: '5h', temp: 349, vib: 0.51 }
  ]);

  const fetchPrediction = async () => {
    // try {
    //   const response = await fetch('http://localhost:8000/predict', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(sensorData),
    //   });
    //   const data = await response.json();

    //   setFleetStatus({
    //     needsMaintenance: data.maintenance_needed,
    //     probability: data.probability,
    //     featureImportance: Object.entries(data.feature_importance).map(([name, value]) => ({
    //       name: name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    //       value: value * 100
    //     }))
    //   });

    //   // Update historical data
    //   const newDataPoint = {
    //     time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    //     temp: sensorData.engine_temperature,
    //     vib: sensorData.vibration_level
    //   };
    //   setHistoricalData(prev => [...prev.slice(1), newDataPoint]);

    // } catch (error) {
    //   console.error('Error fetching prediction:', error);
    // }
  };

  useEffect(() => {
    fetchPrediction();
    const interval = setInterval(fetchPrediction, 30000);
    return () => clearInterval(interval);
  }, [sensorData]);

  return (
    <div className="min-h-screen p-8" style={{ background: colors.background }}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <Plane className="h-8 w-8" style={{ color: colors.primary }} />
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>
                OptiTech
              </h1>
              <p className="text-sm" style={{ color: colors.secondary }}>
                Cathay Pacific Airways
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full"
            style={{ background: colors.primary + '10' }}>
            <Activity className="h-4 w-4" style={{ color: colors.primary }} />
            <span className="text-sm" style={{ color: colors.primary }}>Live Updates</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FlightCard
            flightId={1234}
          />
          <FlightCard
            flightId={1234}
          />
          <FlightCard
            flightId={1234}
          />
        </div>

        {/* Trend Analysis */}
        <Card className="border-none shadow-lg">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-semibold" style={{ color: colors.primary }}>
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.primary + '20'} />
                  <XAxis dataKey="time" stroke={colors.text} />
                  <YAxis yAxisId="left" stroke={colors.primary} />
                  <YAxis yAxisId="right" orientation="right" stroke={colors.secondary} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: colors.white,
                      border: `1px solid ${colors.primary}20`,
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="temp"
                    stroke={colors.primary}
                    strokeWidth={2}
                    dot={{ fill: colors.primary }}
                    name="Temperature"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="vib"
                    stroke={colors.secondary}
                    strokeWidth={2}
                    dot={{ fill: colors.secondary }}
                    name="Vibration"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;
