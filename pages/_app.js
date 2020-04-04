import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { path } from "ramda";
import PageLayout from "components/PageLayout";
import Modals from "components/Modals";
import { initAppState } from "modules/Global/redux/actions";
import "../styles.css";
import "react-tagsinput/react-tagsinput.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import createStore from "../store";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  componentDidMount() {
    const dispatch = path(["store", "dispatch"])(this.props);
    dispatch(initAppState());
  }

  render() {
    const { Component, pageProps, store, router } = this.props;
    return (
      <Provider store={store}>
        <PageLayout>
          <Component {...pageProps} router={router} />
          <Modals />
        </PageLayout>
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
