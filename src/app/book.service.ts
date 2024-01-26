import axios from "axios";

export const fetchDataPrice = async (title: string): Promise<{ country: string; averagePrice: number }> => {
    try {
        const response = await axios.get(`https://api.example.com/book/average-price?title=${title}`);
        return response.data;
    } catch (error) {
        throw new Error('Erreur lors de la récupération du prix moyen par pays.');
    }
}