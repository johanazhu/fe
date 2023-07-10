<template>
    <div class="map-container">
        <div v-if="showImg">
            <p>
                移动端长图绘制较慢，显示静态图片，大家请在PC端打开
            </p>
        </div>
        <div v-else>
            <p v-if="isIndex">
                绿色的方块都可以点击进入详情
            </p>
            <button class="download-btn" @click="downloadCanvas">导出图片</button>
            <canvas ref="canvasRef" :height="height" width="780" />
        </div>
    </div>
</template>

<script setup>
import UAParser from 'ua-parser-js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { drawMap } from './utils'
const props = defineProps({
    height: Number,
    data: Object
})
let canvasRef = ref()
const route = useRoute()
let parser = new UAParser()
let result = parser.getResult()
//   console.log('route', route)
const isIndex = ref(route?.path === '/')
const showImg = ref(result.device.type && isIndex.value)

function canvasClick(e) {
    if (e.target) {
        if (e.target.download) {
            downloadCanvas()
        }
        if (e.target.link) {
            location.href = e.target.link
        }
    }
}

function downloadCanvas() {
    const canvas = canvasRef.value
    // console.log('canvas', canvas)
    const dataURL = canvas.toDataURL({
        width: canvas.width,
        height: canvas.height,
        left: 0,
        top: 0,
        format: 'png',
    })
    const link = document.createElement('a');
    link.download = `${canvas.title}-${Date.now()}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
onMounted(() => {
    if (!showImg.value) {
        const canvas = drawMap(canvasRef.value, props.data)
        canvas.on("mouse:down", canvasClick)
    }
    if (import.meta.hot) {
        // HMR 代码
        console.log('热更新？')
    }
})

</script>

<style>
.map-container {
    position: relative;
}

.map-container p {
    font-size: 12px;
    text-align: center;

    margin: 0;
}

h1 {
    text-align: center;
}

.download-btn {
    position: absolute;
    right: -40px;
    top: -20px;
    display: inline-block;
    margin-left: 36px;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    /* -webkit-appearance: none; */
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-color: transparent;
    color: #409eff;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
}
</style>
