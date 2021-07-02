

import Swal, { SweetAlertIcon }  from 'sweetalert2';

export class FunctionCategory {

    public onSelectTab(tab : string){
        var btn = document.querySelectorAll('#pills-tab li button')
    
        btn.forEach( (b) => {
          if(b.id === tab){
            b.className = 'nav-link active';
            let cont = b.attributes.getNamedItem('aria-controls')?.value;
            let tabcont = document.querySelector(`#${cont}`);
            if( tabcont?.className ){ tabcont.className = 'tab-pane fade show active' }
          }
          else{
            b.className = 'nav-link';
            let cont = b.attributes.getNamedItem('aria-controls')?.value;
            let tabcont = document.querySelector(`#${cont}`);
            if( tabcont?.className ){ tabcont.className = 'tab-pane fade' }
          }
        })
      }

      msgPage(title:string, text:string, icon:SweetAlertIcon, confirm: string){
        Swal.fire({
          title: title,
          text: text,
          icon: icon,
          confirmButtonText: confirm
        })
      }

}
