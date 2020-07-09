import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

import { queryByText } from "@testing-library/react";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1D2C56",
      contrastText:"#FFF"
    },
    inherit: {
      main: "#000",
    },
    secondary: {
      main: "#FFF",
      contrastText:"#000"
    },
    background: {
      default: "#1D2C56",
      paper: "#FFF",
    },
  },

  typography: {},

  overrides: {
    // List Item ⚛️
    MuiListItem: {
      divider: {
        borderBottom: "1px solid rgba(255,255,255,0.4)",
      },
    },

    MuiListItemText: {
      primary: {
        color: "#FFF",
      },
      secondary: {
        color: "rgba(255,255,255,0.4)",
      },
    },

    MuiButton: {
      root: {
        borderRadius: "none",
        height:"46px",
      },
    },
    MuiTabPanel: {
      root: {
        padding: 0,
      },
    },
    MuiIconButton: {},
    MuiBottomNavigationAction: {
      root: {
        color: "rgba(255,255,255,0.4)",
        "&$selected": {
          color: "#FFF",
        },
        disableRipple: true,
      },
    },

    MuiBottomNavigation: {
      root: {
        backgroundColor: "#1D2C56",
        borderTop:'solid 1px rgba(255,255,255,0.3)'
      },
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
