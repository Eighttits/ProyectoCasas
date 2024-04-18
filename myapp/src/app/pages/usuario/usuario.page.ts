import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  constructor(private usuariosService: UsersService, private router: Router) { }

  ngOnInit() {
    if (!this.usuariosService.isLoggedIn()) {
      this.router.navigate(["../login"]);
    }
  }

  destruirSesion(){
    this.usuariosService.destroySession();
    location.reload();
  }

}
