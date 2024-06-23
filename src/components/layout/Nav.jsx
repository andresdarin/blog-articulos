import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { homeOutline, pencilSharp, peopleOutline, receiptOutline } from 'ionicons/icons';

export const Nav = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Estado para mantener el índice activo

    // Función para cambiar el índice activo
    const handleSetActive = (index) => {
        setActiveIndex(index);
    };

    return (
        <nav className="nav">
            <ul>
                <li className={`list ${activeIndex === 0 ? 'active' : ''}`}>
                    <NavLink to="/inicio" onClick={() => handleSetActive(0)}>
                        <span className="text">Inicio</span>
                        <span className="icon">
                            <IonIcon icon={homeOutline} />
                        </span>
                    </NavLink>
                </li>
                <li className={`list ${activeIndex === 1 ? 'active' : ''}`}>
                    <NavLink to="/articulos" onClick={() => handleSetActive(1)}>
                        <span className="text">Articulos</span>
                        <span className="icon">
                            <IonIcon icon={receiptOutline} />
                        </span>
                    </NavLink>
                </li>
                <li className={`list ${activeIndex === 2 ? 'active' : ''}`}>
                    <NavLink to="/crear-articulos" onClick={() => handleSetActive(2)}>
                        <span className="text">Nuevo</span>
                        <span className="icon">
                            <IonIcon icon={pencilSharp} />
                        </span>
                    </NavLink>
                </li>
                <li className={`list ${activeIndex === 3 ? 'active' : ''}`}>
                    <NavLink to="/" onClick={() => handleSetActive(3)}>
                        <span className="text">Contacto</span>
                        <span className="icon">
                            <IonIcon icon={peopleOutline} />
                        </span>
                    </NavLink>
                </li>
                <div className="indicator"></div>
            </ul>
        </nav>
    );
};
