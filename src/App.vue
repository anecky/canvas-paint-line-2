<template>
  <div>
    <canvas id="canvas"></canvas>
    <div class="color" id="color">
      <ol>
        <li id="color_red" :class="{selected:selectedClass==='red'}">
          <div class="red" @click="selectedColor('red')"></div>
        </li>
        <li id="color_blue" :class="{selected:selectedClass==='blue'}">
          <div class="blue" @click="selectedColor('blue')"></div>
        </li>
        <li id="color_green" :class="{selected:selectedClass==='green'}">
          <div class="green" @click="selectedColor('green')"></div>
        </li>
        <li id="color_purple" :class="{selected:selectedClass==='purple'}">
          <div class="purple" @click="selectedColor('purple')"></div>
        </li>
        <li id="color_black" :class="{selected:selectedClass==='black'}">
          <div class="black" @click="selectedColor('black')"></div>
        </li>
      </ol>

    </div>
    <div class="lineWidth">
      <ol>
        <li class="line-wrapper" :class="{selected1: lineWidth===8}" @click="changeLineWidth(8)">
          <div class="weight"></div>
        </li>
        <li class="line-wrapper" :class="{selected2: lineWidth===4}" @click="changeLineWidth(4)">
          <div class="normal"></div>
        </li>
        <li class="line-wrapper" :class="{selected2: lineWidth===2}" @click="changeLineWidth(2)">
          <div class="light"></div>
        </li>
      </ol>
    </div>

  </div>

</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        canvas: null,
        color: null,
        ctx: null,
        isTouchDevice: false,
        last: undefined,
        painting: null,
        selectedClass: 'black',
        lineWidth: 8,
      };
    },
    methods: {
      init() {
        this.canvas = document.getElementById("canvas");
        console.log(document.getElementById('canvas'))
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.painting = false;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = "round";
        if (this.isTouchDevice) {
          this.touchDevice()
        } else {
          console.log('pc')
          this.pcDevice()
        }
      },
      changeLineWidth(width) {
        this.lineWidth = width
        this.ctx.lineWidth = width

      },
      touchDevice() {
        document.addEventListener('touchmove', e => {
          e.preventDefalut();
        }, {
          passive: false
        })

        this.canvas.ontouchstart = (e) => {
          let x = e.touches[0].clientX;
          let y = e.touches[0].clientY;
          this.last = [x, y];
        };
        this.canvas.ontouchmove = (e) => {
          let x = e.touches[0].clientX;
          let y = e.touches[0].clientY;
          this.drawLine(this.last[0], this.last[1], x, y);
          this.last = [x, y];
        };
      },
      pcDevice() {
        this.canvas.onmousedown = (e) => {
          this.painting = true;
          this.last = [e.clientX, e.clientY];
        };
        this.canvas.onmousemove = (e) => {
          if (this.painting) {
            this.drawLine(this.last[0], this.last[1], e.clientX, e.clientY);
            this.last = [e.clientX, e.clientY];
          } else {
            // console.log('什么都不做')
          }
        };
        this.canvas.onmouseup = () => {
          this.painting = false;
        };
      },
      drawLine(x1, y1, x2, y2) {
        console.log('drawLine')
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.fill();
      },
      selectedColor(color) {
        this.selectedClass = color
        this.ctx.strokeStyle = color
      }


    },
    mounted() {
      console.log('created')
      this.isTouchDevice = "ontouchstart" in document.documentElement;
      this.init();
    },
  };
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  *,
  *::after,
  *::before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  ul,
  li {
    list-style: none;
  }

  body {
    position: relative;
    overflow: hidden;
  }


  #canvas {
    display: block;
  }


  .color {
    z-index: 2;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .color>ol {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .color>ol>li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .color>ol>li>div {
    height: 20px;
    width: 20px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .color .red {
    background: red;
  }

  .color .green {
    background: green;
  }

  .color .blue {
    background: blue;
  }

  .color .purple {
    background: purple;
  }

  .color .black {
    background: black;
  }

  .selected {
    background: #cccccc;
  }

  .lineWidth {
    position: absolute;
    z-index: 2;
    top: 50px;
    left: 10px;
    padding: 5px;
    width: 200px;
  }

  .lineWidth>ol {
    display: flex;
    justify-content: space-between;
  }


  .weight {
    height: 8px;
    width: 50px;
    background: #000;
  }

  .line-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .normal {
    height: 4px;
    width: 50px;
    background: #000;
  }

  .light {
    height: 2px;
    width: 50px;
    background: #000;
  }

  .line-wrapper.selected {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .line-wrapper.selected1::after {
    content: "";
    padding: 8px 30px;
    background: #cccccc;
    position: absolute;
    z-index: -1;
  }

  .line-wrapper.selected2::after {
    content: "";
    padding: 4px 30px;
    background: #cccccc;
    position: absolute;
    z-index: -1;
  }
</style>