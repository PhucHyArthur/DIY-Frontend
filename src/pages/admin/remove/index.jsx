import { useEffect, useState } from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { LuArrowDown } from "react-icons/lu";
import CustomModal from "../../../components/Modal/default";
import CustomToast from "../../../components/Toast";

const RemoveRecent = () => {
  const [products, setProducts] = useState([
    { _id: "1", name: "Burger", category: "Fast Food", price: "$10", image: "https://via.placeholder.com/150", restaurantId: "1", dateRemoved: "2024-10-01" },
    { _id: "2", name: "Pizza", category: "Italian", price: "$12", image: "https://via.placeholder.com/150", restaurantId: "2", dateRemoved: "2024-10-03" },
    { _id: "3", name: "Sushi", category: "Japanese", price: "$15", image: "https://via.placeholder.com/150", restaurantId: "3", dateRemoved: "2024-10-05" }
  ]);
  
  const [viewProducts, setViewProducts] = useState(products);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [restaurants, setRestaurants] = useState([
    { _id: "1", name: "Restaurant A" },
    { _id: "2", name: "Restaurant B" },
    { _id: "3", name: "Restaurant C" }
  ]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const showToast = CustomToast();

  useEffect(() => {
    if (selectedRestaurant) {
      setViewProducts(products.filter(product => product.restaurantId === selectedRestaurant));
    } else {
      setViewProducts(products);
    }
  }, [selectedRestaurant, products]);

  const handleSort = (column) => {
    const direction = sortedColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortedColumn(column);
    setSortDirection(direction);

    const sortedData = [...viewProducts].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setViewProducts(sortedData);
  };

  const openModal = (productId, action) => {
    setModalContent({
      productId,
      action,
      title: action === "delete" ? "Confirm Deletion" : "Confirm Restoration",
      bodyContent: action === "delete" 
        ? "This product will be permanently deleted. Are you sure to delete this product?" 
        : "This product will be restored and returned to your restaurant. Are you sure to restore this product?"
    });
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    const { productId, action } = modalContent;
    if (action === "delete") {
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      setViewProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      showToast("success", "Product deleted successfully", "");
    } else if (action === "restore") {
      showToast("success", "Product restored successfully", "");
    }
    setIsModalOpen(false);
  };

  return (
    <div className='p-6'>
      <div className="grid grid-cols-1">
        <div className="border rounded-lg border-default-200">
          <div className="px-6 py-4">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
              <h2 className="text-xl text-default-800 font-semibold">Item Delete List</h2>
              <label className="input input-bordered w-[500px] flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                </svg>
              </label>
              <Menu>
                <MenuButton as={Button} rightIcon={<LuArrowDown />}>
                  Actions
                </MenuButton>
                <MenuList>
                  {restaurants.map(restaurant => (
                    <MenuItem key={restaurant._id} onClick={() => setSelectedRestaurant(restaurant._id)}>
                      {restaurant.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="min-w-full divide-y divide-default-200">
              <thead className="bg-default-100">
                <tr className="text-start">
                  <th className="px-6 py-3 text-start text-sm font-medium cursor-pointer" onClick={() => handleSort("name")}>Name Product</th>
                  <th className="px-6 py-3 text-start text-sm font-medium cursor-pointer" onClick={() => handleSort("category")}>Category</th>
                  <th className="px-6 py-3 text-start text-sm font-medium cursor-pointer" onClick={() => handleSort("price")}>Price</th>
                  <th className="px-6 py-3 text-start text-sm font-medium cursor-pointer" onClick={() => handleSort("dateRemoved")}>Date Removed</th>
                  <th className="px-6 py-3 text-start text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default-200">
                {viewProducts.map(product => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="h-12 w-12" />
                        <p className="text-base transition-all hover:text-primary">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium">{product.price}</td>
                    <td className="px-6 py-4 text-sm font-medium">{product.dateRemoved}</td>
                    <td className="flex gap-5 px-6 py-4">
                      <Button colorScheme="red" onClick={() => openModal(product._id, "delete")}>Delete</Button>
                      <Button colorScheme="green" onClick={() => openModal(product._id, "restore")}>Restore</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent?.title}
        bodyContent={modalContent.bodyContent}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default RemoveRecent;
