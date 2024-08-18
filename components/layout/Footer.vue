<template>
    <footer class="footer">
        <div class="footer-wrapper">
            <nav class="footer-nav">
                <ul class="footer-nav-list">
                    <li class="footer-nav-list-item" v-for="icon in icons" :key="icon">
                        <a href="">
                            <SpriteComponent :icon-name="icon" :view-box="'0 0 13 11'" width="13" height="11" />
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="footer-logo">
                <span>A product of</span>
                <img src="/public/icons/footerLogo.svg" alt="">
            </div>
            <span class="footer-politic">© 2020 Lift Media. All rights reserved</span>
        </div>
    </footer>
</template>

<script setup lang="ts">
const icons = <string[]>['linkedin', 'facebook', 'twitter'];
</script>