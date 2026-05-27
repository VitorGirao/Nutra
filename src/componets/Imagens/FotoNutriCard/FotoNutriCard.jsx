import "./FotoNutriCard.css";
import "../../../assets/nutri.jpeg";


function FotoNutriCard({ foto, nome }) {
  return <img className="foto-nutri" src={foto} alt={`Foto de ${nome}`} />;
}

export default FotoNutriCard;