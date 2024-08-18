import axios from "axios";
import { ref } from "vue";

interface Location {
    id: number
    name: string
    type: string
}

export const useLocationStore = () => {
    const locations = ref<Location[]>([]);
    const isLoading = ref(false);
    const characterId = ref<number | null>(null);
    const charactersOnLocation = ref<object[] | null>([]);

    const getAllLocations = async () => {
        isLoading.value = true;
        try {
            const response = await axios.get('https://rickandmortyapi.com/api/location');
            locations.value = response.data.results;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    }

    const getLocationByCharacter = async (characterId: number) => {
        isLoading.value = true;
        try {
            const characterResponse = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
            const characterLocationUrl = characterResponse.data.location.url;
            const characterOriginUrl = characterResponse.data.origin.url;
            const locationId = characterLocationUrl.split('/').pop();
            const originId = characterOriginUrl.split('/').pop();
            const locationResponse = await axios.get(`https://rickandmortyapi.com/api/location/${locationId ? locationId : originId}`);
            locations.value = locationResponse.data;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    }

    const getCharacterByLocation = async () => {
        isLoading.value = true;
        try {
            const locationResidentsId = locations.value.residents.map(e => e.split('/').pop());
            const charactersResponse = await axios.get(`https://rickandmortyapi.com/api/character/${locationResidentsId}`);
            charactersOnLocation.value = charactersResponse.data;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = true;
        }
    }

    return {
        locations,
        isLoading,
        characterId,
        charactersOnLocation,
        getAllLocations,
        getLocationByCharacter,
        getCharacterByLocation,
    }
}