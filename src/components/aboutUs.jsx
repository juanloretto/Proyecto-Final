import React from 'react';
import teamMembers from './assets/temMembers.json';
import "./AboutUs.css";

import bb from './image/bb.jpg'
import Abdel from './image/Abdel.jpg'
import German from './image/German.jpg'
import Joaquin from './image/Joaquin.jpg'
import Juan from './image/Juan.jpg'
import Paula from './image/Paula.jpg'
import Maxi from './image/Maxi.jpg'




const images = {
  "bb": bb,
  "Abdel": Abdel,
  "German": German,
  "Joaquin": Joaquin,
  "Juan": Juan,
  "Paula": Paula,
  "Maxi": Maxi,
}

const AboutUs = () => {
  return (

    <div className='about-us'>
      <h1>Acerca De Nosotros</h1>
    <div className='team'>
      {teamMembers.map((member, index) => (
        <div key={index} className="team-member">
          <img src={images[member.img]} alt={member.name} />
          <h2>{member.name}</h2>
          <h3>{member.role}</h3>
          <p>{member.bio}</p>
        </div>
      ))}
    </div>
  </div>

  );
};

export default AboutUs;
