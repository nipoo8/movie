import React, { Component } from 'react';
import './App.css'
import './css/App.css'
import AboutContainer from './components/about/AboutContainer'
import HomeContainer from './components/home/HomeContainer'
import MovieContainer from './components/movie/MovieContainer'
import { HashRouter, Route, Link } from 'react-router-dom';
import { Layout, Menu, } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends Component {
  componentWillMount(){
    console.log()
  }
  render() {
    return (
     <HashRouter>
      <Layout className="layout" style = {{height:'100%'}}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[window.location.hash.split('/')[1]]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="home"><Link to="/home">首页</Link></Menu.Item>
          <Menu.Item key="movie"><Link to="/movie/in_theaters/1">电影</Link></Menu.Item>
          <Menu.Item key="about"><Link to="/about">关于</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{background:'#fff' }}>
        <Route path = '/home' component = {HomeContainer}></Route>
        <Route path = '/movie' component = {MovieContainer}></Route>
        <Route path = '/about' component = {AboutContainer}></Route>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
       LuT ©2019 Created by Ant UED
      </Footer>
      </Layout>
     </HashRouter>
    );
  }
}

export default App;