<script setup lang="ts">
const random = Math.floor(Math.random() * 3 + 1)
</script>

<template>
    <div class="VPDocAsideSponsors">
        <div class="VPSponsors vp-sponsor aside">
            <section class="vp-sponsor-section">
                <div class="VPSponsorsGrid vp-sponsor-grid mini" data-vp-grid="1">
                    <div class="vp-sponsor-grid-item">
                        <a class="vp-sponsor-grid-link" href="/About/sponsor/" rel="sponsored noopener">
                            <article class="vp-sponsor-grid-box">
                                <h4 class="visually-hidden">Sponsor</h4>
                                <span class="vp-sponsor-grid-text">赞助位</span>
                            </article>
                        </a>
                    </div>
                </div>
            </section>
            <section class="vp-sponsor-section">
                <div class="VPSponsorsGrid vp-sponsor-grid mini" data-vp-grid="1">
                    <div class="vp-sponsor-grid-item">
                        <a class="vp-sponsor-grid-link"
                            href="https://xiaobot.tools?utm_source=fe.azhubaby.com&utm_medium=referral" target="_blank"
                            rel="sponsored noopener">
                            <article class="vp-sponsor-grid-box">
                                <h4 class="visually-hidden">小报童专栏导航</h4>
                                <img style="max-width:36px; border-radius: 2px;" src="/images/sponsor/xiaobot.png"
                                    alt="xiaobot.tools">
                                <span class="vp-sponsor-grid-text" style="margin-left: 8px;">小报童专栏导航</span>
                            </article>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style>
.vp-sponsor-grid-text {
    color: var(--vp-c-text-2);
    font-size: 12px;
}

.dark .vp-sponsor-grid-text {
    color: var(--vp-c-gray-1);
}
</style>
