import {
  createMuiTheme,
} from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: '#7e5dc0',
      main: '#5e35b1',
      dark: '#41257b',
      contrastText: '#fff ',
    },
    secondary: {
      light: '#4aedc4',
      main: '#1de9b6',
      dark: '#14a37f',
      contrastText: '#fff',
    },
    background:
    {
      default: '#eee'
    }
  },
  shape: {
    borderRadius: 15,
  },
  overrides: {
    MuiLinearProgress: {
      bar1Determinate: {
        transition: "none",
      }
    },
  }
});
