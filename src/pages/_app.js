import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react'
import {Provider} from 'react-redux'
import App from 'next/app'
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from '../../store';
const { store, persistor } = configureStore();

class MyApp extends App {

    render() {
        const {Component, pageProps} = this.props

        return (
                <Provider store={store}>
                    <PersistGate persistor={persistor} loading={null}>
                        <Component {...pageProps} />
                    </PersistGate>
                </Provider>
        )
    }
}

export default MyApp