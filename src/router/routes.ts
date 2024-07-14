import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/Home' /* webpackChunkName: "Home Chunk" */));
const Token = lazy(() => import('../pages/Token/Token' /* webpackChunkName: "Token Chunk" */));
const VestingContract = lazy(
  () => import('../pages/VestingContract/VestingContract' /* webpackChunkName: "VestingContract Chunk" */),
);

const ErrorPage = lazy(() => import('../pages/ErrorPage/ErrorPage' /* webpackChunkName: "ErrorPage Chunk" */));

export { Home, ErrorPage, Token, VestingContract };
