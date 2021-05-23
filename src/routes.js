import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AssessmentIcon from "@material-ui/icons/Assessment";
import StoreIcon from "@material-ui/icons/Store";
import LayersIcon from "@material-ui/icons/Layers";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import GroupIcon from "@material-ui/icons/Group";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import POS from "views/POS";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import Niame from "views/Niames/Niame";
import Insumo from "views/Insumos/Insumo";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Reportes",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Asociados",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/pos",
    name: "POS",
    icon: StoreIcon,
    component: POS,
    layout: "/admin",
  },
  {
    path: "/tiposname",
    name: "Tipos de ñame",
    icon: LayersIcon,
    component: Niame,
    layout: "/admin",
  },
  {
    path: "/compras",
    name: "Compras",
    icon: ShoppingCartIcon,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/sotck",
    name: "Stock",
    icon: AssessmentIcon,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/insumos",
    name: "Insumos",
    icon: ShoppingBasketIcon,
    component: Insumo,
    layout: "/admin",
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: GroupIcon,
    component: RTLPage,
    layout: "/rtl",
  },
];

export default dashboardRoutes;
