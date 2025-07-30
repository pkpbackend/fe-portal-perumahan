import React from "react";
import { Provider } from "react-redux";
import SettingView from "./SettingView";
import store from "./store";

const SettingProvider = () => {
  return (
    <Provider store={store}>
      <SettingView />
    </Provider>
  );
};

export default SettingProvider;
