<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Comment from './Comment.vue';
import randomItem from './quotes.js';

const data = useData();
const { Layout } = DefaultTheme;
const { theme, frontmatter, page } = data;

console.log('randomItem', randomItem)

</script>

<template>
    <Layout>
        <template #doc-footer-before>
            <Comment :key="page.relativePath"></Comment>
        </template>

        <template #not-found>
            <div class="NotFound">
                <p class="code">404</p>
                <h1 class="title">页面迷失了</h1>
                <div class="divider"></div>
                <blockquote class="quote"> {{ randomItem }} </blockquote>
                <div class="action">
                    <a data-v-5f84d1af="" class="link" href="/" aria-label="go to home">
                        带我回首页
                    </a>
                </div>
            </div>
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


.NotFound {
    padding: 64px 24px 96px;
    text-align: center
}

@media (min-width: 768px) {
    .NotFound {
        padding: 96px 32px 168px
    }
}

.code {
    line-height: 64px;
    font-size: 64px;
    font-weight: 600
}

.title {
    padding-top: 12px;
    letter-spacing: 2px;
    line-height: 20px;
    font-size: 20px;
    font-weight: 700
}

.divider {
    margin: 24px auto 18px;
    width: 64px;
    height: 1px;
    background-color: var(--vp-c-divider)
}

.quote {
    margin: 0 auto;
    max-width: 256px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2)
}

.action {
    padding-top: 20px
}

.link {
    display: inline-block;
    border: 1px solid var(--vp-c-brand);
    border-radius: 16px;
    padding: 3px 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand);
    transition: border-color .25s, color .25s
}

.link:hover {
    border-color: var(--vp-c-brand-dark);
    color: var(--vp-c-brand-dark)
}
</style>
