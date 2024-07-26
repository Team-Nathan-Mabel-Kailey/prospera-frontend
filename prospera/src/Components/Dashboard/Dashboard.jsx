import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import './Dashboard.css'
import AddWidgetModal from '../AddWidgetModal/AddWidgetModal';
import ViewWidgetModal from '../ViewWidgetModal/ViewWidgetModal';
import EditWidgetModal from '../EditWidgetModal/EditWidgetModal';
import SavingsAccountWidget from '../SavingsAccountWidget/SavingsAccountWidget';
import CheckingAccountWidget from '../CheckingAccountWidget/CheckingAccountWidget';
import NewsWidget from '../NewsWidget/NewsWidget'
import FinancialGoalsWidget from '../FinancialGoalsWidget/FinancialGoalsWidget';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

// Makes layout responsive
const DashboardLayout = WidthProvider(Responsive);

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const Dashboard = () => {
  const [layouts, setLayouts] = useState({ 
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: []
  });

  const [widgetArray, setWidgetArray] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [userId, setUserId] = useState(null);
  const [existingWidgets, setExistingWidgets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userIdFromToken = getUserIdFromToken(token);
      setUserId(userIdFromToken);
    
      const fetchUserData = async () => {
        try {
          const userDataResponse = await axios.get(`http://localhost:3000/users/${userIdFromToken}`);
          const userData = userDataResponse.data;

          setExistingWidgets(userData.Widgets);
          setWidgetArray(userData.Widgets);
          
          const initialLayouts = userData.Widgets.reduce((acc, widget) => {
            const layout = { i: widget.i, x: widget.x, y: widget.y, w: widget.w, h: widget.h };
            acc.lg.push(layout);
            acc.md.push(layout);
            acc.sm.push(layout);
            acc.xs.push(layout);
            acc.xxs.push(layout);
            return acc;
          }, { lg: [], md: [], sm: [], xs: [], xxs: [] });

          setLayouts(initialLayouts);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleModify = async (layout, allLayouts) => {
    const updatedWidgets = widgetArray.map((widget) => {
      const updatedWidget = layout.find((obj) => obj.i === widget.id.toString());
      if (updatedWidget) {
        // Update the widget position and size in the database
        axios.put('http://localhost:3000/api/widgets/layout', {
          id: widget.id,
          x: updatedWidget.x,
          y: updatedWidget.y,
          w: updatedWidget.w,
          h: updatedWidget.h
        });

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

  const handleAddWidget = (newWidget) => {
    setWidgetArray([...widgetArray, newWidget]);
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      lg: [...prevLayouts.lg, { i: newWidget.id, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
      md: [...prevLayouts.md, { i: newWidget.id, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
      sm: [...prevLayouts.sm, { i: newWidget.id, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
      xs: [...prevLayouts.xs, { i: newWidget.id, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
      xxs: [...prevLayouts.xxs, { i: newWidget.id, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
    }));
  };

  // const handleAddWidget = async (newWidget) => {
  //   try {
  //     // Send the new widget data to the server
  //     const response = await axios.post('http://localhost:3000/api/widgets/create', {
  //       ...newWidget,
  //       userId: userId // Assuming you have userId in your component's state
  //     });
  
  //     // The server should return the created widget with its new ID
  //     const createdWidget = response.data;
  
  //     // Update widgetArray state
  //     setWidgetArray(prevWidgets => [...prevWidgets, createdWidget]);
  
  //     // Update layouts state
  //     setLayouts(prevLayouts => {
  //       const newLayouts = { ...prevLayouts };
  //       for (const breakpoint in newLayouts) {
  //         newLayouts[breakpoint] = [
  //           ...newLayouts[breakpoint],
  //           {
  //             i: createdWidget.id.toString(),
  //             x: createdWidget.x || 0,
  //             y: createdWidget.y || 0,
  //             w: createdWidget.w || 2,
  //             h: createdWidget.h || 2
  //           }
  //         ];
  //       }
  //       return newLayouts;
  //     });
  
  //     // Close the add widget modal
  //     setModalOpen(false);
  //   } catch (error) {
  //     console.error('Error adding widget:', error);
  //     // Optionally, show an error message to the user
  //   }
  // };

  const handleDeleteWidget = async (key) => {
    try {
      // Delete the widget from the server
      await axios.delete(`http://localhost:3000/api/widgets/${key}`);
  
      // Update widgetArray state
      setWidgetArray((prevWidgets) => prevWidgets.filter((widget) => widget.id !== key));
  
      // Update layouts state
      setLayouts((prevLayouts) => {
        const newLayouts = {};
        for (const breakpoint in prevLayouts) {
          newLayouts[breakpoint] = prevLayouts[breakpoint].filter((layout) => layout.i !== key.toString());
        }
        return newLayouts;
      });

    } catch (error) {
      console.error('Error deleting widget:', error);
      // Optionally, you can show an error message to the user here
    }
  };

  // const handleDeleteWidget = async (key) => {
  //   const updatedWidgets = widgetArray.filter((widget) => widget.i !== key);
  //   setWidgetArray(updatedWidgets);
  //   setLayouts((prevLayouts) => ({
  //     ...prevLayouts,
  //     lg: prevLayouts.lg.filter((layout) => layout.i !== key),
  //     md: prevLayouts.md.filter((layout) => layout.i !== key),
  //     sm: prevLayouts.sm.filter((layout) => layout.i !== key),
  //     xs: prevLayouts.xs.filter((layout) => layout.i !== key),
  //     xxs: prevLayouts.xxs.filter((layout) => layout.i !== key),
  //   }));

  //   axios.delete(`http://localhost:3000/api/widgets/${key}`);
  // };

  const handleAdd = () => {
    setModalOpen(true);
  };

  const handleView = (widget) => {
    setSelectedWidget(widget);
    setViewModalOpen(true);
  };

  const handleEdit = (widget) => {
    setSelectedWidget(widget);
    setEditModalOpen(true);
  };

  const stopPropagation = (evt) => {
    evt.stopPropagation();
  };

  const renderWidgetContent = (widget) => {
    switch (widget.type) {
        // case 'stock':
        //   return <StockWidget data={widget.configuration}/>;

        case 'financialGoals':
          return <FinancialGoalsWidget data={widget.configuration} id={widget.id}/>;

        case 'highlightedSavings':
          return <HighlightedSavingsWidget data={widget.configuration}/>;

        case 'news':
          return <NewsWidget data={widget.configuration}/>;

        case 'savingsAccount':
          return <SavingsAccountWidget data={widget.configuration}/>;

        case 'checkingsAccount':
          return <CheckingAccountWidget data={widget.configuration}/>;

      default:
        return <div>Unknown widget type: {widget.type}</div>;
    }
  };

  return (
    <>
    <div className='headerSpace' id='tempHeader'>
    </div>

    <div className="dashboardTitle">
      <h1>Your Dashboard</h1>
    </div>

    <div className='dashboardBody'>
      <button className="newWidgetBtn" onClick={handleAdd}>Add Widget</button>
      <AddWidgetModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onAdd={handleAddWidget} 
        existingWidgets={existingWidgets} 
        userId={userId} 
      />
      <EditWidgetModal 
        isOpen={editModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        widget={selectedWidget} 
      />
      <ViewWidgetModal 
        isOpen={viewModalOpen} 
        onClose={() => setViewModalOpen(false)} 
        widget={selectedWidget} 
      />

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
            key={widget.id.toString()}
            className="reactGridItem"
            data-grid={{
              x: widget.x,
              y: widget.y,
              w: widget.w,
              h: widget.h,
              i: widget.i,
            }}
            // style={{ backgroundColor }}
          >
            <div className="widgetContent">
              {renderWidgetContent(widget)}
            </div>

            <div className="widgetEditBtnd">

              <button
                // Prevent dragging when trying to delete widget
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                className="deleteButton no-drag"
                onClick={() => {
                  handleDeleteWidget(widget.id);
                }}
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWklEQVR4nGNgGAWDGBxnYGD4j4aPUcvww1gMJxcfHiiLD1ErNIYv+E8lPGoxQTAa1P9HExfDaHZiGC1AGEaLTKLAyCsyH1PB0kfkWOxJoeUgSz3IsXgUDA8AAHlcbV33qhrwAAAAAElFTkSuQmCC"/>
              </button>

              <button
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                className="viewButton no-drag"
                onClick={() => {
                  handleView(widget);
                }}
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsElEQVR4nO3YW0oDMRTG8b9TKV5fhEpxCdVXN6BvIqIvugcvqHjFRbgKwf2oICK1G/BNEAThSCBCjKjNjElOy3xwmEI7Ib+ezEwY+B6JUPdAm8SRYcFIhLpxjq1BhrQcTLLOSIQiB0YiQZJjJCIkKUYiQ5JhJAEkCUYSQaJjJCEkKkYSQ6JhJAMkCkYyQf4dkxPiY8xRFSTVn/AluScuNcRL7g5I3REvuTsgdUe85O6A1B3xkrsDUnfEiyirJiUjyuoJWB8EyC2wD8wDk8AMsAicWMTn7y6BEY2QN2AbKH6ZSwFcAO8ORhXEIJYC5rTiYDY0QUwnQnNmz+31ewNIcU00SkAKoGvH2NQAMRd22RzZMa41QDoVIB07RlcDZKoCZMyO8aoBMl0BMmHHeBmWpfWoAXJQAXJsx7jSALkrefttOFuWLQ0QU7slIOfOA3FU0xZlOQCx6mxR1vo9SRJi9v5YZoW3aXwOebGdCuJeM4fAgn3GjNst/aldRuIggt7Si7Lq2R1v2yL6xoiyajpzC8KIsvIza5ej+e4BmOOHaIcEYQYhbWeZlXkuqYrB7JhPHx5Gmdmq/xj8AAAAAElFTkSuQmCC"/>
              </button>
            
              <button
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                className="editButton no-drag"
                onClick={() => {
                  handleEdit(widget);
                }}
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABSUlEQVR4nO2ZvUoDQRRGT6ONVmKhnRbiCwhW+gD6BoqNo4V5k1QWprBNYS2CvVj5APoG/nRioUlAMSMTvoUQxsI03gv3wMLuzBb38N2dXWYhCP7KJnAFvAF94A7YxxmHwBeQK8c5TjgGhir6DFgBFoAT4EPjeziSaFfmW5orbeZCIgMvwPrEPYua6+FEIv8is6rxVxxJ5IpMR2OXOJPIYzJtnX8CGziUyGPHUEuzGRLwPYVEC0OEhBUiCStEElaIJKwQSVghkrBCJGGFFJ/iRkiRhBFSJGGEFEkYIUUSRkiRhBGOptyLLXu4ZpgHBt4lCrveN5QbTlXgBfDsMYmGBxW5BawBT96SKCypwPLrd3Y0UpcxLVE4UKHXoyuYAbbVZi7aqaGrYm8k8z6RxEAvSfM8Vp6Fey0AO8AcTrjVStVVmy3/d0EBjvkBUA0ZY3SLwb4AAAAASUVORK5CYII="/>
              </button>
            </div>
          </div>
        ))}
      </DashboardLayout>
    </div>
    </>
  );
};

export default Dashboard;