import {
  makeStyles,
  createStyles,
  Theme,
  fade
} from "@material-ui/core/styles";

const drawerWidth = 210;

export default makeStyles((theme: Theme) =>
  createStyles({
    // All
    root: {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: "hidden"
    },
    mainContainer: {
      width: "100%"
    },
    subContainer: {
      padding: theme.spacing(3),
      width: "100%"
    },
    // Components
    mediaTable: {
      backgroundColor: "none"
    },
    // Drawer
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    // Footer
    footer:
    {
      backgroundColor: "#2e1534",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.4)",
      zIndex: theme.zIndex.drawer + 2000,
    },
    footerControls: {
      padding: 3,
    },
    mediaDurationButton: {
      border: "none",
      padding: 0,
      animation: "none",
      background: "none",
      outline: 0,
      '&:hover': {
        outlineStyle: "none"
      }
    },
    mediaButton: {
      backgroundColor:"transparent",
      border: "none",
      verticalAlign: "middle",
      color: theme.palette.common.white,
      '&:focus': {
        outlineStyle: "none"
      }
    },
    // App Bar
    appBar: {
      color: theme.palette.getContrastText("rgba(255,255,255,.7)"),
      backgroundColor: "rgba(255,255,255,1)",
      boxShadow: "none",
      borderBottom: "2px",
      zIndex: theme.zIndex.drawer + 1,
      position: "relative",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    grow: {
      flexGrow: 1
    },
    // Search app bar
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '30ch',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        minWidth: '300px'
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    // Drawer
    drawerPaper: {
      backgroundColor: "rgba(255,255,255,.7)",
      width: drawerWidth,
      zIndex: 5,
      flexShrink: 0
    },
    content: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    // Album list
    albumCard:
    {
      width: "171px",
      height: "171px"
    },
    mediaTabs:
    {
      backgroundColor: theme.palette.background.paper
    }
  })
);

