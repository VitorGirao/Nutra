import React from 'react';
import { useLocation } from 'react-router-dom';
import foto from './nutri1.png';
import Buttons from '../Buttons/Buttons';
import NavBar from '../NavBar/NavBar'; // Importe corrigido apontando para a pasta vizinha!
import "./PerfilNutricionistas.css";

const PerfilNutricionista = () => {
    const location = useLocation();
    
    // Captura os dados passados pelo card. Se não houver, usa um mock padrão seguro
    const nutricionista = location.state?.nutricionista || {
        nome: "Dra. Andressa Silva",
        especializacao: "Nutrição Clínica e Esportiva",
        sobre: "Especialista em ajudar pessoas a alcançarem sua melhor versão através de uma alimentação saudável e sem neuras.",
        telefone: "(88) 99999-9999",
        email: "andressa@gmail.com",
        CRNnutri: "CRN-3 12345"
    };

    const { nome, especializacao, sobre, telefone, email, CRNnutri } = nutricionista;

    return (
        <>
            <div className="container">
                {/* Customizamos o texto do botão de voltar para ficar elegante */}
                <NavBar textoVoltar="Pesquisa Nutricionistas" />
                
                <div className="img-nutricionista">
                    <img src={foto} alt={`Foto de ${nome}`} />
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
                        label="Agendar Consulta"
                        variant="primary"
                        size="medium"
                    />
                </div>
            </div>
            <img className="forma-fundo" src="/src/assets/images/rectangle 49.png" alt="" />
        </>
    );
}

export default PerfilNutricionista;