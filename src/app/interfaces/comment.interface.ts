export interface Comment {
  // id: number;
  user: string; //usuario del comentario
  content: string; // comentario
  attachedScreenshoot: string; // screen que capturamos
  currentTime: number; //momento en que se genera el screen
  reviewDocument: string; //referencia al video que estamos usando
}
