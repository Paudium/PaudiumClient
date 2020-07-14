import React, { useRef, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    flexGrow: 1,
    color: "#FFF",
    
  },
  appbar: {
    marginBottom: 20,
  },
}));
function Ecwid() {
  const storeDiv = useRef(null);
  const scriptRef = useRef(null);
  const classes = useStyles();
  const history = useHistory();

  window.localStorage.setItem("show_ecwid_logs", "true");
  window.ecwid_script_defer = true;
  window.ecwid_dynamic_widgets = true;
  window.ec = window.ec || Object();
  window.ec.storefront = window.ec.storefront || Object();
  window.ec.enable_catalog_on_one_page = true;
  window._xnext_initialization_scripts = [
    {
      widgetType: "ProductBrowser",
      id: "my-store-32329017",
      arg: ["id=productBrowser", "views=grid(20,3)"],
    },
    {
      widgetType: "CategoriesV2",
      id: "my-categories-32329017",
      arg: ["id=categoriesV2"],
    },
    {
      widgetType: "SearchWidget",
      id: "my-search-32329017",
      arg: ["id=searchWidget"],
    },
  ];

  var script = document.createElement("script");
  script.charset = "utf-8";
  script.type = "text/javascript";
  script.src = "https://app.ecwid.com/script.js?32329017";
  script.defer = true;
  script.ref = scriptRef;

  useEffect(() => {
    if (!scriptRef.current) {
      storeDiv.current.appendChild(script);
    }

    window.init();
  });
  console.log("TEST", test);
  return (
    <div>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <div className={classes.title}>
            <IconButton onClick={() => history.goBack()} color="secondary">
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="h5">Shopping</Typography>
          </div>
          <div data-icon="BAG MEDIUM_ICON_COUNTER	" className="ec-cart-widget"></div>
        </Toolbar>
      </AppBar>

      <Box my={7}>
        <div id="my-search-32329017"></div>
        <div id="my-categories-32329017"></div>
        <div id="my-store-32329017" ref={storeDiv}></div>
      </Box>
    </div>
  );
}

export default Ecwid;
