import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Login from "./pages/auth/login";
import ClientsList from "./pages/admin/customers/clients/list";
import ClientsAdd from "./pages/admin/customers/clients/add";
import ClientsDetail from "./pages/admin/customers/clients/detail";
import SuppliersList from "./pages/admin/customers/suppliers/list";
import SuppliersAdd from "./pages/admin/customers/suppliers/add";
import SuppliersDetail from "./pages/admin/customers/suppliers/detail";
import MaterialsList from "./pages/admin/inventory/materials/list";
import MaterialsAdd from "./pages/admin/inventory/materials/add";
import MaterialsDetail from "./pages/admin/inventory/materials/detail";
import ProductsList from "./pages/admin/inventory/products/list";
import ProductsAdd from "./pages/admin/inventory/products/add";
import ProductsDetail from "./pages/admin/inventory/products/detail";
import PurchaseList from "./pages/admin/purchase/list";
import PurchaseAdd from "./pages/admin/purchase/add";
import PurchaseDetail from "./pages/admin/purchase/detail";
import PurchaseEdit from "./pages/admin/purchase/edit";
import SalesList from "./pages/admin/sales/list";
import SalesAdd from "./pages/admin/sales/add";
import SalesDetail from "./pages/admin/sales/detail";
import SalesEdit from "./pages/admin/sales/edit";
import WarehousesList from "./pages/admin/warehouses/list";
import WarehousesAdd from "./pages/admin/warehouses/add";
import WarehousesDetail from "./pages/admin/warehouses/detail";
import WarehousesEdit from "./pages/admin/warehouses/edit";
import RolesList from "./pages/admin/dcen/roles/list";
import RolesEdit from "./pages/admin/dcen/roles/edit";
import RolesAdd from "./pages/admin/dcen/roles/add";
import UsersList from "./pages/admin/dcen/users/list";
import UsersAdd from "./pages/admin/dcen/users/add";
import UsersEdit from "./pages/admin/dcen/users/edit";
import RemoveRecent from "./pages/admin/remove";
import AdminPanel from "./pages/admin/AdminPanel";
import SettingPanel from "./pages/admin/SettingPanel";
import BillsList from "./pages/admin/bills/list";
import BillsAdd from "./pages/admin/bills/add";
import BillsEdit from "./pages/admin/bills/edit";
import BillsDetail from "./pages/admin/bills/detail";
import UserProfile from "./pages/admin/profile";
import MaterialsEdit from "./pages/admin/inventory/materials/edit";
import SuppliersEdit from "./pages/admin/customers/suppliers/edit";
import ClientsEdit from "./pages/admin/customers/clients/edit";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { useContext } from "react";
import Dashboard from "./pages/admin/dashboard"; 
import ProductsEdit from "./pages/admin/inventory/products/edit";
import RolesDetail from "./pages/admin/dcen/roles/detail";
import UsersDetail from "./pages/admin/dcen/users/detail";
import ActivateAccount from "./pages/admin/dcen/users/activate";

import { TokenContext } from "./context/TokenContext";

function App() {
  const { token } = useContext(TokenContext);
  
  return (
    <Router>
      <Routes>
        {/* Route cho trang login */}
        <Route path="/" element={token ? <Navigate to="/admin/dashboard" /> : <Login />} />

        {/* Các route cho admin settings */}
        <Route path="/admin/settings" element={
          <PrivateRoute>
            <SettingPanel />
          </PrivateRoute>
        }>
          <Route path="users">
            <Route index element={<ErrorPage />} />
            <Route path="list" element={<UsersList />} />
            <Route path="add" element={<UsersAdd />} />
            <Route path="edit/:id" element={<UsersEdit />} />
            <Route path="detail/:id" element={<UsersDetail/>} />
          </Route>
          <Route path="roles">
            <Route index element={<ErrorPage />} />
            <Route path="list" element={<RolesList />} />
            <Route path="add" element={<RolesAdd />} />
            <Route path="edit/:id" element={<RolesEdit />} />
            <Route path="detail/:id" element={<RolesDetail/>} />
          </Route>
        </Route>
        <Route path="/activate-account/:uid/:token" element={<ActivateAccount />} />
        {/* Các route cho admin panel */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        }>
          {/* Route cho Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Các route cho warehouses */}
          <Route path="warehouses">
            <Route index element={<ErrorPage />} />
            <Route path="list" element={<WarehousesList />} />
            <Route path="add" element={<WarehousesAdd />} />
            <Route path="edit/:warehouseId" element={<WarehousesEdit />} />
            <Route path="detail/:warehouseId" element={<WarehousesDetail />} />
          </Route>

          {/* Các route cho customers */}
          <Route path="customers">
            <Route path="clients">
              <Route index element={<ErrorPage />} />
              <Route path="list" element={<ClientsList />} />
              <Route path="add" element={<ClientsAdd />} />
              <Route path="edit/:clientId" element={<ClientsEdit />} />
              <Route path="detail/:clientId" element={<ClientsDetail />} />
            </Route>
            <Route path="suppliers">
              <Route index element={<ErrorPage />} />
              <Route path="list" element={<SuppliersList />} />
              <Route path="add" element={<SuppliersAdd />} />
              <Route path="edit/:supplierId" element={<SuppliersEdit />} />
              <Route path="detail/:supplierId" element={<SuppliersDetail />} />
            </Route>
          </Route>

          {/* Các route cho inventory */}
          <Route path="inventory">
            <Route path="materials">
              <Route index element={<ErrorPage />} />
              <Route path="list" element={<MaterialsList />} />
              <Route path="add" element={<MaterialsAdd />} />
              <Route path="detail/:materialId" element={<MaterialsDetail />} />
              <Route path="edit/:materialId" element={<MaterialsEdit />} />
            </Route>
            <Route path="products">
              <Route index element={<ErrorPage />} />
              <Route path="list" element={<ProductsList />} />
              <Route path="add" element={<ProductsAdd />} />
              <Route path="detail/:productId" element={<ProductsDetail />} />
              <Route path="edit/:productId" element={<ProductsEdit />} />
            </Route>
          </Route>

          {/* Các route cho order */}
          <Route path="order">
            <Route path="purchase">
              <Route index element={<ErrorPage />} />
              <Route path="list" element={<PurchaseList />} />
              <Route path="add" element={<PurchaseAdd />} />
              <Route path="edit/:purchaseId" element={<PurchaseEdit />} />
              <Route path="detail/:purchaseId" element={<PurchaseDetail />} />
            </Route>
            <Route path="sales">
              <Route index element={<ErrorPage />} />
              <Route path="list" element={<SalesList />} />
              <Route path="add" element={<SalesAdd />} />
              <Route path="edit/:purchaseId" element={<SalesEdit />} />
              <Route path="detail/:purchaseId" element={<SalesDetail />} />
            </Route>
          </Route>

          {/* Các route cho bills */}
          <Route path="bills">
            <Route index element={<ErrorPage />} />
            <Route path="list" element={<BillsList />} />
            <Route path="add" element={<BillsAdd />} />
            <Route path="edit/:billId" element={<BillsEdit />} />
            <Route path="detail/:billId" element={<BillsDetail />} />
          </Route>

          {/* Các route cho profile và remove */}
          <Route path="profile" element={<UserProfile />} />
          <Route path="remove" element={<RemoveRecent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
