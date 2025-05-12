export const ADMIN_MENU = [
  {
    id: 1,
    name: "Manufacturer",
    path: "",
    iconPath: `M19 7h-3l2-2-2-2h3a2 2 0 012 2v2a2 2 0 01-2 2zM5 7h3l-2-2 2-2H5a2 2 0 00-2 2v2a2 2 0 002 2zm14 10h-3l2 2-2 2h3a2 2 0 002-2v-2a2 2 0 00-2-2zm-14 0h3l-2-2 2-2H5a2 2 0 00-2 2v2a2 2 0 002 2z`,
    subNav: [
      {
        id: 101,
        name: "Manufacturer List",
        path: "/admin/manufacturer/manufacturer-list",
        iconPath: `M12 4v16m8-8H4`
      },
      {
        id: 102,
        name: "Upload Certificate",
        path: "/admin/manufacturer/certificate-list",
        iconPath: `M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12`
      },
      {
        id: 10,
        name: "Upload Device",
        path: "/admin/manufacturer/stock-list",
        iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      }
    ]
  },
  {
    id: 8,
    name: "Order",
    path: "/admin/orders/order-details",
    iconPath: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
  },
  {
    id: 2,
    name: "Distributor",
    path: "/admin/distributer/distributer-list",
    iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
  },
  {
    id: 3,
    name: "Dealer",
    path: "/admin/dealer/dealer-list",
    iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  },
  {
    id: 4,
    name: "Devices",
    path: "/admin/device/device-list",
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
  },
  {
    id: 5,
    name: "Raw Data",
    path: "/admin/raw-data/list",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  },
  // {
  //   id: 6,
  //   name: "Sales",
  //   path: "/admin/sales-order/sales-order-list",
  //   iconPath: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
  // },
  {
    id: 7,
    name: "Masters",
    path: "",
    iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    subNav: [
      {
        id: 701,
        name: "Backend",
        path: "/admin/masters/backend-list",
        iconPath: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
      },
      {
        id: 702,
        name: "States",
        path: "/admin/masters/state-list",
        iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      },
      {
        id: 703,
        name: "RTO",
        path: "/admin/masters/rto-list",
        iconPath: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      },
      // {
      //   id: 704,
      //   name: "Product",
      //   path: "/admin/masters/product-list",
      //   iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      // },
      {
        id: 705,
        name: "Authority",
        path: "/admin/masters/authority-list",
        iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      },
      {
        id: 706,
        name: "Authority Plan",
        path: "/admin/masters/authority-plan-list",
        iconPath: "M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z M12 6v3 M12 9l-6 2 M12 9v2 M12 9l6 2 M6 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M12 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M18 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M6 15v2 M12 15v2 M18 15v2 M6 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M12 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
      },
      {
        id: 707,
        name: "City",
        path: "/admin/masters/city-list",
        iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      },
      {
        id: 708,
        name: "Product Type",
        path: "/admin/masters/category-list",
        iconPath: "M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"
      },
      {
        id: 709,
        name: "Product",
        path: "/admin/masters/sub-category-list",
        iconPath: "M4 6h2v2H4V6zm4 0h12v2H8V6zM4 11h2v2H4v-2zm4 0h8v2H8v-2zM4 16h2v2H4v-2zm4 0h6v2H8v-2z"
      },
      {
        id: 709,
        name: "HSN",
        path: "/admin/masters/hsn-list",
        iconPath: "M21 2H3v20l3-3 3 3 3-3 3 3 3-3 3 3V2zM19 16H5V4h14v12zM7 6h10v2H7V6zm0 4h10v2H7v-2z"
      },
      {
        id: 710,
        name: "Complain",
        path: "/admin/masters/complain-list",
        iconPath: "M12 2C6.48 2 2 6.03 2 11c0 2.08.79 3.99 2.11 5.5L2 22l5.63-2.36C9 20.25 10.47 20.5 12 20.5c5.52 0 10-4.03 10-9.5S17.52 2 12 2zm-1 5h2v5h-2V7zm0 6h2v2h-2v-2z"
      },
       {
        id: 711,
        name: "Service",
        path: "/admin/masters/service-list",
        iconPath: "M19.43 12.98c.04-.32.07-.66.07-1s-.03-.68-.07-1l2.11-1.65a.5.5 0 00.11-.64l-2-3.46a.5.5 0 00-.6-.22l-2.49 1a7.007 7.007 0 00-1.5-.87L14.5 2h-5l-.35 2.14c-.52.2-1.01.46-1.5.87l-2.49-1a.5.5 0 00-.6.22l-2 3.46a.5.5 0 00.11.64L4.57 10c-.04.32-.07.66-.07 1s.03.68.07 1l-2.11 1.65a.5.5 0 00-.11.64l2 3.46a.5.5 0 00.6.22l2.49-1c.49.41.98.67 1.5.87L9.5 22h5l.35-2.14c.52-.2 1.01-.46 1.5-.87l2.49 1a.5.5 0 00.6-.22l2-3.46a.5.5 0 00-.11-.64l-2.11-1.65zM12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z"
      }
     
    ]
  },
  {
    id: 8,
    name: "Kyc Pending",
    path: "/admin/kyc-pending/kyc-pending-list",
    iconPath: "M14 2H6a2 2 0 00-2 2v16c0 1.1.9 2 2 2h8a2 2 0 002-2V8l-4-6zm1 18H6V4h7v5h5v11zm-4.5-7a3.5 3.5 0 103.5 3.5A3.5 3.5 0 0010.5 13zm.5 2.5v-2h-1v3h2v-1z"
  },
  {
    id: 9,
    name: "Fitment",
    path: "/admin/fitment/fitment-list",
    iconPath: "M22 13v-2h-2.07a5.978 5.978 0 00-1.14-2.72l1.48-1.48-1.41-1.41-1.48 1.48A5.978 5.978 0 0013 4.07V2h-2v2.07a5.978 5.978 0 00-2.72 1.14L6.8 3.73 5.39 5.14l1.48 1.48A5.978 5.978 0 004.07 11H2v2h2.07a5.978 5.978 0 001.14 2.72l-1.48 1.48 1.41 1.41 1.48-1.48A5.978 5.978 0 0011 19.93V22h2v-2.07a5.978 5.978 0 002.72-1.14l1.48 1.48 1.41-1.41-1.48-1.48A5.978 5.978 0 0019.93 13H22zM12 17a5 5 0 115-5 5 5 0 01-5 5z"
  },
  {
    id: 6,
    name: "My Request",
    path: "/admin/request/request-list",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 002 2h2a2 2 0 002-2M15 11h2m-6 0h2m-6 0h2" 
  }
 
];

