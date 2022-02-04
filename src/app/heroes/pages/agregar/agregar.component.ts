import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroes, Publisher } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img{
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroes = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };
  
  constructor(
    private heroesService: HeroesService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar')){
        this.activatedRoute.params
            .pipe(
              switchMap(({id})=> this.heroesService.getHeroePorId(id))
            )
            .subscribe(
              heroe=>
              {this.heroe = heroe}
            )
    }

    }
  


  guardar():void{
    if(this.heroe.superhero!.trim().length === 0){
      return;
    }
    if(this.heroe.id){
      //Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => this.mostrarSnakbar('Registro actualizado'))
    }else{
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
        this.mostrarSnakbar('Registro creado')
      })
    }
   
  }

  borrar():void{

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed()
    .subscribe(resp => {if(resp){
      this.heroesService.borrarHeroe(this.heroe.id!)
        .subscribe(
          resp =>
          this.router.navigate(['/heroes'])
        )
    }})
    
  }

  mostrarSnakbar(mensaje: string):void{
    this.snackBar.open(mensaje,'Ok!', {
      duration: 2500 
    });
  }
}
