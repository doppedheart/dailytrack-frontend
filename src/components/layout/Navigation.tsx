import {
  Wallet,
  PlusCircle,
  ShoppingBag,
  Moon,
  Sun,
  Activity,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../contexts/store";
import { disconnectWallet, saveAddress } from "../../contexts/contractSlice";
import { useLocation, useNavigate } from "react-router-dom";

export function Navigation() {
  const { isDark, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const { address, isConnected } = useSelector(
    (state: RootState) => state.contract
  );
  const connect = async () => {
    if (isConnected) {
      dispatch(disconnectWallet());
      return;
    }
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string[];
        if (accounts.length > 0) {
          dispatch(saveAddress(accounts[0]));
        }
      } else {
        alert("please install MetaMask or another ethereum wallet");
      }
    } catch (error) {
      console.error("wallet connection error:", error);
      alert("Failed to connect walled. please try again.");
    }
  };

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-white dark:bg-dark-800 shadow-sm transition-colors duration-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button
              onClick={() =>
                isConnected ? navigate("/") : navigate("/dashboard")
              }
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white"
            >
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>DailyTrack</span>
            </button>
            {address && (
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate("/marketplace")}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    currentPath === "/marketplace"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Marketplace
                </button>
                <button
                  onClick={() => navigate("/create")}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    currentPath === "/create"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create NFT
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isConnected
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={connect}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnected ? formatAddress(address) : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
