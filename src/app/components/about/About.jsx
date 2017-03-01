import React from 'react';
import { Banner } from 'rebass';

function About() {
  return (
    <Banner>
      <div className="container about">
        <h1>About Lola</h1>
        <h3>
        	Created by Nick Bennett, Rachel DePriest, and Daniel Olita, Lola is an interactive
        	music playing web-application that responds to voice commands allowing for a more social
          expierence. 
        </h3>
        <h3>
          While typical music playing applications require the user to have the artist and song
        </h3>
      </div>
    </Banner>
  )
}

export default About;
