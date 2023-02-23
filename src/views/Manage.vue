<template>
    <div>
      <ul>
        <li class="wow rollIn" data-wow-duration="2s" data-wow-delay="3s" style="background-color: lightblue">wow rollIn</li>
        <li class="wow rollIn" data-wow-offset="10"  data-wow-iteration="10" style="background-color: lightgreen">wow rollIn</li>
        <li class="wow rollIn" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow rollIn</li>
        <li class="wow lightSpeedIn" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow lightSpeedIn</li>
        <li class="wow swing" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow swing</li>
        <li class="wow pulse" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow pulse</li>
        <li class="wow flip" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow flip</li>
        <li class="wow flipInX" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow flipInX</li>
        <li class="wow bounce" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow bounce</li>
        <li class="wow bounceInDown" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow bounceInDown</li>
        <li class="wow bounceInUp" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow bounceInUp</li>
        <li class="wow bounceInLeft" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow bounceInLeft</li>
        <li class="wow bounceInRight" :style="'background-color: ' + 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ',' + 0.8 + ')'">wow bounceInRight</li>
      </ul>
      <div>11111</div>
    </div>
  </template>
   
  <script>
  import { WOW } from 'wowjs'
   
  export default {
    data: () => ({
   
    }),
    mounted() {
      let wow = new WOW({
        boxClass: "wow", // animated element css class (default is wow)
        animateClass: "animated", // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function (box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null, // optional scroll container selector, otherwise use window
      });
      wow.init()
    },
  }
  </script>
   
  <style>
    ul {
      width: auto;
      height: auto;
      padding: 100px 250px;
      list-style: none;
    }
    li {
        width: 100%;
        height: 150px;
        margin: 50px 0;
        color: #fff;
        text-align: center;
        line-height: 150px;
        font-size: 20px;
      }
  </style>
   
  <style src="wowjs/css/libs/animate.css"></style>
   