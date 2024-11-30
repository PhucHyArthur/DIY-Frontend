// context/DataContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Khởi tạo context
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [aisles, setAisles] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [racks, setRacks] = useState([]);
  const [roles, setRoles] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    // Hàm nạp dữ liệu từ các file JSON
    const fetchData = async () => {
      try {
        const aislesData = await import('../data/aisles.json');
        const materialsData = await import('../data/materials.json');
        const productsData = await import('../data/products.json');
        const purchaseOrdersData = await import('../data/purchaseorders.json');
        const racksData = await import('../data/racks.json');
        const rolesData = await import('../data/roles.json');
        const salesOrdersData = await import('../data/salesorders.json');
        const suppliersData = await import('../data/suppliers.json');
        const warehousesData = await import('../data/warehouses.json');
        const zonesData = await import('../data/zones.json');

        setAisles(aislesData.default || []);
        setMaterials(materialsData.default || []);
        setProducts(productsData.default || []);
        setPurchaseOrders(purchaseOrdersData.default || []);
        setRacks(racksData.default || []);
        setRoles(rolesData.default || []);
        setSalesOrders(salesOrdersData.default || []);
        setSuppliers(suppliersData.default || []);
        setWarehouses(warehousesData.default || []);
        setZones(zonesData.default || []);
      } catch (error) {
        console.error('Lỗi khi nạp dữ liệu từ JSON:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        aisles,
        setAisles,
        materials,
        setMaterials,
        products,
        setProducts,
        purchaseOrders,
        setPurchaseOrders,
        racks,
        setRacks,
        roles,
        setRoles,
        salesOrders,
        setSalesOrders,
        suppliers,
        setSuppliers,
        warehouses,
        setWarehouses,
        zones,
        setZones,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
