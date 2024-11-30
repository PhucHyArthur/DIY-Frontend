export const API = 'https://diy-dashboard-one.vercel.app/api/'

export const EMPLOYEE = {
    register :"auth/employees/register/",
    login : "auth/o/token/",

    Employee_Add : "auth/employees/register/",
    Employee_List : "auth/employees/list/",
    Employee_Edit : "auth/employees/<int:pk>/",
    Employee_Delete : "auth/employees/delete/<int:pk>/",

    Role_Add : "auth/roles/register/",
    Role_List : "auth/roles/",
    Role_Edit : "auth/roles/<int:pk>/",
    Role_Delete : "auth/roles/delete/<int:pk>/",
}

export const INVENTORY = {
    Material_List: "inventory/raw-materials/",
    Material_Detail: "inventory/raw-materials/<int:pk>/",
    Material_Create: "inventory/raw-materials/create/",
    Material_Update: "inventory/raw-materials/update/<int:pk>/",
    Material_Delete: "inventory/raw-materials/delete/<int:pk>/",

    Product_List: "inventory/finished-products/",
    Product_Detail: "inventory/finished-products/<int:pk>/",
    Product_Create: "inventory/finished-products/create/",
    Product_Update: "inventory/finished-products/update/<int:pk>/",
    Product_Delete: "inventory/finished-products/delete/<int:pk>/",
}

export const WAREHOUSES = {
    List:"warehouses/",
    Add:"warehouses/add/",
    Edit:"warehouses/edit/<int:pk>/",
    Delete:"warehouses/delete/<int:pk>/",

    Zones_List:"warehouses/zones/",
    Zones_Add:"warehouses/zones/add/",
    Zones_Edit:"warehouses/zones/edit/<int:pk>/",
    Zones_Delete:"warehouses/zones/delete/<int:pk>/",

    Aisle_List:"warehouses/aisles/",
    Aisle_Add:"warehouses/aisles/add/",
    Aisle_Edit:"warehouses/aisles/edit/<int:pk>/",
    Aisle_Delete:"warehouses/aisles/delete/<int:pk>/",

    Rack_List:"warehouses/racks/",
    Rack_Add:"warehouses/racks/add/",
    Rack_Edit:"warehouses/racks/edit/<int:pk>/",
    Rack_Delete:"warehouses/racks/delete/<int:pk>/",
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
    Sales_List:"sales-orders/",
    Sales_Add:"sales-orders/create/",
    Sales_Edit:"sales-orders/update/<int:pk>/",
    Sales_Delete:"sales-orders/delete/<int:pk>/",

    Purchase_List:"purchase-orders/",
    Purchase_Add:"purchase-orders/create/",
    Purchase_Edit:"purchase-orders/update/<int:pk>/",
    Purchase_Delete:"purchase-orders/delete/<int:pk>/",
}

export const SUPPLIERS = {
    List:"suppliers/",
    Add:"suppliers/create/",
    Edit:"suppliers/edit/<int:pk>/",
    Delete:"suppliers/delete/<int:pk>/",
}

export const PAYMENT = {
// nhuconcac
}