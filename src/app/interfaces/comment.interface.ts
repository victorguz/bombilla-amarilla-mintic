export interface CommentInterface {
  // id: number;
  user: string; //usuario del comentario
  content: string; // comentario
  attachedId: number; // screen que capturamos
  currentTime: number; //momento en que se genera el screen
  documentId: number; //referencia al video que estamos usando
}

export interface AttachedInterface {
  id: number;
  base64: string;
}
