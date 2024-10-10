import React, { useEffect, useState } from 'react';

function Map() {
   return (
      <iframe
        src="/map.html"
        style={{ width: '100%', height: "90em", border: 'none' }}
        title="Map"
      />
    );
}

export default Map;