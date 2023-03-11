export declare global {
  // Declaração global para o namespace React Navigation
  namespace ReactNavigation {
    // Interface de lista de parâmetros raiz
    interface RootParamList {
      // Rota 'home' sem parâmetros
      home: undefined;
      // Rota 'new' sem parâmetros
      new: undefined;
      // Rota 'habit' com um parâmetro 'date' do tipo string
      habit: {
        date: string;
      }
    }
  }
}