export const MANUFACUTE_MENU = [
  {
    id: 1,
    name: "Manufacturer",
    path: "",
    iconPath: `M19 7h-3l2-2-2-2h3a2 2 0 012 2v2a2 2 0 01-2 2zM5 7h3l-2-2 2-2H5a2 2 0 00-2 2v2a2 2 0 002 2zm14 10h-3l2 2-2 2h3a2 2 0 002-2v-2a2 2 0 00-2-2zm-14 0h3l-2-2 2-2H5a2 2 0 00-2 2v2a2 2 0 002 2z`,
    subNav: [
      {
        id: 101,
        name: "Manufacturer List",
        path: "/admin/manufacturer/manufacturer-list",
        iconPath: `M12 4v16m8-8H4`
      },
      {
        id: 102,
        name: "Upload Certificate",
        path: "/admin/manufacturer/certificate-list",
        iconPath: `M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12`
      },
      {
        id: 10,
        name: "Upload Device",
        path: "/admin/manufacturer/stock-list",
        iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      },

    ]
  },
  {
    id: 8,
    name: "Order",
    path: "/admin/orders/order-details",
    iconPath: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
  },
  {
    id: 8,
    name: "Vahan",
    path: "/admin/vahan/vahan-list",
    iconPath: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
  },
  {
    id: 1,
    name: "Distributor",
    path: "/admin/distributer/distributer-list",
    iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"

  },

  {
    id: 2,
    name: "Dealer",
    path: "/admin/dealer/dealer-list",
    iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ,
  },
  {
    id: 6,
    name: "Devices",
    path: "/admin/device/device-list",
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    ,
  },
  {
    id: 5,
    name: "Raw Data",
    path: "/admin/raw-data/list",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  },
//   {
//     id: 7,
//     name: "Sales",
//     path: "/admin/sales-order/sales-order-list",
//     iconPath: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
//     ,
//   },
//   {
//     id: 8,
//     name: "Sales Manager",
//     path: "/admin/sales-manager/manager-list",
//     iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
// ,
//   },
  {
    id: 7,
    name: "Masters",
    path: "",
    iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    subNav: [
      {
        id: 701,
        name: "Backend",
        path: "/admin/masters/backend-list",
        iconPath: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
      },
      {
        id: 702,
        name: "States",
        path: "/admin/masters/state-list",
        iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      },
      {
        id: 703,
        name: "RTO",
        path: "/admin/masters/rto-list",
        iconPath: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      },
      // {
      //   id: 704,
      //   name: "Product",
      //   path: "/admin/masters/product-list",
      //   iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      // },
      {
        id: 705,
        name: "Authority",
        path: "/admin/masters/authority-list",
        iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      },
      {
        id: 706,
        name: "Authority Plan",
        path: "/admin/masters/authority-plan-list",
        iconPath: "M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z M12 6v3 M12 9l-6 2 M12 9v2 M12 9l6 2 M6 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M12 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M18 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M6 15v2 M12 15v2 M18 15v2 M6 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M12 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
      },
      {
        id: 707,
        name: "City",
        path: "/admin/masters/city-list",
        iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      },
      {
        id: 708,
        name: "Product Type",
        path: "/admin/masters/category-list",
        iconPath: "M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"
      },
      {
        id: 709,
        name: "Product",
        path: "/admin/masters/sub-category-list",
        iconPath: "M4 6h2v2H4V6zm4 0h12v2H8V6zM4 11h2v2H4v-2zm4 0h8v2H8v-2zM4 16h2v2H4v-2zm4 0h6v2H8v-2z"
      },
      {
        id: 709,
        name: "HSN",
        path: "/admin/masters/hsn-list",
        iconPath: "M21 2H3v20l3-3 3 3 3-3 3 3 3-3 3 3V2zM19 16H5V4h14v12zM7 6h10v2H7V6zm0 4h10v2H7v-2z"
      },
      {
        id: 710,
        name: "Complain",
        path: "/admin/masters/complain-list",
        iconPath: "M12 2C6.48 2 2 6.03 2 11c0 2.08.79 3.99 2.11 5.5L2 22l5.63-2.36C9 20.25 10.47 20.5 12 20.5c5.52 0 10-4.03 10-9.5S17.52 2 12 2zm-1 5h2v5h-2V7zm0 6h2v2h-2v-2z"
      },
       {
        id: 711,
        name: "Service",
        path: "/admin/masters/service-list",
        iconPath: "M19.43 12.98c.04-.32.07-.66.07-1s-.03-.68-.07-1l2.11-1.65a.5.5 0 00.11-.64l-2-3.46a.5.5 0 00-.6-.22l-2.49 1a7.007 7.007 0 00-1.5-.87L14.5 2h-5l-.35 2.14c-.52.2-1.01.46-1.5.87l-2.49-1a.5.5 0 00-.6.22l-2 3.46a.5.5 0 00.11.64L4.57 10c-.04.32-.07.66-.07 1s.03.68.07 1l-2.11 1.65a.5.5 0 00-.11.64l2 3.46a.5.5 0 00.6.22l2.49-1c.49.41.98.67 1.5.87L9.5 22h5l.35-2.14c.52-.2 1.01-.46 1.5-.87l2.49 1a.5.5 0 00.6-.22l2-3.46a.5.5 0 00-.11-.64l-2.11-1.65zM12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z"
      }
      
     
    ]
  },
  {
    id: 9,
    name: "Fitment",
    path: "/admin/fitment/fitment-list",
    iconPath: "M22 13v-2h-2.07a5.978 5.978 0 00-1.14-2.72l1.48-1.48-1.41-1.41-1.48 1.48A5.978 5.978 0 0013 4.07V2h-2v2.07a5.978 5.978 0 00-2.72 1.14L6.8 3.73 5.39 5.14l1.48 1.48A5.978 5.978 0 004.07 11H2v2h2.07a5.978 5.978 0 001.14 2.72l-1.48 1.48 1.41 1.41 1.48-1.48A5.978 5.978 0 0011 19.93V22h2v-2.07a5.978 5.978 0 002.72-1.14l1.48 1.48 1.41-1.41-1.48-1.48A5.978 5.978 0 0019.93 13H22zM12 17a5 5 0 115-5 5 5 0 01-5 5z"
  },
  {
    id: 10,
    name: "Support",
    path: "/admin/support/support-list",
    iconPath: "M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
  },
  {
    id: 6,
    name: "My Request",
    path: "/admin/request/request-list",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 002 2h2a2 2 0 002-2M15 11h2m-6 0h2m-6 0h2" 
  },
  {
    id: 6,
    name: "My Complain",
    path: "/admin/complain/complain-list",
    iconPath: "M12 2C6.48 2 2 6.03 2 11c0 2.08.79 3.99 2.11 5.5L2 22l5.63-2.36C9 20.25 10.47 20.5 12 20.5c5.52 0 10-4.03 10-9.5S17.52 2 12 2zm-1 5h2v5h-2V7zm0 6h2v2h-2v-2z"
  }
];

