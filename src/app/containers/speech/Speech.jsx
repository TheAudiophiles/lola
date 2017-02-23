import React, { Component } from 'react';
import artyomjs from 'artyom.js';
const artyom = artyomjs.ArtyomBuilder.getInstance();

export default class Speech extends Component {
  constructor(props) {
    super(props);

      artyom.addCommands([
      {
        indexes: ['Hello','Hi','is someone there'],
        action: (i) => {
          artyom.say('Yes that is correct');
        }
      },
      {
        indexes: ['Repeat after me *'],
        smart:true,
        action: (i,wildcard) => {
          artyom.say("You've said : "+ wildcard);
        }
      }
    ]);

    artyom.initialize({
      lang: "en-GB",
      continuous: true,
      soundex: true,
      debug: true,
      executionKeyword: "and do it now",
      listen: true
    }).then(() => {
      console.log("Artyom has been succesfully initialized");
    }).catch((err) => {
      console.error("Artyom couldn't be initialized: ", err);
    });
  }

  clickHandler = (e) => artyom.say('Something');

  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>Click</button>
      </div>
    );
  }
}
