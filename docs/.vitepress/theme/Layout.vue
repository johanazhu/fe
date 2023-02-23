<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
const data = useData();
const { Layout } = DefaultTheme;
const { theme } = data;
</script>

<template>
    <Layout>
        <template #aside-outline-after>
            <div class="about-me">
                <!-- <p class="item">真男人 & 不推广</p> -->
                <img :src="theme.me.wechat" alt="" />
            </div>
        </template>
    </Layout>
</template>
<style scoped>
.about-me {
    padding: 16px;
    font-size: 14px;
}
.about-me p {
    margin: 5px 0;
}
.about-me a {
    font-weight: 500;
    color: var(--vp-c-brand);
    text-decoration-style: dotted;
    transition: color 0.25s;
}
.about-me img {
    width: 150px;
    margin-left: -8px;
}
</style>
