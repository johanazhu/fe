<script setup lang="ts">
import { withBase } from 'vitepress'
import { VPDocAsideSponsors } from 'vitepress/theme'

const data = [
    {
        items: [
            {
                img: withBase('https://s2.loli.net/2022/10/09/31kvp8HRJuoBCfc.jpg')
            }
        ]
    },
]

</script>

<template>
    <p class="m-sponsor-title">
        鼓励作者：欢迎打赏犒劳
    </p>
    <VPDocAsideSponsors :data="data" />
</template>

<style>
.m-sponsor-title {
    margin-top: 10px;
    margin-bottom: 6px;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    color: var(--vp-c-brand);

}

.vp-sponsor-grid.vp-sponsor-grid .vp-sponsor-grid-link {
    height: 144px;
}

.vp-sponsor-grid.vp-sponsor-grid .vp-sponsor-grid-image {
    max-width: none;
    max-height: 128px;
    filter: grayscale(0.8);
}


.dark .vp-sponsor-grid-item:hover {
    background: var(--vp-custom-block-info-bg);
}

.vp-sponsor-grid-item:hover .vp-sponsor-grid-image {
    filter: none;
}
</style>
