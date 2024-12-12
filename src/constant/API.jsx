export const API = 'https://diy-dashboard-one.vercel.app/api/'

export const EMPLOYEE = {
    register :"auth/clients/register/",
    login : "auth/o/token/",

    Employee_Add : "auth/employees/create/",
    Employee_List : "auth/employees/list/",
    Employee_Edit : "auth/employees/edit/",
    Employee_Delete : "auth/employees/delete/<int:pk>/",
    Employee_Detail : "auth/employees/detail/",

    Role_Add : "auth/roles/create/",
    Role_List : "auth/roles/list/",
    Role_Edit : "auth/roles/edit/",
    Role_Delete : "auth/roles/delete/<int:pk>/",
    Role_Detail : "auth/roles/detail/",
}

export const INVENTORY = {
    Material_List: "inventory/raw-materials/list/",
    Material_Detail: "inventory/raw-materials/detail/",
    Material_Create: "inventory/raw-materials/create/",
    Material_Update: "inventory/raw-materials/update/",
    Material_Delete: "inventory/raw-materials/delete/<int:pk>/",

    Material_Line_List: "inventory/raw-materials-line/list/",
    Material_Line_Detail: "inventory/raw-materials-line/<int:pk>/",
    Material_Line_Create: "inventory/raw-materials-line/create/",
    Material_Line_Update: "inventory/raw-materials-line/update/<int:pk>/",
    Material_Line_Delete: "inventory/raw-materials-line/delete/<int:pk>/",

    Product_List: "inventory/finished-products/list/",
    Product_Detail: "inventory/finished-products/<int:pk>/",
    Product_Create: "inventory/finished-products/create/",
    Product_Update: "inventory/finished-products/update/<int:pk>/",
    Product_Delete: "inventory/finished-products/delete/<int:pk>/",
}

export const WAREHOUSES = {
    List:"warehouses/list/",
    Add:"warehouses/create/",
    Edit:"warehouses/edit/<int:pk>/",
    Delete:"warehouses/delete/<int:pk>/",
    Detail:"warehouses/detail/<int:pk>/",

    Zones_List:"warehouses/zones/list/",
    Zones_Add:"warehouses/zones/create/",
    Zones_Edit:"warehouses/zones/edit/<int:pk>/",
    Zones_Delete:"warehouses/zones/delete/<int:pk>/",
    Zones_Detail:"warehouses/detail/<int:pk>/",

    Aisle_List:"warehouses/aisles/list/",
    Aisle_Add:"warehouses/aisles/create/",
    Aisle_Edit:"warehouses/aisles/edit/<int:pk>/",
    Aisle_Delete:"warehouses/aisles/delete/<int:pk>/",
    Aisle_Detail:"warehouses/detail/<int:pk>/",

    Rack_List:"warehouses/racks/list/",
    Rack_Add:"warehouses/racks/create/",
    Rack_Edit:"warehouses/racks/edit/<int:pk>/",
    Rack_Delete:"warehouses/racks/delete/<int:pk>/",
    Rack_Detail:"warehouses/detail/<int:pk>/",

    Location_List:"warehouses/locations/list/",
    Location_Add:"warehouses/locations/create/",
    Location_Edit:"warehouses/locations/edit/<int:pk>/",
    Location_Delete:"warehouses/locations/delete/<int:pk>/",
    Location_Detail:"warehouses/locations/detail/<int:pk>/",
}

export const SALES = {
    Cart_List:"cart-lines/<int:user_id>/",
    Cart_Add:"cart-lines/add/",
    Cart_Edit:"cart-lines/update/<int:pk>/",
    Cart_Delete:"cart-lines/delete/<int:pk>/",

    Favorite_List:"favorite-lines/<int:user_id>/",
    Favorite_Add:"favorite-lines/add/",
    Favorite_Edit:"favorite-lines/update/<int:pk>/",
    Favorite_Delete:"favorite-lines/delete/<int:pk>/",
}

export const ORDERS = {
    Sales_List:"orders/sales-orders/list/",
    Sales_Add:"orders/sales-orders/create/",
    Sales_Edit:"orders/sales-orders/update/<int:pk>/",
    Sales_Delete:"orders/sales-orders/delete/<int:pk>/",

    Purchase_List:"orders/purchase-orders/list/",
    Purchase_Add:"orders/purchase-orders/create/",
    Purchase_Edit:"orders/purchase-orders/update/<int:pk>/",
    Purchase_Delete:"orders/purchase-orders/delete/<int:pk>/",
}

export const SUPPLIERS = {
    List:"suppliers/list/",
    Add:"suppliers/create/",
    Edit:"suppliers/edit/<int:pk>/",
    Delete:"suppliers/delete/<int:pk>/",

    Representative_List:"suppliers/representatives/list/",
    Representative_Add:"suppliers/representatives/create/",
    Representative_Edit:"suppliers/representatives/edit/<int:pk>/",
    Representative_Delete:"suppliers/representatives/delete/<int:pk>/",
}

export const PAYMENT = {
// nhuconcac
}