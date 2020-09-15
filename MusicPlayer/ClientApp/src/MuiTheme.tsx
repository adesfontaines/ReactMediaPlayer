import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
  createMuiTheme,
} from "@material-ui/core/styles";

const drawerWidth = 240;

//const useStyles = makeStyles((theme: Theme) =>
//  createStyles({
//    root: {
//      display: "flex"
//    },
//    drawer: {
//      [theme.breakpoints.up("sm")]: {
//        width: drawerWidth,
//        flexShrink: 0
//      }
//    },
//    appBar: {
//      zIndex: theme.zIndex.drawer + 1
//    },
//    menuButton: {
//      marginRight: theme.spacing(2),
//      [theme.breakpoints.up("sm")]: {
//        display: "none"
//      }
//    },
//    // necessary for content to be below app bar
//    toolbar: theme.mixins.toolbar,
//    drawerPaper: {
//      width: drawerWidth,
//      flexShrink: 0
//    },
//    content: {
//      flexGrow: 1,
//      padding: theme.spacing.unit * 3
//    }
//  })
//);
const overwrites = {
  "palette": {
    "primary1Color": "#26a69a",
    "primary2Color": "rgba(77, 182, 172, 0.47)",
    "accent1Color": "#9ccc65",
    "shadowColor": "rgba(0, 0, 0, 0.77)"
  },
  "borderRadius": {}
};

const newTheme = createMuiTheme({
  overrides: {
    MuiLinearProgress: {
      bar1Determinate: {
        transition: "none",
      }
    },
    MuiDrawer: {
      root: {
        display: "flex",
        paper: {
          width: 240,
        },
      },
    }
  }
});

const defaultTheme = getMuiTheme(newTheme, overwrites);

export default defaultTheme;
