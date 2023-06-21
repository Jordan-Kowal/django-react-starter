import React, { memo } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import 'antd/dist/reset.css';
import frFR from 'antd/locale/fr_FR';
import { BrowserRouter } from 'react-router-dom';
import '@/services/dates/config';
import { AppLayout } from './components';
import { Routes } from './routes';
import { theme } from './styles';
import './styles/antd.less';
import './styles/global.less';

const themeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: theme,
};

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL || ''}>
    <ConfigProvider locale={frFR} theme={themeConfig}>
      <AppLayout>
        <Routes />
      </AppLayout>
    </ConfigProvider>
  </BrowserRouter>
);

App.propTypes = {};

export default memo(App);
