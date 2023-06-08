<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Comment from './Comment.vue';

const data = useData();
const { Layout } = DefaultTheme;
const { theme, frontmatter, page } = data;

</script>

<template>
    <Layout>
         <template #doc-footer-before>
            <Comment :key="page.relativePath"></Comment>
        </template>

        <template #aside-outline-after>
            <div class="about-me">
                <p>不要关注</p>
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
    width: 120px;
    font-size: 12px;
    color: #eee;
    text-align: center;
    margin: 5px 0;
}
.about-me a {
    font-weight: 500;
    color: var(--vp-c-brand);
    text-decoration-style: dotted;
    transition: color 0.25s;
}
.about-me img {
    text-align: center;
    width: 150px;
    margin-left: -8px;
}
</style>
