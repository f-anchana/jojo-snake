import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Snake from '../Snake/Snake';
import s from './Board.module.scss'; // Import CSS Module stylesheet as s 
import Item from '../Item/Item';
import {
defaultControls,
flashUser,
generateRandomCoordinates,
triggerMode,
reversedControls,
wizz,
netherPortal,
} from "../../utils/utils";
import useStore from '../../utils/store';
import Submit from '../Submit/Submit';
import GameOver from '../GameOver/GameOver';
import Scoreboard from '../Scoreboard/Scoreboard';


// const MAXIMUM_FOOD_AVAILABLE = 3; //on limite le nombre de nourriture à 3 (on peut le dynamiser pour mettre un nombre aléatoire par exemple)

const Board = () => {
    const {mode, removeMode} = useStore(); //on récupère le mode du store
    //state, variable où on stocke des données avec getter (variable initiale) et setter (variable modifiée), ex test, setTest
    const [snakeData, setsnakeData] = useState([
        [0, 0],
        [10, 0],
    ]); 

const [foodArray, setFoodArray] = useState([]); //on initialise la position de la nourriture
const [trapArray, setTrapArray] = useState([]); //on initialise la position de la nourriture empoisonnée
const [hasEnteredResults, setHasEnteredResults] = useState(false);

const [neonEffect, setNeonEffect] = useState(false); // Etat pour l'effet néon


const [gameOver, setGameOver] = useState(false); //on initialise le game over à false
const [speed, setSpeed] = useState(0.2); //on initialise la vitesse du snake à 0.2
const [score, setScore] = useState(0); //on initialise le score à 0
const [death, setDeath] = useState(0); //on initialise le nombre de mort à 0
    
const timer = useRef(0);
const foodTimer = useRef(0);
const Traptimer = useRef(0);
const direction = useRef("RIGHT"); //faut rester consistent, donc si j'écris en majuscule, je garde ça 
const canChangeDirection = useRef(true); //pour éviter que le snake revienne sur lui-même

// useEffect(() => {
//     if(mode.includes("impossible")) {
//         setSpeed(0.02);
//     }
// }, [mode]); on ne se base plus sur le useEffect, on le change dans la GameLoop

const gameIsOver = () => {
    gsap.ticker.remove(gameLoop);

    setDeath(death + 1);

    const video = document.getElementById("die-video");
    video.style.display = "block";

    video.currentTime = 0;
    video.play();

    setGameOver(true);
};

const isOutofBorder = (head) => {
        // const head = snakeData[snakeData.length - 1]; //on récupère la dernière valeur du tableau
        // console.log(head);
        if(head[0]>= 500 || head[1] >= 500 || head[0] < 0 || head[1] < 0) {
            return true;
        }else {
            return false;
        }; 
        // si la tête du snake est en dehors du cadre, on retourne true (game over), sinon false
        
    };

    const hasEatenItem = ({getter, setter}) => {
        const head = snakeData[snakeData.length - 1];
        // console.log(head);

        //comparer les coordonnées de la tête du snake avec les coordonnées de la nourriture
       const item = getter.find((_item, i) =>  _item.x === head[0] && _item.y === head[1]); //_food est une variable temporaire, on peut l'appeler comme on veut, i est l'index

        if(item){
            //s'il y a match, on retourne true, sinon false
            //mettre à jour le tableau des food disponible
            const newItemArray = getter.filter((_item) => _item !== item); //on filtre le tableau foodArray pour enlever la nourriture qui a été mangée

            // console.log(newFoodArray);
            
            setter(newItemArray); //on met à jour le state foodArray avec le nouveau tableau
            return true;
        }else {
            return false;
        }
        

    };
        

    const Movesnake = () => {
        let newSnakeData = [...snakeData]; //on copie/clone le tableau snakeData, pour après le donner au setSnakeData, et on change pas l'original
        let head = newSnakeData[newSnakeData.length - 1]; //on récupère la dernière valeur du tableau
        // console.log(head);
        
        //with the arrows left down up right, we move the snake
        switch (direction.current) {
            case "UP":
                // console.log('up');
                head = [head[0], head[1] - 10]; //on déplace la tête du snake de 10px vers le haut
                break;

            case "DOWN":
                // console.log('down');
                head = [head[0], head[1] + 10]; //on déplace la tête du snake de 10px vers le bas
                break;

            case "LEFT":
                // console.log('left');
                head = [head[0] - 10, head[1]]; //on déplace la tête du snake de 10px vers la gauche
                break;

            case "RIGHT":
                // console.log('right');
                head = [head[0] + 10, head[1]]; //on déplace la tête du snake de 10px vers la droite
                break

            default:
                break;
            }

            //mise à jour du state snakeData

        newSnakeData.push(head); //on ajoute la nouvelle tête du snake
        newSnakeData.shift(); //on supprime la queue du snake et pour mettre à jour le snakeData (parce qu'il y a que 2 éléments dans le tableau), donc on le déplace

        const snakeCollapsed = hasCollapsed(head); //on appelle la fonction hasCollapsed
        const OutofBorder = isOutofBorder(head); //on appelle la fonction isOutofBorder
        const snakeAteFood = hasEatenItem({
            getter: foodArray,
            setter: setFoodArray,
        }); //on appelle la fonction hasEatenItem
        const snakeAteTrap = hasEatenItem({
            getter: trapArray,
            setter: setTrapArray,
        }); //on appelle la fonction hasEatenItem


        // const handleNetherPortalEffect = (newSnakeData) => {
        //     console.log("Effet Nether Portal activé. Mise en pause du jeu.");
        //     setNeonEffect(true); // Applique l'effet néon
            
        //     const video = document.getElementById("nether-video");
        //     video.style.display = "block"; // Affiche la vidéo
        //     video.play(); // Joue la vidéo
        //     setGameIsPaused(true); // Met le jeu en pause
            
        //     video.onended = () => {        
        //         // Attendre 1000ms après la vidéo avant de reprendre le jeu
        //         setTimeout(() => {
        //             const audio = new Audio("/audio/zawarudoresume.mp3"); // Remplace avec ton fichier audio
        //             audio.play(); // Joue le son
        //             setNeonEffect(false); // Retire l'effet néon
        //             setGameIsPaused(false); // Relance le jeu
        //         }, 1000); // Attendre 1000ms pour laisser le temps à l'audio de se jouer
        //     };
        // };
        
        const handleNetherPortalEffect = (newSnakeData) => {
            console.log("Effet Nether Portal activé. Mise en pause du jeu.");
            setNeonEffect(true); // Applique l'effet néon
            
        
            const video = document.getElementById("nether-video");
            video.style.display = "block"; // Affiche la vidéo
            video.play(); // Joue la vidéo
            
            video.onended = () => {
                setTimeout(() => {
                    const audio = new Audio("/audio/zawarudoresume.mp3");
                    audio.play(); // Joue le son
                    setNeonEffect(false); // Retire l'effet néon
        
                }, 1000);
            };
        };
        
        

        if (OutofBorder || snakeCollapsed) {
            gameIsOver();
        }else {
            // setsnakeData(newSnakeData); //on met à jour le snakeData avec le nouveau tableau

            if (snakeAteTrap === true) {
                // trap execution logic
                // const effects = [flashUser, triggerMode, wizz, netherPortal];
                const effects = [netherPortal];
        
                const selectedEffect =
                  effects[Math.floor(Math.random() * effects.length)];
        
                selectedEffect();

                if(selectedEffect === netherPortal){
                    handleNetherPortalEffect(newSnakeData);
                }

                //on réduit le serpent d'un bloc
                if (newSnakeData.length > 1) {
                    newSnakeData.pop();
                    setsnakeData(newSnakeData);
                }
        
                // console.log(selectedEffect);
                // flashUser();
            
            }

            if(snakeAteFood === true){
                //agrandir le snake
                newSnakeData.unshift([]);

                //augmenter le score
                setScore(score + 10);

                if(speed > 0.05){
                    setSpeed(speed - 0.02); //on augmente la vitesse du snake
                }
            }
        }
        setsnakeData(newSnakeData); //on met à jour le snakeData avec le nouveau tableau
    };

    const hasCollapsed = (head) => {
        let snake = [...snakeData]; //on copie/clone le tableau snakeData
        // let head = snake[snake.length - 1]; //on récupère la dernière valeur du tableau
        snake.pop(); //on supprime la tête du snake
        
        //comparer les coordonnées de la tête du snake avec les coordonnées du reste du snake (son gros corps)
        for (let i = 0; i < snake.length; i++) {
            if (head[0] === snake[i][0] && head[1] === snake[i][1]) { //[i][0] est la position x, [i][1] est la position y, i est l'index du snake
                return true;
            }
        }
        return false;
        //si ça match, on retourne true, sinon false
    }

    const Onkeydown = (e) => {
        // console.log(e.keyCode);

        if (canChangeDirection.current === false) return;
        canChangeDirection.current = false;
    
        mode.includes("reversed") ? reversedControls(e, direction, true) : defaultControls(e, direction);
    }

    const addItem = ({getter, setter}) => {
       //génération de coordonnées aléatoires pour la nourriture
    const coordinates = generateRandomCoordinates(mode);

      //fusion des deux tableaux
    const array = [...foodArray, ...trapArray];

      //test pour savoir si un item est déjà existant à cet endroit
    const itemAlreadyExistsHere = array.some(
        (item) => item.x === coordinates.x && coordinates.y === item.y
    );

      // si ça existe déjà, rappeler la fonction
    if (itemAlreadyExistsHere) {
        addItem({ getter, setter });
        return;
    }

       //mise à jour du state foodArray
        //  setFoodArray((oldFoodArray) => [...oldFoodArray, coordinates]); //on push les nouvelles coordonnées dans le tableau foodArray + on l'a appelé oldFoodArray pour éviter de confondre avec le state foodArray, oldFoodArray est le state précédent
        setter((oldArray) => [...oldArray, coordinates]);
    }

    const gameLoop = (time, deltaTime, frame) => {
        // if (gameIsPaused) {
        //     return; // met le jeu en pause
        // }    
        
        // console.log(time, deltaTime, frame);
        timer.current += deltaTime * 0.001;
        foodTimer.current += deltaTime * 0.001; //on multiplie par 0.001 pour convertir en secondes
        Traptimer.current += deltaTime * 0.001; //on multiplie par 0.001 pour convertir en secondes


        //ici, gestion de l'apparition de la nourriture
        if (foodTimer.current > 2 && foodArray.length < 3) { //on limite le nombre de nourriture à 10
            // console.log('create food');
            foodTimer.current = 0;
            addItem({
                getter: foodArray,
                setter: setFoodArray,
            });
        }

        //ici, gestion de l'apparition de la nourriture piégée
        if (Traptimer.current > 3 && trapArray.length < 3) { //on limite le nombre de nourriture à 10
            // console.log('create food');
            Traptimer.current = 0;
            addItem({
                getter: trapArray,
                setter: setTrapArray,
            });
        }

        if (timer.current > (mode.includes("impossible") ? 0.02 : speed) ) { //on déplace le snake toutes les 0.5 secondes
            // console.log('move snake');
            timer.current = 0;
            Movesnake();
            canChangeDirection.current = true;
        }
    };

    const replay = () => {

        
        //replay game
        removeMode("corner");
        removeMode("impossible");
        removeMode("reversed");

        const video = document.getElementById("die-video");
        video.style.display = "none";
        video.pause();

        setGameOver(false);
        setHasEnteredResults(false);
        //reset score
        setScore(0);

        //reset speed
        setSpeed(0.2);

        //reset food
        setFoodArray([]);
        setTrapArray([]);

        //reset snake
        setsnakeData([
            [0, 0],
            [10, 0],
        ]);

        //reset direction
        direction.current = "RIGHT";

        //reset timer
        timer.current = 0;

        //reset food timer
        foodTimer.current = 0;
    }
        
    useEffect(() => {
        window.addEventListener('keydown', Onkeydown);
        gsap.ticker.add(gameLoop);

        return () => {
            window.removeEventListener('keydown', Onkeydown);
            gsap.ticker.remove(gameLoop);
        };

    }, [snakeData]);

    //on le passe en props, qui est un tableau de coordonnées
    return (
        <>
        {gameOver && <GameOver replay={replay} />}
        {gameOver && !hasEnteredResults && (
            <Submit
            score={score}
            death={death}
            setHasEnteredResults={setHasEnteredResults}
            />
        )}
        {gameOver && <Scoreboard />}
    
        {/* <div id="board" className={s.board}> */}
        <div id="board" className={`${s.board} ${neonEffect ? s.neon : ''}`}>

            <Snake data={snakeData} />
    
            <span className={s.score}>Score: {score}</span>
    
            <span className={s.death}>Death: {death}</span>
    
            {foodArray.map((coordinates) => (
            <Item key={coordinates.id} coordinates={coordinates} type="food" />
            ))}
    
            {trapArray.map((coordinates) => (
            <Item key={coordinates.id} coordinates={coordinates} type="trap" />
            ))}
        </div>
        </>
    );
}

export default Board;