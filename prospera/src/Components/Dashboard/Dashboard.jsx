import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import './Dashboard.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
    const [layouts, setLayouts] = useState(null);
  const [widgetArray, setWidgetArray] = useState([
    { i: "widget1", x: 0, y: 0, w: 2, h: 2 },
    { i: "widget2", x: 2, y: 2, w: 2, h: 2 },
    { i: "widget3", x: 4, y: 4, w: 2, h: 2 },
  ]);

  const handleModify = (layouts, layout) => {
    const tempArray = widgetArray;
    setLayouts(layout);
    layouts?.map((position) => {
      tempArray[Number(position.i)].x = position.x;
      tempArray[Number(position.i)].y = position.y;
      tempArray[Number(position.i)].width = position.w;
      tempArray[Number(position.i)].height = position.h;
    });
    setWidgetArray(tempArray);
  };

  const handleAdd = () => {
    setWidgetArray([
      ...widgetArray,
      { i: "widget" + (widgetArray.length + 1), x: 0, y: 0, w: 2, h: 2 },
    ]);
  };

  const handleDelete = (key) => {
    const tempArray = widgetArray.slice();
    const index = tempArray.indexOf(tempArray.find((data) => data.i === key));
    tempArray.splice(index, 1);
    setWidgetArray(tempArray);
  };

  return (
    <div>
      <button onClick={() => handleAdd()}>Add Widget</button>

      <ResponsiveReactGridLayout
        onLayoutChange={handleModify}
        verticalCompact={true}
        layout={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 2 }}
        autoSize={true}
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >
        {widgetArray?.map((widget, index) => {
          return (
            <div
              className="reactGridItem"
              key={index}
              data-grid={{
                x: widget?.x,
                y: widget?.y,
                w: widget?.w,
                h: widget?.h,
                i: widget.i,
                minW: 2,
                maxW: Infinity,
                minH: 2,
                maxH: Infinity,
                isDraggable: true,
                isResizable: true,
              }}
            >
              <button
                className="deleteButton"
                onClick={() => handleDelete(widget.i)}
              >
                x
              </button>
              <div>{widget.i}</div>
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Dashboard


        // <div>
        //     <div className="welcomeBack">
        //         <h2>Welcome back, ____!</h2>
        //     </div>

        //     <div className="dashboard">
        //         <div className='left-column'>
        //             <div className='area2'>
        //                 <div className='area1'> 
        //                     <img className='image1' src="https://placehold.co/300x200" alt="placeholder" />
        //                     <div className='area0'>
        //                         <h3>Header1</h3>
        //                         <h3>Header1</h3>
        //                     </div>
        //                 </div>
        //                 <div className='dashboardBankAccts'>
        //                     <h3>Checkings</h3>
        //                     <h3>Savings</h3>
        //                 </div>
                        
        //             </div>

        //             <img className='image2 right-column' src="https://preview.redd.it/can-they-please-bring-back-the-old-stocks-widget-v0-tu2me20n0cwb1.jpg?width=1284&format=pjpg&auto=webp&s=217d0fd8abcbfa6eade90e24c873b517e6b583bd" alt="placeholder" />
        //         </div>

        //         <div className='area4'>
        //             <img className='image3' src="https://placehold.co/200x150" alt="placeholder" />
        //             <img className='image3' src="https://placehold.co/200x150" alt="placeholder" />
        //             <img className='image3' src="https://placehold.co/200x150" alt="placeholder" />
        //             <img className='image3' src="https://placehold.co/200x150" alt="placeholder" />
        //         </div>

        //         <Link to={`/api/chat`}>
        //             <div className='chatIcon'>
        //                 <img src="https://placehold.co/50x50" alt="chat icon" />
        //             </div>
        //         </Link>
        //     </div>
        // </div>      