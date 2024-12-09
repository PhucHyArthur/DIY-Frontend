import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API, WAREHOUSES, INVENTORY, SALES, SUPPLIERS, ORDERS, EMPLOYEE } from '../constant/API';
import { TokenContext } from './TokenContext';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [token] = useState(localStorage.getItem('authToken'));

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
  const [loactions, setLocations] = useState([]);

  const getAisles = async () => {
    try {
      const response = await axios.get(`${API}${WAREHOUSES.Aisle_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Aisles Data:', response.data);
      setAisles(response.data);
    } catch (error) {
      console.error("Error fetching aisles data: ", error);
    }
  };

  const getMaterials = async () => {
    try {
      const response = await axios.get(`${API}${INVENTORY.Material_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Materials Data:', response.data);
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials data: ", error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API}${INVENTORY.Product_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Products Data:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products data: ", error);
    }
  };

  const getPurchaseOrders = async () => {
    try {
      const response = await axios.get(`${API}${ORDERS.Purchase_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Purchase Orders Data:', response.data);
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders data: ", error);
    }
  };

  const getRacks = async () => {
    try {
      const response = await axios.get(`${API}${WAREHOUSES.Rack_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Racks Data:', response.data);
      setRacks(response.data);
    } catch (error) {
      console.error("Error fetching racks data: ", error);
    }
  };

  const getRoles = async () => {
    try {
      const response = await axios.get(`${API}${EMPLOYEE.Role_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Roles Data:', response.data);
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles data: ", error);
    }
  };

  const getSalesOrders = async () => {
    try {
      const response = await axios.get(`${API}${ORDERS.Sales_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Sales Orders Data:', response.data);
      setSalesOrders(response.data);
    } catch (error) {
      console.error("Error fetching sales orders data: ", error);
    }
  };

  const getSuppliers = async () => {
    try {
      const response = await axios.get(`${API}${SUPPLIERS.List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Suppliers Data:', response.data);
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers data: ", error);
    }
  };

  const getWarehouses = async () => {
    try {
      const response = await axios.get(`${API}${WAREHOUSES.List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Warehouses Data:', response.data);
      setWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching warehouses data: ", error);
    }
  };

  const getZones = async () => {
    try {
      const response = await axios.get(`${API}${WAREHOUSES.Zones_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Zones Data:', response.data);
      setZones(response.data);
    } catch (error) {
      console.error("Error fetching zones data: ", error);
    }
  };

  const getLocations = async () => {
    try {
      const response = await axios.get(`${API}${WAREHOUSES.Zones_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Zones Data:', response.data);
      setZones(response.data);
    } catch (error) {
      console.error("Error fetching zones data: ", error);
    }
  };

  useEffect(() => {
    getAisles();
    getMaterials();
    getProducts();
    getPurchaseOrders();
    getRacks();
    getRoles();
    getSalesOrders();
    getSuppliers();
    getWarehouses();
    getZones();
  }, []); // Runs once when the component mounts

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
export { DataContext };
