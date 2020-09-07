import React from 'react';

import introImg from '../../assets/Version2.0/Intro.svg';
import backgroundImg from '../../assets/Version2.0/Background.svg';

import './styles.css';

const Banner:React.FC = () =>{
    return (
        <div 
            id="container-banner" 
        >
            <img id="backgroundImg" src={backgroundImg} alt="Imagem de fundo"/>
            
            <img id="intro" src={introImg} alt="Proffy sua plataforma de estudos online."/>
            
        </div>
    );
}
export default Banner;