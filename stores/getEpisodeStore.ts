import axios from "axios";
import { ref } from "vue";

interface Episode {
    id: number;
    name: string;
    episode: string;
    air_date: string
}

// interface Character {
//     id: number;
//     name: string;
//     episode: string[];
// }

export const useEpisodeStore = () => {
    const episodes = ref<Episode[]>([]);
    const isLoading = ref(false);
    const characterId = ref<number | null>(null);

    const getAllEpisodes = async () => {
        isLoading.value = true;
        try {
            const response = await axios.get('https://rickandmortyapi.com/api/episode');
            episodes.value = response.data.results;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    const getEpisodesByCharacter = async (characterId: number) => {
        isLoading.value = true;
        try {
            const characterResponse = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
            const characterEpisodes = characterResponse.data.episode;
            const episodeIds = characterEpisodes.map((episode: string) => episode.split('/').pop());
            const episodeResponses = await Promise.all(episodeIds.map((id: string) => axios.get(`https://rickandmortyapi.com/api/episode/${id}`)));
            episodes.value = episodeResponses.map((response) => response.data);
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        episodes,
        isLoading,
        characterId,
        getAllEpisodes,
        getEpisodesByCharacter,
    }
}