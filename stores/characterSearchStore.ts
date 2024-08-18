import axios from "axios";
import { ref } from "vue"

interface Character {
    id: number
    name: string
    image: string
}

export const useCharacterSearchStore = () => {
    const character = ref<Character | null>(null);
    const searchQuery = ref<string>('');

    const getCharacterByName = async (searchQuery) => {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchQuery.value}`);
        character.value = response.data.results;
    };

    return {
        character,
        searchQuery,
        getCharacterByName,
    }
};