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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

// Makes layout responsive
const DashboardLayout = WidthProvider(Responsive);

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

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  
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
          console.log('a users widgets: ', userData.Widgets);
          
          // const initialLayouts = userData.Widgets.reduce((acc, widget) => {
          // const layout = { i: widget.i, x: widget.x, y: widget.y, w: widget.w, h: widget.h };
          //   acc.lg.push(layout);
          //   acc.md.push(layout);
          //   acc.sm.push(layout);
          //   acc.xs.push(layout);
          //   acc.xxs.push(layout);
          //   return acc;
          // }, { lg: [], md: [], sm: [], xs: [] });
  
          // setLayouts(initialLayouts);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }
  }, []);
      
      //   } catch (error) {
      //     console.error('Error fetching user data:', error);
      //   }
      // };

  //     fetchUserData();
  //   }
  // }, []);

  const handleAddWidget = (newWidget) => {
    setWidgetArray([...widgetArray, newWidget]);
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      lg: [...prevLayouts.lg, { i: newWidget.id, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
      md: [...prevLayouts.md, { i: newWidget.id, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
      sm: [...prevLayouts.sm, { i: newWidget.id, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
      xs: [...prevLayouts.xs, { i: newWidget.id, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
      // xxs: [...prevLayouts.xxs, { i: newWidget.id, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
    }));
  };

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

        // case 'highlightedSavings':
        //   return <HighlightedSavingsWidget data={widget.configuration}/>;

        case 'news':
          return <NewsWidget data={widget.configuration}/>;

        case 'savingsAccount':
          return <SavingsAccountWidget data={widget.configuration}/>;

        case 'checkingsAccount':
          return <CheckingAccountWidget data={widget.configuration}/>;

      default:
        return <div>Widget type: {widget.type}</div>;
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
        compactType='horizontal'
        layouts={layouts}
        // Breakpoints and cols are used for responsive design
        // breakpoints={{ lg: 800, xs: 200 }}
        // cols={{ lg: 8, xs: 2}}
        // maxRows={4}
        // autoSize={true}
        margin={[30, 30]}
      >
        {widgetArray.map((widget) => (
          <Card
            // Widget container
            key={widget.id.toString()}
            className="reactGridItem"
            data-grid={{
              x: widget.x,
              y: widget.y,
              w: widget.w,
              h: widget.h,
              i: widget.i,
              minW: widget.minW,
              maxW: widget.maxW,
              minH: widget.minH,
              maxH: widget.maxH
            }}
            // style={{ backgroundColor }}
          >
            <div className="widgetEditBtns">
              <button
                // Prevent dragging when trying to delete widget
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                className="deleteButton no-drag"
                onClick={() => {
                  handleDeleteWidget(widget.id);
                }}
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVR4nO3QwQmAMBBE0ZSnbRvQPmIh37selmwGlDivgPkwpdhXAQdPu2q8olPfCm+SN+aFiMMhX50Vf3uTLjncC1+d5KtDv7z6FHRbJrwOxhuwdIdtGheIAr9DNss0IAAAAABJRU5ErkJggg=="/>
              </button>

              <button
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                className="viewButton no-drag"
                onClick={() => {
                  handleView(widget);
                }}
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsklEQVR4nO2YXUrDQBCA11aKvy9CRTyC+uoF9E1E9EXvUJUq/uIhPIXgfaogIrUX8E0QBOGThSlE2zSb1p1OJN9LCOwO82Um2SHO/YI4PAFLThPioStDHFqJa73IIvWEjE5liIDE1ZUhkoi6DBFFVGWILKImg4KIigxKItFlUBSJKoOySDQZxiASRYYxify5DGMU6SPTcpZERsGVIsZwZUWM4cqKGMOVFTGGKytiDPdfKgLU/ovIK7BbBJEHoAmsArPAArAOXIhEl1tgwqLIJ9AAKgNyqQA3wFdXxpqIl9jIkdNWQmbPkkgj+MkKwJXs7QR9AJTeiWpmIv3brC0x9p0BkWZmEikAZxLjPmRxbFYyk0jB75UY7ZDFsZnLTCIFYEpifIQsjs18ZhIpADMS4z1kcRFa68WCyMkIIucS486CyOOQn99qYmQ5sCDiORpC5DpxIE5aGlE2c0hsJ0aUndBNKMocD2ozeofGt+Af2+jj35lTYM2fMcC0jPSX0kYkJML/0mOPjp94ffIiESaDPWqJ3MJlMIbrzW9R2tHzDCwXUiSXTBHgZ5vlPpdMITKH/uYbY7tw/1fn3ScAAAAASUVORK5CYII="/>
              </button>
            
              <button
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                className="editButton no-drag"
                onClick={() => {
                  handleEdit(widget);
                }}
              >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABUUlEQVR4nO3ZvU5UQRgG4GmgkYpQSAeF8QZIqOQC5A40NLtSyJ1QUUBhuwW1MbE3VnsBegf8dIQChUQCjxnybbLB00DjN8k81e7MKb4375yTzdlSuu5JsIkvuMQ1pnhfWoIRbg37VFqAXdzH0IdYwzI+4lesvysNhdgf2N+LvWlpJER1jtePrll52OF3aSTEYBisx/pFaSjEP2FwFGufS2Mh5sPsx+c/2CgNhphXrx+VLDDGnaeH2CtZ9BBZ9Cay6E1k0ZvIojeRRW8iC/0HYBJ6E0noTSShN5GE3kQSehNJ6E0kgQ/PfBe7W7LAEm6aDlFhu+kXyjM4iAGPcdZcEzP4GUO+wSucNtVEhZcxYP3rdzHWhsLkDVFhJwb9Gt8XsBXHLP9xmsEkhv1Ww+DqURP1aTYu2eFk4F74EQ+At3hRWoDv8aSaxDFb/d8zdaVhfwG3LEGdXdjCzgAAAABJRU5ErkJggg=="/>              </button>
            </div>

            <CardContent className="widgetContent">
              {renderWidgetContent(widget)}
            </CardContent>

          </Card>
        ))}
      </DashboardLayout>
    </div>
    </>
  );
};

export default Dashboard;