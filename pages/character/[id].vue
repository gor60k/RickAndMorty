<template>
    <main class="page char-page">
        <div class="wrapper">
            <div class="prev-link" @click="() => $router.go(-1)">
                <div class="prev-link-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15.4 4.80005L8.40002 11.8L15.4 18.8" stroke="#218F46" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <span>Назад</span>
            </div>
            <div class="char-page-wrapper">
                <img :src="character.image" :alt="character.name">

                <div class="char-page-wrapper-info">

                    <h1 class="char-page-wrapper-info-title">{{ character.name }}</h1>

                    <div class="char-page-wrapper-info-lists">

                        <div class="personal-data-list data-list">
                            <div class="data-list-header"><span>Personal data</span></div>
                            <ul class="data-list-ul">
                                <li class="data-list-ul-item">
                                    <span class="key">Status</span>
                                    <span class="value">{{ character?.status }}</span>
                                </li>
                                <li class="data-list-ul-item">
                                    <span class="key">Gender</span>
                                    <span class="value">{{ character?.gender }}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="personal-data-list data-list">
                            <div class="data-list-header"><span>Location</span></div>
                            <ul class="data-list-ul">
                                <li class="data-list-ul-item">
                                    <span class="value">{{ location.name }}</span>
                                </li>
                                <li class="data-list-ul-item">
                                    <span class="value">{{ location.type }}</span>
                                </li>
                                <li class="data-list-ul-item">
                                    <span class="value">{{ location.dimension }}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="personal-data-list data-list">
                            <div class="data-list-header"><span>Episode</span></div>
                            <ul class="data-list-ul">
                                <li class="data-list-ul-item" v-for="episode in episodes" :key="episode.id">
                                    <span class="key">{{ episode.episode }}</span>
                                    <span class="value">{{ episode.air_date }}</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>

            </div>
            <div class="char-page-slider">
                <span class="char-page-slider-title">More characters from {{ location?.name }}</span>
                <div v-if="characters?.length >= 5" class="char-page-slider-controls">
                    <div class="slider-scrollbar swiper-scrollbar"></div>
                    <div class="slider-navigation">
                        <div class="slider-prev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M15.4 4.80005L8.40002 11.8L15.4 18.8" stroke="#218F46" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div class="slider-next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M15.4 4.80005L8.40002 11.8L15.4 18.8" stroke="#218F46" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="slider-container">
                    <Swiper :slides-per-view="4" space-between="20" :modules="[Scrollbar, Navigation]"
                        :scrollbar="{ el: '.slider-scrollbar' }" :navigation="{
                            prevEl: '.slider-prev',
                            nextEl: '.slider-next'
                        }">
                        <SwiperSlide v-for="char in characters" :key="char.id">
                            <CharCard :char-img="char.image" :char-name="char.name" :char-id="char.id" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCharacterStore } from '#imports';
import { useEpisodeStore } from '~/stores/getEpisodeStore';
import { useLocationStore } from '~/stores/getLocationStore';
import { Scrollbar, Navigation } from 'swiper/modules';
import 'swiper/css/scrollbar';

interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    gender: string;
}

interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
}

interface Episode {
    id: number;
    episode: string;
    air_date: string;
}

const store = useCharacterStore();
const episodeStore = useEpisodeStore();
const locationStore = useLocationStore();
const episodes = ref<Episode[]>([]);
const location = ref<Location | null | undefined>({});
const characters = ref<object[] | null>([]);

const router = useRouter();

const charId = router.currentRoute.value.params.id;
const character = ref<Character | null | undefined>();

store.characterId.value = charId;
await store.getCharacter();
character.value = store.character.value;

await episodeStore.getEpisodesByCharacter(charId);
episodes.value = episodeStore.episodes.value;

await locationStore.getLocationByCharacter(charId);
location.value = locationStore.locations.value;

await locationStore.getCharacterByLocation();
characters.value = locationStore.charactersOnLocation.value;

</script>