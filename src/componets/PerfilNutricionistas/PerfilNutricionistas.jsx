import React from 'react';
import foto from './nutri1.png'
import Buttons from '../Buttons/Buttons';
import NavBar from '../NavBar/Navbar';
import { ChevronDown, ChevronRight, User, Filter } from "lucide-react";
import "./PerfilNutricionistas.css";


const PerfilNutricionista = ({ nome, especializacao, sobre, telefone, email, CRNnutri }) => {

    return (
        <>
            <div className="container">
                <NavBar/>
                <div className="img-nutricionista">
                    <img src={foto} alt="" />
                </div>
                <div className="infos-nutricionista">
                    <h2>{nome}</h2>
                    <h4>{especializacao}</h4>
                    <h3>Sobre</h3>
                    <p>{sobre}</p>
                    <h3>Contato</h3>
                    <p>Telefone: {telefone}</p>
                    <p>Email: {email}</p>
                    <p>CRN: {CRNnutri}</p>
                    <Buttons
                        label="Ver Perfil"
                        variant="primary"
                        size="medium"
                    />
                </div>
            </div>
            <img className="forma-fundo" src="../assets/images/rectangle 49.png" alt="" />
        </>
    );

}

export default PerfilNutricionista