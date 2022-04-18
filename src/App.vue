<template>
  <div id="app">
    <section id="nav">
      <router-link to="/">首頁</router-link>
      <router-link to="/map">美食地圖</router-link>
      <router-link to="/search">搜尋餐廳</router-link>
    </section>
    <router-view />
  </div>
</template>