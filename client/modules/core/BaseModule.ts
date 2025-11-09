import React from 'react';

// Type d'un module UI: un composant React avec un identifiant de module
export type ModuleComponent = React.ComponentType<any> & { moduleId: string };
