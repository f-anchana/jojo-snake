import s from './Item.module.scss';
import { jojoImages } from "../../jojoimages";
import { useEffect, useState } from "react";


const Item = ({ coordinates, type }) => {
    // Génère une image jojo aléatoire quand la nourriture apparaît
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
      // Choisir une image aléatoire parmi celles disponibles dans jojoImages
      const randomImage = jojoImages[Math.floor(Math.random() * jojoImages.length)];
      setImageUrl(randomImage); // Met à jour l'image
    }, []);

    if (!imageUrl) return null; // Si l'image n'est pas encore définie, ne rien afficher

    const style = {
    transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
      backgroundImage: `url(${imageUrl})`, // Utilise l'image aléatoire
    };

    return <div className={`${s.item} ${s[`item_${type}`]}`} style={style}></div>;
};

export default Item; //quand on l'importe quelque part, on peut choisir de le renommer différemment mais bon faut juste être cohérent.
//Si je fais export const Item je dois l'importer avec les accolades : ex : import {Item} from './Item/Item.jsx'. et si je veux le renommer je dois utiliser as.