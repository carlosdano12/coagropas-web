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
import POS from "views/POS/POS";
import Compras from "views/Compras";
// core components/views for RTL layout
import Niame from "views/Niames/Niame";
import Insumo from "views/Insumos/Insumo";
import Asociado from "views/Asociados/Asociado";
import Cliente from "views/Clientes/Cliente";
import {
  AddShoppingCart,
  LocalShipping,
  RecentActors,
} from "@material-ui/icons";
import Role from "views/Roles/Role";
import SolicitudesCompras from "views/SolicitudesCompra/SolicitudCompra";
import SolicitudesTransporte from "views/SolicitudesTransporte/SolicitudTransporte";

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
    component: Asociado,
    layout: "/admin",
  },
  {
    path: "/roles",
    name: "Roles",
    icon: RecentActors,
    component: Role,
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
    component: Compras,
    layout: "/admin",
  },
  {
    path: "/solicitudes_compras",
    name: "Solicitudes de Compras",
    icon: AddShoppingCart,
    component: SolicitudesCompras,
    layout: "/admin",
  },
  {
    path: "/sotck",
    name: "Transportes",
    icon: LocalShipping,
    component: SolicitudesTransporte,
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
    component: Cliente,
    layout: "/admin",
  },
];

export default dashboardRoutes;
