import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    
    return (
        
          
<nav className="flex flex-col mt-4">
  <Link
    to="/clients"
    className="py-2 px-4 hover:bg-[#d9bddc] after:block after:h-1 after:w-full after:bg-gradient-to-r after:from-[#3b3b41] after:to-transparent"
  >
    Clientes
  </Link>
  <Link
    to="/machines"
    className="py-2 px-4 hover:bg-[#d9bddc] after:block after:h-1 after:w-full after:bg-gradient-to-r after:from-[#3b3b41] after:to-transparent"
  >
    Máquinas
  </Link>
  <Link
    to="/employees"
    className="py-2 px-4 hover:bg-[#d9bddc] after:block after:h-1 after:w-full after:bg-gradient-to-r after:from-[#3b3b41] after:to-transparent"
  >
    Personal
  </Link>
  <Link
    to="/charts"
    className="py-2 px-4 hover:bg-[#d9bddc] after:block after:h-1 after:w-full after:bg-gradient-to-r after:from-[#3b3b41] after:to-transparent"
  >
    Estadísticas
  </Link>
  <Link
    to="/clients"
    className="py-2 px-4 hover:bg-[#d9bddc] after:block after:h-1 after:w-full after:bg-gradient-to-r after:from-[#3b3b41] after:to-transparent"
  >
    Cierre del día
  </Link>
</nav>

    
    
        
      );
    };
 
