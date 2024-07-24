// import React, { useState, useEffect } from "react";
// import { Responsive, WidthProvider } from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import './Dashboard.css'
// import AddWidgetModal from '../AddWidgetModal/AddWidgetModal';
// import ViewWidgetModal from '../ViewWidgetModal/ViewWidgetModal';
// import EditWidgetModal from '../EditWidgetModal/EditWidgetModal';
// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";

// // Makes layout responsive
// const DashboardLayout = WidthProvider(Responsive);

// const getUserIdFromToken = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     return decoded.userId;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };

// const Dashboard = () => {
//   const [layouts, setLayouts] = useState({ 
//     lg: [],
//     md: [],
//     sm: [],
//     xs: [],
//     xxs: []
//   });

//   const [widgetArray, setWidgetArray] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedWidget, setSelectedWidget] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [existingWidgets, setExistingWidgets] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const userIdFromToken = getUserIdFromToken(token);
//       setUserId(userIdFromToken);
    
//       const fetchUserData = async () => {
//         try {
//           const userDataResponse = await axios.get(`http://localhost:3000/users/${userIdFromToken}`);
//           const userData = userDataResponse.data;
//           console.log(userData.Widgets);

//           setExistingWidgets(userData.Widgets);
//           setWidgetArray(userData.Widgets);
          
//           const initialLayouts = userData.Widgets.reduce((acc, widget) => {
//             const layout = { i: widget.i, x: widget.x, y: widget.y, w: widget.w, h: widget.h };
//             acc.lg.push(layout);
//             acc.md.push(layout);
//             acc.sm.push(layout);
//             acc.xs.push(layout);
//             acc.xxs.push(layout);
//             return acc;
//           }, { lg: [], md: [], sm: [], xs: [], xxs: [] });

//           setLayouts(initialLayouts);
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       };

//       fetchUserData();
//     }
//   }, []);

//   const handleModify = async (layout, allLayouts) => {
//     const updatedWidgets = widgetArray.map((widget) => {
//       const updatedWidget = layout.find((obj) => obj.i === widget.widgetId.toString());
//       if (updatedWidget) {
//         console.log(updatedWidget.i);
//         // Update the widget position and size in the database
//         axios.put('http://localhost:3000/api/widgets/layout', {
//           i: updatedWidget.i,
//           x: updatedWidget.x,
//           y: updatedWidget.y,
//           w: updatedWidget.w,
//           h: updatedWidget.h
//         });

//         return {
//           ...widget,
//           x: updatedWidget.x,
//           y: updatedWidget.y,
//           w: updatedWidget.w,
//           h: updatedWidget.h,
//         };
//       } else {
//         return widget;
//       }
//     });
//     setLayouts(allLayouts);
//     setWidgetArray(updatedWidgets);
//   };

//   const handleAddWidget = (newWidget) => {
//     setWidgetArray([...widgetArray, newWidget]);
//     setLayouts((prevLayouts) => ({
//       ...prevLayouts,
//       lg: [...prevLayouts.lg, { i: newWidget.i, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
//       md: [...prevLayouts.md, { i: newWidget.i, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
//       sm: [...prevLayouts.sm, { i: newWidget.i, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
//       xs: [...prevLayouts.xs, { i: newWidget.i, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
//       xxs: [...prevLayouts.xxs, { i: newWidget.i, x: newWidget.x, y: newWidget.y, w: newWidget.w, h: newWidget.h }],
//     }));
//   };

//   const handleDeleteWidget = (key) => {
//     const updatedWidgets = widgetArray.filter((widget) => widget.widgetId.toString() !== key);
//     setWidgetArray(updatedWidgets);
//     setLayouts((prevLayouts) => ({
//       ...prevLayouts,
//       lg: prevLayouts.lg.filter((layout) => layout.i !== key),
//       md: prevLayouts.md.filter((layout) => layout.i !== key),
//       sm: prevLayouts.sm.filter((layout) => layout.i !== key),
//       xs: prevLayouts.xs.filter((layout) => layout.i !== key),
//       xxs: prevLayouts.xxs.filter((layout) => layout.i !== key),
//     }));
//   };