export const DISTRIBUTER_MENU = [
  {
    id: 8,
    name: "Order",
    path: "/admin/orders/order-details",
    iconPath: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
  },
  {
    id: 1,
    name: "Distributor",
    path: "/admin/distributer/distributer-list",
    iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"

  },
  {
    id: 2,
    name: "Dealer",
    path: "/admin/dealer/dealer-list",
    iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ,
  },
//   {
//     id: 4,
//     name: "Sales",
//     path: "/admin/sales-order/sales-order-list",
//     iconPath: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
//     ,
//   },
//   {
//     id: 5,
//     name: "Sales Manager",
//     path: "/admin/sales-manager/manager-list",
//           iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
// ,
//   },
  {
    id: 6,
    name: "Shipping Address",
    path: "/admin/shipping-address/shipping-details",
    iconPath: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"  
  },
 
  {
    id: 7,
    name: "Inventory",
    path: "/admin/device/inventory-list",
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
  },
  {
    id: 8,
    name: "Fitment",
    path: "/admin/fitment/fitment-list",
    iconPath: "M22 13v-2h-2.07a5.978 5.978 0 00-1.14-2.72l1.48-1.48-1.41-1.41-1.48 1.48A5.978 5.978 0 0013 4.07V2h-2v2.07a5.978 5.978 0 00-2.72 1.14L6.8 3.73 5.39 5.14l1.48 1.48A5.978 5.978 0 004.07 11H2v2h2.07a5.978 5.978 0 001.14 2.72l-1.48 1.48 1.41 1.41 1.48-1.48A5.978 5.978 0 0011 19.93V22h2v-2.07a5.978 5.978 0 002.72-1.14l1.48 1.48 1.41-1.41-1.48-1.48A5.978 5.978 0 0019.93 13H22zM12 17a5 5 0 115-5 5 5 0 01-5 5z"
  },
  {
    id: 6,
    name: "My Request",
    path: "/admin/request/request-list",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 002 2h2a2 2 0 002-2M15 11h2m-6 0h2m-6 0h2" 
   },
   {
    id: 6,
    name: "My Complain",
    path: "/admin/complain/complain-list",
    iconPath: "M12 2C6.48 2 2 6.03 2 11c0 2.08.79 3.99 2.11 5.5L2 22l5.63-2.36C9 20.25 10.47 20.5 12 20.5c5.52 0 10-4.03 10-9.5S17.52 2 12 2zm-1 5h2v5h-2V7zm0 6h2v2h-2v-2z"
  }
];

