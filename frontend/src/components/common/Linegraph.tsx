// src/MyLineChart.js

import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const MyLineChart = () => {
    const data = [
        {
            id: 'series1',
            data: [
                { x: 'January', y: 30 },
                { x: 'February', y: 50 },
                { x: 'March', y: 70 },
                { x: 'April', y: 90 },
                { x: 'May', y: 100 },
            ],
        },
        {
            id: 'series2',
            data: [
                { x: 'January', y: 40 },
                { x: 'February', y: 60 },
                { x: 'March', y: 80 },
                { x: 'April', y: 100 },
                { x: 'May', y: 120 },
            ],
        },
    ];

    return (
        <div style={{ height: '400px', backgroundColor: '#e0e0e0' }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Value',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                theme={{
                    background: '#232D3F', // Change the background color here
                    axis: {
                        domain: {
                            line: {
                                stroke: '#FFFFFF',
                                strokeWidth: 1,
                            },
                        },
                        legend: {
                            text: {
                                fontSize: 12,
                                fill: '#FFFFFF',
                            },
                        },
                        ticks: {
                            line: {
                                stroke: '#FFFFFF',
                                strokeWidth: 1,
                            },
                            text: {
                                fontSize: 11,
                                fill: '#FFFFFF',
                            },
                        },
                    },
                    grid: {
                        line: {
                            stroke: '#dddddd',
                            strokeWidth: 1,
                        },
                    },
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default MyLineChart;
