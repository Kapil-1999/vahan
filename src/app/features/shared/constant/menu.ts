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
    path: "user/geofacne/list-geofence",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  },
  {
    id: 6,
    name: "Sales",
    path: "/admin/sales-order/sales-order-list",
    iconPath: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
  },
  {
    id: 7,
    name: "Masters",
    path: "",
    iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    subNav: [
      {
        id: 701,
        name: "Backend",
        path: "/admin/backend/backend-list",
        iconPath: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
      },
      {
        id: 702,
        name: "States",
        path: "/admin/state/state-list",
        iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      },
      {
        id: 703,
        name: "RTO",
        path: "/admin/rto/rto-page",
        iconPath: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      },
      {
        id: 704,
        name: "Product",
        path: "/admin/product/product-page",
        iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      },
      {
        id: 705,
        name: "Authority",
        path: "/admin/authority/authority-page",
        iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      },
      {
        id: 706,
        name: "City",
        path: "/admin/city/city-list",
        iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      }
    ]
  },
  
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
    id: 6,
    name: "Raw Data",
    path: "user/geofacne/list-geofence",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    ,
  },
  {
    id: 7,
    name: "Sales",
    path: "/admin/sales-order/sales-order-list",
    iconPath: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
    ,
  },
  {
    id: 8,
    name: "Sales Manager",
    path: "/admin/sales-manager/manager-list",
    iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
,
  },
  {
    id: 7,
    name: "Masters",
    path: "",
    iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    subNav: [
      {
        id: 701,
        name: "Backend",
        path: "/admin/backend/backend-list",
        iconPath: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
      },
      {
        id: 702,
        name: "States",
        path: "/admin/state/state-list",
        iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      },
      {
        id: 703,
        name: "RTO",
        path: "/admin/rto/rto-page",
        iconPath: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      },
      {
        id: 704,
        name: "Product",
        path: "/admin/product/product-page",
        iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      },
      {
        id: 705,
        name: "Authority",
        path: "/admin/authority/authority-page",
        iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      },
      {
        id: 706,
        name: "City",
        path: "/admin/city/city-list",
        iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      }
    ]
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
  {
    id: 3,
    name: "Raw Data",
    path: "user/geofacne/list-geofence",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    ,
  },
  {
    id: 4,
    name: "Sales",
    path: "/admin/sales-order/sales-order-list",
    iconPath: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
    ,
  },
  {
    id: 5,
    name: "Sales Manager",
    path: "/admin/sales-manager/manager-list",
          iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
,
  },
  {
    id: 6,
    name: "Shipping Address",
    path: "/admin/shipping-address/shipping-details",
    iconPath: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"  },
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
    id: 8,
    name: "Order",
    path: "/admin/orders/order-details",
    iconPath: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
  },
  {
    id: 2,
    name: "Raw Data",
    path: "user/geofacne/list-geofence",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    ,
  },
  {
    id: 6,
    name: "Shipping Address",
    path: "/admin/shipping-address/shipping-details",
    iconPath: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"  },
];