export const DEALER_MENU = [

  {
    id: 1,
    name: "Dealer",
    path: "/admin/dealer/dealer-list",
    iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ,
  },
  {
    id: 2,
    name: "Order",
    path: "/admin/orders/order-details",
    iconPath: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
  },
  {
    id: 4,
    name: "Shipping Address",
    path: "/admin/shipping-address/shipping-details",
    iconPath: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"  
  },

  {
    id: 5,
    name: "Inventory",
    path: "/admin/device/inventory-list",
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
  },
  {
    id: 6,
    name: "Fitment",
    path: "/admin/fitment/fitment-list",
    iconPath: "M22 13v-2h-2.07a5.978 5.978 0 00-1.14-2.72l1.48-1.48-1.41-1.41-1.48 1.48A5.978 5.978 0 0013 4.07V2h-2v2.07a5.978 5.978 0 00-2.72 1.14L6.8 3.73 5.39 5.14l1.48 1.48A5.978 5.978 0 004.07 11H2v2h2.07a5.978 5.978 0 001.14 2.72l-1.48 1.48 1.41 1.41 1.48-1.48A5.978 5.978 0 0011 19.93V22h2v-2.07a5.978 5.978 0 002.72-1.14l1.48 1.48 1.41-1.41-1.48-1.48A5.978 5.978 0 0019.93 13H22zM12 17a5 5 0 115-5 5 5 0 01-5 5z"
  },
  {
    id: 6,
    name: "My Request",
    path: "/admin/request/request-list",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 002 2h2a2 2 0 002-2M15 11h2m-6 0h2m-6 0h2" 
  },
  {
    id: 6,
    name: "My Complain",
    path: "/admin/complain/complain-list",
    iconPath: "M12 2C6.48 2 2 6.03 2 11c0 2.08.79 3.99 2.11 5.5L2 22l5.63-2.36C9 20.25 10.47 20.5 12 20.5c5.52 0 10-4.03 10-9.5S17.52 2 12 2zm-1 5h2v5h-2V7zm0 6h2v2h-2v-2z"
  }

];