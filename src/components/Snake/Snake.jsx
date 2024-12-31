import s from './Snake.module.scss';
import useStore from "../../utils/store";

const Snake = ({ data, lastEatenFoodId, foodArray }) => {
    // Récupérer l'image de la dernière nourriture mangée en fonction de l'ID
    const getFoodImage = (foodId) => {
        const foodItem = foodArray.find(item => item.id === foodId);
        return foodItem ? foodItem.imageUrl : null;  // Retourne l'URL de l'image de la nourriture
    };

    const getStyle = (dot, i, foodId) => {
        const foodImage = foodId ? getFoodImage(foodId) : null;
        const style = {
            transform: `translate(${dot[0]}px, ${dot[1]}px)`,
            // Si la nourriture est mangée, appliquer son image comme fond pour le serpent
            backgroundImage: foodImage ? `url('${foodImage}')` : "url('/jojo/jonathan.png')", // Sinon, utiliser une image par défaut
        };
        return style;
    };

    return (  
        <>
            {data.map((dot, i) => (
                <div 
                    key={i} 
                    className={s.snakeDot} 
                    style={getStyle(dot, i, lastEatenFoodId)} // Passer l'ID de la dernière nourriture mangée
                />
            ))}
        </>
    );
};

export default Snake;
