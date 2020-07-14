import React, { useRef, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import { ReactComponent as ShoppingBagIcon } from "./shopping_bag.svg";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    flexGrow: 1,
    color: "#FFF",
    alignItems: "center",
    width: "100vw",
  },
  appbar: {},
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
  return (
    <div>
      <AppBar position="static" className={classes.appbar} elevation={1}>
        <Toolbar>
          <div className={classes.title}>
            <IconButton onClick={() => history.goBack()} color="secondary">
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="h5">Shopping</Typography>
          </div>
          <div
            data-layout="COUNTER_ONLY"
            data-icon="BAG"
            className="ec-cart-widget"
          ></div>
          <ShoppingBagIcon />
        </Toolbar>
      </AppBar>

      <Box mt={3} mb={6}>
        <div id="my-search-32329017"></div>
      </Box>
      {/* <Typography variant="h5" color="secondary">
        Product
      </Typography> */}
      <Box mt={3}>
        <div id="my-categories-32329017"></div>
      </Box>
      <div id="my-store-32329017" ref={storeDiv}></div>
    </div>
  );
}

export default Ecwid;
