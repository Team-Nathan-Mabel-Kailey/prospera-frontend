import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import './Dashboard.css'

// Makes layout responsive
const DashboardLayout = WidthProvider(Responsive);

const Dashboard = () => {
  // Layouts for every screen size, makes dashboard responsive
  const [layouts, setLayouts] = useState({ 
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: []
  });

  // Widgets for testing purposes
  const [widgetArray, setWidgetArray] = useState([
    { i: "Widget 1", x: 0, y: 0, w: 2, h: 2, color: "#FFB6C1" },
    { i: "Widget 2", x: 2, y: 2, w: 2, h: 2, color: "#ADD8E6" },
    { i: "Widget 3", x: 4, y: 4, w: 2, h: 2, color: "#90EE90" },
  ]);

  // Used to handle widget modifications (position/size) and updating layouts
  // Layouts and allLayouts passed in as arguments by react-grid-layout
  const handleModify = (layout, allLayouts) => {
    const updatedWidgets = widgetArray.map((widget) => {
      const updatedWidget = layout.find((obj) => obj.i === widget.i);
      if (updatedWidget) {
        return {
          ...widget,
          x: updatedWidget.x,
          y: updatedWidget.y,
          w: updatedWidget.w,
          h: updatedWidget.h,
        };
      } else {
        return widget;
      }
    });
    setLayouts(allLayouts);
    setWidgetArray(updatedWidgets);
  };

  // Used to handle adding widgets and updating layouts
  const handleAdd = () => {
    const colors = ["#FFB6C1", "#ADD8E6", "#90EE90", "#FFD700", "#FFA07A"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newWidget = {
      i: `Widget ${widgetArray.length + 1}`,
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      color: randomColor,
    };

    setWidgetArray([...widgetArray, newWidget]);
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      lg: [...prevLayouts.lg, newWidget],
      md: [...prevLayouts.md, newWidget],
      sm: [...prevLayouts.sm, newWidget],
      xs: [...prevLayouts.xs, newWidget],
      xxs: [...prevLayouts.xxs, newWidget],
    }));
  };

  // Used to handle deleting widgets and updating layouts
  const handleDelete = (key) => {
    const updatedWidgets = widgetArray.filter((widget) => widget.i !== key);
    setWidgetArray(updatedWidgets);
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      lg: prevLayouts.lg.filter((layout) => layout.i !== key),
      md: prevLayouts.md.filter((layout) => layout.i !== key),
      sm: prevLayouts.sm.filter((layout) => layout.i !== key),
      xs: prevLayouts.xs.filter((layout) => layout.i !== key),
      xxs: prevLayouts.xxs.filter((layout) => layout.i !== key),
    }));
  };

  const stopPropagation = (evt) => {
    evt.stopPropagation();
  };

  return (
    <div className='dashboardBody'>
      <button onClick={handleAdd}>Add Widget</button>

      <DashboardLayout
        className='dash'
        onLayoutChange={handleModify}
        verticalCompact={true}
        layouts={layouts}
        // Breakpoints and cols are used for responsive design
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 2 }}
        autoSize={true}
        margin={[20, 20]}
      >
        {widgetArray.map((widget) => (
          <div
            // Widget container
            key={widget.i}
            className="reactGridItem"
            data-grid={{
              x: widget.x,
              y: widget.y,
              w: widget.w,
              h: widget.h,
              i: widget.i,
            }}
            style={{ backgroundColor: widget.color }}
          >
            <button
              // Prevent dragging when trying to delete widget
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
              className="deleteButton no-drag"
              onClick={() => {
                handleDelete(widget.i);
              }}
            >
              x
            </button>
            <div // Widget content
            >
            {widget.i}
            </div>
          </div>
        ))}
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;