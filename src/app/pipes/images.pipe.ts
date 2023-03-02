import { Pipe, PipeTransform } from '@angular/core';
import { Global } from '../services/global';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string,tipo:string ='usuario'): any {

    let url= Global.urlimages+'img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'original':
        url += '/original/' + img;
      break;

      case 'identidad':
        url += '/validar/' + img;
      break;

      case 'dni':
        url += '/dni/' + img;
      break;

      case 'img':
        url += '/images/' + img;
      break;

      case 'profile':
        url += '/profile/' + img;
      break;

      case 'publicidad':
        url += '/publicidad/' + img;
      break;

      case 'tienda':
         url += '/tienda/' + img;
      break;
      
      case 'videos':
          url = Global.url + 'stream/' + img;
        //  url += '/videos/' + img;
      break;

      default:
        console.log('Error no se encuentra imagen');
        url += '/usurios/xxx';
    }



    return url;
  }

}
