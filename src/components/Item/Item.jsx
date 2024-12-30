import s from './Item.module.scss';

const Item = ({ coordinates, type }) => {

    const style = {
        transform: `translate(${coordinates.x}px, ${coordinates.y}px)`
    }
    return <div className={`${s.item} ${s[`item_${type}`]}`} style={style}></div>;
        // return <div className={s.item} style={style}> </div>;

}

export default Item; //quand on l'importe quelque part, on peut choisir de le renommer différemment mais bon faut juste être cohérent.
//Si je fais export const Item je dois l'importer avec les accolades : ex : import {Item} from './Item/Item.jsx'. et si je veux le renommer je dois utiliser as.