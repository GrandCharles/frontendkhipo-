import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { parseCookies } from "nookies";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

<<<<<<< HEAD
const drawerWidth = 210; // Largura do menu expandido

//=============================================================================
=======
>>>>>>> a606bc62f67457a15f6bdca64d2297445f953ae8
import { IconBaseProps } from "react-icons";
import Link from "next/link";
import styles from "./styles.module.scss";
import * as Icon from "@material-ui/icons";
import Image from "next/image";
import { RiShutDownLine } from "react-icons/ri";
import logo from "../../../public/khipo.png";
import { dataHoraZone } from "../../utils/util";

const drawerWidth = 210; // Largura do menu expandido

interface IListItemLinkProps {
  label: string;
  icon: IconBaseProps;
  route: string;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({ label, icon, route }) => {
  const theme = useTheme();

  return (
    <ListItemButton>
      <ListItemIcon>
        <Box
          sx={{ width: theme.spacing(6) }} // distancia do icone com o titulo
          display="flex"
          alignItems="center"
        >
          {icon}
        </Box>

        <Box
          width={theme.spacing(21)}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Link href={route} passHref>
            <b>{label}</b>
          </Link>
        </Box>
      </ListItemIcon>
    </ListItemButton>
  );
};


type TitleBarProps = {
  user?: string;
  titulo?: string;
};
function TitleBar({ user, titulo }: TitleBarProps) {
  const now = dataHoraZone();

  return (
    <>
      <div className={styles.titleBar}>
        <div className={styles.imagem}>
          <Image alt="" src={logo} width={80} height={60} />
        </div>

        <div className={styles.titulo}>
          <h1>OnEntré</h1>
        </div>

        <div className={styles.userIn}>
          <h1>Olá, {user}</h1>
          <h1>{now}</h1>
        </div>

        <div className={styles.botao}>
          <Link href="/" passHref>
            <button type="button" title="Sair do Sistema">
              <RiShutDownLine size={25} />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(0)})`, // Largura da coluna do menu recolhido
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1), // Altura da area da seta de recolhimento, distancia a direita da seta de recolhimento
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MenuDrawer({ titulo }: TitleBarProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { nomeUser: nmUser } = parseCookies();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit" // listas do menu
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            <TitleBar user={nmUser} />
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List component="nav">
          <ListItemLink
            icon={<Icon.Stars color="primary" />}
            label="Tipos de Eventos"
            route="/tipoEvento"
          />
          <ListItemLink
            icon={<Icon.Category color="primary" />}
            label="Tipos de Locais"
            route="/tipoLocal"
          />
          <ListItemLink
            icon={<Icon.Home color="primary" />}
            label="Locais"
            route="/local"
          />
          <ListItemLink
            icon={<Icon.EventSeat color="primary" />}
            label="Eventos"
            route="/Evento"
          />

          <Divider />

          <ListItemLink
            icon={<Icon.PersonAddDisabled color="secondary" />}
            label="Sair"
            route="/"
          />
        </List>

        <Divider />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 5 }}></Box>
    </Box>
  );
}
