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
import FinancialAccountsWidget from "../FinancialAccountsWidget/FinancialAccountsWidget";
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
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
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
      console.log("userid", userIdFromToken);
      setUserId(userIdFromToken);
    
      const fetchUserData = async () => {
        try {
          console.log("userid in try", userIdFromToken);
          const userDataResponse = await axios.get(`${BASE_URL}/users/${userIdFromToken}`);
          console.log("userdata", userDataResponse.data)
          const userData = userDataResponse.data;

          setExistingWidgets(userData.Widgets);
          setWidgetArray(userData.Widgets);
          setFirstName(userData.firstName);
          setUserName(userData.username);
          console.log("first name", firstName, "username", userName);
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
          return (
            <CardContent className="widgetContent" style={{ flex: 1, overflow: 'hidden', paddingTop: 7, paddingLeft: 18, paddingBottom: 0}}>
              <StockWidget data={widget.configuration}/>
            </CardContent>
          );

        case 'Financial Goals':
          return (
            <CardContent className="widgetContent" style={{ flex: 1, overflow: 'hidden', paddingTop: 7, paddingLeft: 18, paddingBottom: 0}}>
              <FinancialGoalsWidget data={widget.configuration} id={widget.id}/>
            </CardContent>
          );
          // return 

        case 'Highlighted Goal':
          return (
            <CardContent className="widgetContent" style={{ flex: 1, overflow: 'hidden', paddingTop: 7, paddingLeft: 18, paddingBottom: 0}}>
              <HighlightedGoalWidget data={widget.configuration}/>
            </CardContent>
          );
          // return 

        case 'News':
          return (
            <CardContent className="widgetContent" style={{ flex: 1, overflow: 'hidden', paddingTop: 7, paddingLeft: 18, paddingBottom: 0}}>
              <NewsWidget data={widget.configuration}/>
            </CardContent>
          );
          // return 

        case 'Savings Account':
          return (
            <CardContent className="widgetContent" style={{ flex: 1, overflow: 'hidden', paddingTop: 7, paddingLeft: 18, paddingBottom: 0}}>
              <SavingsAccountWidget data={widget.configuration}/>
            </CardContent>
          );
          // return 

        case 'Checking Account':
          return (
            <CardContent className="widgetContent" style={{ flex: 1, overflow: 'hidden', paddingTop: 7, paddingLeft: 18, paddingBottom: 0}}>
              <CheckingAccountWidget data={widget.configuration}/>
            </CardContent>
          );
          // return 

        case 'Financial Accounts': 
          return (
            <CardContent className="widgetContent" style={{ flex: 1, overflow: 'hidden', paddingTop: 7, paddingLeft: 18, paddingBottom: 0}}>
              <FinancialAccountsWidget data={widget.configuration}/>
            </CardContent>
          );
          // return 

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
      <h1>Welcome back to your Dashboard, &nbsp;{firstName && firstName.trim() !== '' ? firstName : userName}!</h1>
      <button className="newWidgetBtn" onClick={handleAdd}>Add Widget</button>
    </div>

    <div className="descriptionContainer">
      <div className="descriptionParagraph">
        <p>Say hello to your comprehensive tool for managing and 
          enhancing your financial well-being. Here, you can effortlessly keep track of your finances and financial education resources.</p>
      </div>
        <Stack direction="row" spacing={1}>
          <Chip label="Monitor balance totals across multiple bank accounts" variant="outlined" sx={{ bgcolor: '#4a0a77', color: 'white', fontSize: '1.2rem', padding: '17px 0px 17px 0px' }} />
          <Chip label="Stay updated on stock trends" variant="outlined" sx={{ bgcolor: '#5a108f', color: 'white', fontSize: '1.2rem', padding: '17px 0px 17px 0px'   }}/>
          <Chip label="Managing your stock portfolio" variant="outlined" sx={{ bgcolor: '#6818a5', color: 'white', fontSize: '1.2rem', padding: '17px 0px 17px 0px'   }}/>
          <Chip label="Set and achieve financial goals" variant="outlined" sx={{ bgcolor: '#8b2fc9', color: 'white', fontSize: '1.2rem', padding: '17px 0px 17px 0px'   }}/>
          <Chip label="Access news articles tailored to your financial interests" variant="outlined" sx={{ bgcolor: '#ab51e3', color: 'white', fontSize: '1.2rem', padding: '17px 0px 17px 0px'   }}/>
        </Stack>
        {/* <div className="descriptionParagraph">
          <p>Take control of your financial future with Prospera, where you can thrive financially and live fully.</p>
        </div> */}
    </div>

    <div className='dashboardBody'>
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
              style={{ backgroundColor: '#410083', paddingTop: 6, paddingBottom: 5, paddingLeft: 12, paddingRight: 12, marginRight: 0, marginBottom: 0, marginLeft: 0}}
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


            {renderWidgetContent(widget)}
            

          </Card>
        ))}
      </DashboardLayout>
    </div>
    </ThemeProvider>
  );
};

export default Dashboard;