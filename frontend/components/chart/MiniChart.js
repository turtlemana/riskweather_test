import React from "react";
import { ResponsiveLine } from "@nivo/line";
import {Line} from "@nivo/line"



const MyResponsiveLine = ({ data }) => (
  
    <div style={{ width: 30, height: 30 }}>
  <ResponsiveLine
    data={data}
    margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
    colors={data[0].color}
    
    xFormat="time:%Y-%m-%d"
    xScale={{type:"time",
    format: '%Y-%m-%d',
    useUTC: false,
    precision: 'day',}}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false
    }}
    enableCrosshair={false}
    enableArea={false}
    yFormat=" >-.2f"
    axisTop={null}
    axisLeft={null}
    axisBottom={null}

    // axisBottom={{
    //   orient: "bottom",
    //   tickSize: 3,
    //   tickPadding: 3,
    //   tickRotation: 0,
      
    //   legend: "Tail Risk",
    //   legendOffset: 36,
    //   legendPosition: "middle"
    // }}
    // axisLeft={{
    //   orient: "left",
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   tickValues:5,
    //   legend: "Risk",
    //   legendOffset: -40,
    //   legendPosition: "middle"
    // }}
    enablePoints={false}
    enablePointLabel={false}
    axisRight={null}
    enableGridX={false}
    enableGridY={false}

    pointSize={0}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={false}
    // legends={[
    //   {
    //     anchor: "bottom-right",
    //     direction: "column",
    //     justify: false,
    //     translateX: 100,
    //     translateY: 0,
    //     itemsSpacing: 0,
    //     itemDirection: "left-to-right",
    //     itemWidth: 80,
    //     itemHeight: 20,
    //     itemOpacity: 0.75,
    //     symbolSize: 12,
    //     symbolShape: "circle",
    //     symbolBorderColor: "rgba(0, 0, 0, .5)",
    //     effects: [
    //       {
    //         on: "hover",
    //         style: {
    //           itemBackground: "rgba(0, 0, 0, .03)",
    //           itemOpacity: 1
    //         }
    //       }
    //     ]
    //   }
    // ]}
  />
  </div>
);

// export default MyResponsiveLine;

export default function MiniChart({data}) {
  return (
    <div style={{ width: 30, height: 30 }}>
      <MyResponsiveLine data={data} />
    </div>
  );
}

