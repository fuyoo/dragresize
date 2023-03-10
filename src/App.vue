<template>
  <div id="app">
    <div>
      x:{{ s1.x }} <button @click="x += 10">+</button><button @click="x -= 10">-</button>
    </div>
    <div>
      y:{{ s1.y }}<button @click="y += 10">+</button><button @click="y -= 10">-</button>
    </div>
    <div>
      w:{{ s1.w }}<button @click="w += 10">+</button><button @click="w -= 10">-</button>
    </div>
    <div>
      h: {{ s1.h }}<button @click="h += 10">+</button><button @click="h -= 10">-</button>
    </div>
    <div>active:{{ s1.active }}<br /></div>
    <p>scale {{ scale }} <button @click="scale += 0.1">+</button>  <button @click="scale -= 0.1">-</button></p>
    <div class="parent"
         :style="`transform: scale(${scale},${scale});transform-origin:left top`">
      <DragResize
        :initW="180"
        :initH="180"
        :scale="scale"
        v-model:x="s1.x"
        v-model:y="s1.y"
        v-model:w="s1.w"
        v-model:h="s1.h"
        v-model:active="s1.active"
        :draggable="s1.draggable"
        :resizable="s1.resizable"
        :parent="true"
        :disabledX="false"
        :disabledW="false"
        :disabledH="false"
        :disabledY="false"
        classNameHandle="my-handle"
      >
        <DragResize
          :initW="40"
          :initH="80"
          :scale="scale"
          v-model:x="s2.x"
          v-model:y="s2.y"
          v-model:w="s2.w"
          v-model:h="s2.h"
          v-model:active="s2.active"
          :draggable="s2.draggable"
          :resizable="s2.resizable"
          :parent="true"
          :disabledX="false"
          :disabledW="false"
          :disabledH="false"
          :disabledY="false"
          classNameHandle="my-handle2"
        >
      66666
        </DragResize>
        6666
      </DragResize>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import DragResize from "./components/DragResize";
import DragResizeContainer from "./components/DragResizeContainer";

export default defineComponent({
  components: { DragResize, DragResizeContainer },
  data() {
    return {
     s1:{
       x: 100,
       y: 100,
       h: 100,
       w: 100,
       active: false,
       draggable: true,
       resizable: true,
     },
      s2:{
        x: 100,
        y: 100,
        h: 100,
        w: 100,
        active: false,
        draggable: true,
        resizable: true,
      },

      scale: 1
    };
  },
  mounted() {},
  methods: {
    print(val, e) {
      // console.log(val, e)
    },
  },
});
</script>
<style lang="less" scoped>
.parent {
  width: 300px;
  height: 300px;
  // position: absolute;
  // top: 100px;
  // left: 200px;
  position: relative;
  border: 1px solid #000;
  user-select: none;
  ::v-deep {
    .vdr-container {
      border-color: #999;
    }
  }
}
</style>
