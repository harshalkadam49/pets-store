import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Stack, alpha } from "@mui/material";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BrandLogo from "../../public/avatars/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const drawerWidth = 280;

const navConfig = [
  {
    title: "Home",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    title: "History",
    path: "/history",
    icon: <HistoryToggleOffIcon />,
  },
  {
    title: "cart",
    path: "/cart",
    icon: <ShoppingCartIcon />,
  },
];

export const account = {
  displayName: "Jhon Doe",
  email: "jhonDoe@abc.com",
  photoURL: "avatars/avatar.jpg",
};

function DashboardLayout(props) {
  const router = useRouter();
  const pathname = usePathname();
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onRedirect = (URL) => {
    console.log(URL);
    let redirectUrl = process.env.NEXT_PUBLIC_BASE_URL + URL;
    router.push(redirectUrl);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        component="div"
        sx={{
          width: 50,
          height: 50,
          display: "inline-flex",
          mt: "0.5rem",
        }}
      >
        <Image src={BrandLogo} height={50} width={50} />
      </Box>

      <Box
        sx={{
          my: 3,
          mx: 2.5,
          py: 2,
          px: 2.5,
          display: "flex",
          borderRadius: 1.5,
          alignItems: "center",
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />

        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2">{account.displayName}</Typography>
        </Box>
      </Box>

      <List>
        {navConfig.map((item, index) => (
          <Stack key={index} component="nav" spacing={0.5} sx={{ px: 2 }}>
            <ListItemButton
              onClick={() => onRedirect(item.path)}
              sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: "body2",
                color: "text.secondary",
                textTransform: "capitalize",
                fontWeight: "fontWeightMedium",
                ...(item.path === pathname && {
                  color: "primary.main",
                  fontWeight: "fontWeightSemiBold",
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                  },
                }),
              }}
            >
              <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
                {item.icon}
              </Box>

              <Box component="span">{item.title} </Box>
            </ListItemButton>
          </Stack>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="glass"
        component="nav"
        sx={{
          background: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Toolbar>
          <IconButton
            color="#323232"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Image src={BrandLogo} height={50} width={50} />
          </Box>
          <Typography
            ml={1}
            variant="h5"
            component="div"
            color="#323232"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Pets Store
          </Typography>
          <Stack sx={{ display: { xs: "none", sm: "block" } }}>
            {navConfig.map((item, index) => (
              <Button
                key={index}
                onClick={() => onRedirect(item.path)}
                startIcon={item.icon}
                size="large"
                sx={{
                  px: "1.5rem",
                  mx: "0.5rem",
                  minHeight: 44,
                  borderRadius: 0.75,
                  typography: "body1",
                  color: "text.secondary",
                  textTransform: "capitalize",
                  fontWeight: "fontWeightMedium",
                  ...(item.path === pathname && {
                    color: "primary.main",
                    fontWeight: "fontWeightSemiBold",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    "&:hover": {
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.16),
                    },
                  }),
                }}
              >
                {item.title}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
