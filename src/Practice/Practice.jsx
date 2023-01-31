
import { Tabs, Tab } from 'react-bootstrap';

import React, { useState } from 'react';



const Practice = () => {
    const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
       
      </Tab>
      <Tab eventKey="profile" title="Profile">
      
      </Tab>
     
    </Tabs>
  );
}

export default Practice