import { Injectable } from '@angular/core';

declare var io: any;
@Injectable()
export class CollaborationService {

  collaboration_socket: any;
  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaboration_socket= io(window.location.origin, {query:'sessionId=' + sessionId});

    this.collaboration_socket.on("change", (delta: string) => {
      console.log("collaboration: editor changes by" + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    this.collaboration_socket.on("message",(message) => {
      console.log("received: " + message);
    })
  }

  change(delta: string): void {
    this.collaboration_socket.emit("change", delta);
  }
}
