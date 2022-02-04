import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interface/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroes): string{
    if(!heroe.id){
      return 'assets/no-image.png';
    }else if(heroe.alt_img){
      return heroe.alt_img;
    }else{
      return `assets/heroes/${heroe.id}.jpg`
    }
   
  }

}
