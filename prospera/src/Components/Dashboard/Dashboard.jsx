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
import StockWidget from '../StockWidget/StockWidget'
import FinancialGoalsWidget from '../FinancialGoalsWidget/FinancialGoalsWidget';
import HighlightedGoalWidget from '../HighlightedGoalWidget/HighlightedGoalWidget';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PageviewIcon from '@mui/icons-material/Pageview';
import EditIcon from '@mui/icons-material/Edit';
import { grey } from '@mui/material/colors';

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
  let BASE_URL = import.meta.env.VITE_BASE_URL;

  const style = {
    bgcolor: 'black',
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    boxShadow: 15,
    borderRadius: 3
  }
  
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const userIdFromToken = getUserIdFromToken(token);
//       setUserId(userIdFromToken);
    
//       const fetchUserData = async () => {
//         try {
//           const userDataResponse = await axios.get(`https://prospera-api.onrender.com/users/${userIdFromToken}`);
//           const userData = userDataResponse.data;

  let theme = createTheme({  
    typography: {
      fontFamily: [
        'Outfit',
        'Manrope',
      ].join(','),
    },
  });
  theme = responsiveFontSizes(theme);

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
        axios.put(`${BASE_URL}/api/widgets/layout`, {
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
          const userDataResponse = await axios.get(`${BASE_URL}/users/${userIdFromToken}`);
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
      await axios.delete(`${BASE_URL}/api/widgets/${key}`);
  
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
        case 'Stock':
          return <StockWidget data={widget.configuration}/>;

        case 'Financial Goals':
          return <FinancialGoalsWidget data={widget.configuration} id={widget.id}/>;

        case 'Highlighted Goal':
          return <HighlightedGoalWidget data={widget.configuration}/>;

        case 'News':
          return <NewsWidget data={widget.configuration}/>;

        case 'Savings Account':
          return <SavingsAccountWidget data={widget.configuration}/>;

        case 'Checking Account':
          return <CheckingAccountWidget data={widget.configuration}/>;

      default:
        return <div>Widget type: {widget.type}</div>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <head>
      <style>
        h3 
        </style>
      </head> */}
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
            sx={style}
            // style={{ backgroundColor }}
          >
            <CardHeader
              className='cardHeader'
              subheader={widget.type}
              subheaderTypographyProps={{ color: 'white' }} 
              style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 12, paddingRight: 12, marginTop: 5, marginRight: 0, marginBottom: 0, marginLeft: 0}}
              action={
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
                    <DeleteForeverIcon sx={{ color: grey[50] }} />
                  </button>

                  <button
                    onMouseDown={stopPropagation}
                    onTouchStart={stopPropagation}
                    className="viewButton no-drag"
                    onClick={() => {
                      handleView(widget);
                    }}
                  >
                    <PageviewIcon sx={{ color: grey[50] }} />
                  </button>
                
                  <button
                    onMouseDown={stopPropagation}
                    onTouchStart={stopPropagation}
                    className="editButton no-drag"
                    onClick={() => {
                      handleEdit(widget);
                    }}
                  >
                    <EditIcon sx={{ color: grey[50] }} />
                  </button>
                </div>
            } />
            
            <hr style={{width: "100%"}}/>

            <CardContent className="widgetContent" style={{ flex: 1, overflow: 'hidden', paddingTop: 6, paddingLeft: 18, paddingBottom: 0}}>
              {renderWidgetContent(widget)}
            </CardContent>

          </Card>
        ))}
      </DashboardLayout>
    </div>
    </ThemeProvider>
  );
};

export default Dashboard;