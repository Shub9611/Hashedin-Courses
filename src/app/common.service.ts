import Swal from "sweetalert2";


export class CommonService {

  constructor() { }

  alertMsg(text){
    Swal.fire(text);
  }
}
