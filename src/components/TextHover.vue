<template>
    <a class="mallki" href="#/">
      {{text}}
      <span :data-letters="text" />
      <span :data-letters="text" />
    </a>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue'
interface Props {
    text?: string
}
const props = withDefaults(defineProps<Props>(), {
    text: ''
})
const { text } = toRefs(props)
</script>
<style lang="scss" scoped>
.mallki {
  font-weight: 800;
  color: #4dd9d5;
  font-family: 'Dosis', sans-serif;
  -webkit-transition: color 0.5s 0.25s;
  transition: color 0.5s 0.25s;
  overflow: hidden;
  position: relative;
  display: inline-block;
  line-height: 1;
  outline: none;
  text-decoration: none;
}

.mallki:hover {
  -webkit-transition: none;
  transition: none;
  color: transparent;
}

.mallki::before {
  content: '';
  width: 100%;
  height: 6px;
  margin: -3px 0 0 0;
  background: #3888fa;
  position: absolute;
  left: 0;
  top: 50%;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  -webkit-transition: -webkit-transform 0.4s;
  transition: transform 0.4s;
  -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}

.mallki:hover::before {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}

.mallki span {
  position: absolute;
  height: 50%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
}

.mallki span::before {
  content: attr(data-letters);
  color: red;
  position: absolute;
  left: 0;
  width: 100%;
  color: #3888fa;
  -webkit-transition: -webkit-transform 0.5s;
  transition: transform 0.5s;
}

.mallki span:nth-child(2) {
  top: 50%;
}

.mallki span:first-child::before {
  top: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

.mallki span:nth-child(2)::before {
  bottom: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

.mallki:hover span::before {
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
</style>