//   const handleAdd = () => {
//     setModalOpen(true);
//   };

//   const handleView = (widget) => {
//     setSelectedWidget(widget);
//     setViewModalOpen(true);
//   };

//   const handleEdit = (widget) => {
//     setSelectedWidget(widget);
//     setEditModalOpen(true);
//   };

//   const stopPropagation = (evt) => {
//     evt.stopPropagation();
//   };

//   return (
//     <div className='dashboardBody'>
//       <button onClick={handleAdd}>Add Widget</button>
//       <AddWidgetModal 
//         isOpen={modalOpen} 
//         onClose={() => setModalOpen(false)} 
//         onAdd={handleAddWidget} 
//         existingWidgets={existingWidgets} 
//         userId={userId} 
//       />
//       <EditWidgetModal 
//         isOpen={editModalOpen} 
//         onClose={() => setEditModalOpen(false)} 
//         widget={selectedWidget} 
//       />
//       <ViewWidgetModal 
//         isOpen={viewModalOpen} 
//         onClose={() => setViewModalOpen(false)} 
//         widget={selectedWidget} 
//       />

//       <DashboardLayout
//         className='dash'
//         onLayoutChange={handleModify}
//         verticalCompact={true}
//         layouts={layouts}
//         // Breakpoints and cols are used for responsive design
//         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//         cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 2 }}
//         autoSize={true}
//         margin={[20, 20]}
//       >
//         {widgetArray.map((widget) => (
//           <div
//             // Widget container
//             key={widget.i}
//             className="reactGridItem"
//             data-grid={{
//               x: widget.x,
//               y: widget.y,
//               w: widget.w,
//               h: widget.h,
//               i: widget.i,
//             }}
//             // style={{ backgroundColor: widget.color }}
//           >
//             <button
//               // Prevent dragging when trying to delete widget
//               onMouseDown={stopPropagation}
//               onTouchStart={stopPropagation}
//               className="deleteButton no-drag"
//               onClick={() => {
//                 handleDeleteWidget(widget.widgetId.toString());
//               }}
//             >
//               x
//             </button>

//             <button
//               onMouseDown={stopPropagation}
//               onTouchStart={stopPropagation}
//               className="viewButton no-drag"
//               onClick={() => {
//                 handleView(widget);
//               }}
//             >
//               View
//             </button>
          
//             <button
//               onMouseDown={stopPropagation}
//               onTouchStart={stopPropagation}
//               className="editButton no-drag"
//               onClick={() => {
//                 handleEdit(widget);
//               }}
//             >
//               Edit
//             </button>

//             <div // Widget content
//             >
//             {widget.type}
//             </div>
//           </div>
//         ))}
//       </DashboardLayout>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import './Dashboard.css'
import AddWidgetModal from '../AddWidgetModal/AddWidgetModal';
import ViewWidgetModal from '../ViewWidgetModal/ViewWidgetModal';
import EditWidgetModal from '../EditWidgetModal/EditWidgetModal';
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
          // console.log(userData);
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

  const handleDeleteWidget = (key) => {
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

  return (
    <>
      <div className='headerSpace' id='tempHeader'></div>
    
    <div className='dashboardBody'>
      <button onClick={handleAdd}>Add Widget</button>
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
            key={widget.id}
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
            <button
              // Prevent dragging when trying to delete widget
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
              className="deleteButton no-drag"
              onClick={() => {
                handleDeleteWidget(widget.i);
              }}
            >
              x
            </button>

            <button
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
              className="viewButton no-drag"
              onClick={() => {
                handleView(widget);
              }}
            >
              View
            </button>
          
            <button
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
              className="editButton no-drag"
              onClick={() => {
                handleEdit(widget);
              }}
            >
              Edit
            </button>

            <div // Widget content
            >
            {widget.type}
            </div>
          </div>
        ))}
      </DashboardLayout>
    </div>
    </>
  );
};

export default Dashboard;