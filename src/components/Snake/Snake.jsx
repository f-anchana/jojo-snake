import s from './Snake.module.scss';
import useStore from "../../utils/store";


const Snake = ({ data }) => { //il est composant enfant de Board + ici on extracte l'objet data de props
    const { skin } = useStore();

    const getStyle = (dot, i) => {
    const style = {
        transform: `translate(${dot[0]}px, ${dot[1]}px)`,
        // background: skin ? `url('${skin}') ${10 * i}px 0` : "", //c'est ici que je mets l'url de mon perso par défaut (dio)
        // backgroundImage: skin ? `url('${skin}')` : "url('https://media.tenor.com/Emn7_9n8RCIAAAAj/dio-jo-jo.gif')", // URL par défaut ici

    };

    return style;
    };

    return (  
        // <div className={s.snakeDot} ></div> + closing tag bigger than div so we can add content inside
        <> 
            {data.map((dot, i) => ( //i pour index pour chaque élément du tableau avec une clé qui sera unique
                <div key={i} className={s.snakeDot}
                    // style={{
                    //     transform: `translate(${dot[0]}px, ${dot[1]}px)` //on déplace le snakeDot en fonction des coordonnées
                    // }}
                    style={getStyle(dot, i)}
                    // style={getStyle(data[0], 0)}
                >
                </div>
            ))}
        </>
    );
}

export default Snake;