import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "../context/Auth";
import CreateQrCode from "./CreateQrCode";
import AdminTables from "./AdminTables";
import { useNavigate } from "react-router-dom";
import AdminMenuModal from "./AdminMenuModal";

const socket = io(import.meta.env.VITE_SERVER_BASE_URL, {
  transports: ["websocket"],
});

function AdminMenu() {
  const { admin, loading } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const [tab, setTab] = useState("active");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (item, value) => {
    const hideMeal = {
      restaurantId: admin.restaurantId,
      mealId: item._id,
      hide: value,
      operation: "hide",
    };
    console.log(hideMeal);
    socket.emit("connectToMenu", hideMeal);
  };

  const OrderMealHandler = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    socket.emit("connectToMenu", { restaurantId: admin.restaurantId });
    socket.on(`getMenuAdmin-${admin.restaurantId}`, (receivedMenu) => {
      setMenuItems(receivedMenu);
    });
  }, []);

  return (
    <div className="bg-yellow-200 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Admin Menu</h1>
      <div className="flex border-b">
        <button
          className={`py-2 px-4 bg-white border-l border-t border-r rounded-t ${
            tab === "active"
              ? "text-black-500 border-yellow-600 bg-orange-200"
              : "text-gray-500"
          }`}
          onClick={() => setTab("active")}
        >
          Active Meals
        </button>
        <button
          className={`py-2 px-4 bg-white border-l border-t border-r rounded-t ${
            tab === "hidden"
              ? "text-black-500 border-yellow-600 bg-orange-200"
              : "text-gray-500"
          }`}
          onClick={() => setTab("hidden")}
        >
          Hidden Meals
        </button>
      </div>

      {tab === "active" &&
        menuItems.menu
          ?.filter((item) => !item.hide)
          ?.map((item, index) => (
            <div
              key={index}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {item.category}
                  </div>
                  <a
                    href="#"
                    className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                  >
                    {item.title}
                  </a>
                  <p className="mt-2 text-gray-500">{item.description}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-center p-1">
                      <button
                        onClick={() => handleEdit(item, !item.hide)}
                        className={`cursor-pointer px-4 py-2 rounded transition-colors duration-200 ease-in-out ${
                          item.hide
                            ? "bg-green-500 hover:bg-green-700 text-white"
                            : "bg-red-400 hover:bg-gray-400 text-black-700"
                        }`}
                      >
                        {item.hide
                          ? "Meal Hidden from Menu"
                          : "Hide Meal from Menu"}
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => openModal(item)}
                        className="bg-orange-200 hover:bg-red-400 text-black font-bold py-2 px-4 rounded justify-center p-1"
                      >
                        Meal Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

      <AdminMenuModal
        item={selectedItem}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />

      {tab === "hidden" &&
        menuItems.menu
          .filter((item) => item.hide)
          .map((item, index) => (
            <div
              key={index}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {item.category}
                  </div>
                  <a
                    href="#"
                    className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                  >
                    {item.title}
                  </a>
                  <p className="mt-2 text-gray-500">{item.description}</p>
                  <div className="mt-4">
                    <button
                      onClick={() => handleEdit(item, !item.hide)}
                      className={`mr-2 leading-tight font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out ${
                        item.hide
                          ? "bg-green-500 hover:bg-green-700 text-white"
                          : "bg-gray-200 hover:bg-gray-400 text-gray-700"
                      }`}
                    >
                      {item.hide ? "Put back on menu" : "Hide"}
                    </button>
                    <div className="flex justify-center">
                      <button
                        onClick={() => openModal(item)}
                        className="bg-orange-200 hover:bg-red-400 text-black font-bold py-2 px-4 rounded justify-center p-1"
                      >
                        Meal Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default AdminMenu;
