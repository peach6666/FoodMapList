<template>
  <div id="app">
    <section id="nav">
      <router-link to="/">首頁</router-link>
      <router-link to="/map">搜尋店家</router-link>
      <router-link to="/search">我的清單</router-link>
    </section>
    <router-view />
  </div>
</template>