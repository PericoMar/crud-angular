# Proyecto CRUD de Posts en Angular con HttpClient y JSON Server

## Instalación

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1. Clona este repositorio en tu máquina local utilizando Git:
```
git clone https://github.com/tu_usuario/tu_proyecto.git
```

2. Accede al directorio del proyecto:
```
cd tu_proyecto
```

3. Instala las dependencias utilizando npm:
```
npm install
```

4. Inicia el servidor JSON local y hazle watch al archivo db.json ejecutando el siguiente comando en una terminal:
```
json-server --watch db.json
```

Este comando iniciará JSON Server y observará los cambios en el archivo db.json.

5. En otra terminal, inicia la aplicación Angular ejecutando el siguiente comando:
```
ng serve
```

## Descripción del Proyecto
Este proyecto consiste en un CRUD de posts desarrollado en Angular. Utiliza HttpClient para recibir la información del servidor JSON local a través de JSON Server, lo que proporciona persistencia de datos. Se ha añadido un botón de filtrar para facilitar la búsqueda de posts en la lista.

## Inicio del proyecto:

- Crear un nuevo proyecto Angular llamado "blog" en un repositorio GitHub y trabajar en modo standalone.
- Añadir Bootstrap (versión 5) a través de sus CDN de manera global.
- Crear componentes para cada acción del CRUD (listado, vista individual, creación y actualización) y agruparlos en una carpeta llamada "post".

## Modelo de datos:

- Crear una interfaz llamada "Post" para los objetos principales del proyecto, ubicándola en la carpeta "post". La interfaz tendrá propiedades como "id", "title" y "body".
- Configurar un servicio de conexión a la base de datos que incorporará todas las funciones del CRUD. Utilizar la API de JSONPlaceholder como proveedor de datos.

## Desarrollo de componentes:

- Desarrollar el componente de listado de posts, incorporando la lógica necesaria para listar y manejar las acciones de borrado, vista y edición.
```
<div class="container">
  <h1>Create New Post</h1>

  <a href="#" routerLink="/post/index" class="btn btn-primary">Back</a>

  <form [formGroup]="form" (ngSubmit)="submit()">

      <div class="form-group">
          <label for="title">Title:</label>
          <input
              formControlName="title"
              id="title"
              type="text"
              class="form-control">
          <div *ngIf="f['title'].touched && f['title'].invalid" class="alert alert-danger">
              <div *ngIf="f['title'].errors && f['title'].errors['required']">Title is required.</div>
          </div>
      </div>

      <div class="form-group">
          <label for="body">Body</label>
          <textarea
              formControlName="body"
              id="body"
              type="text"
              class="form-control">
          </textarea>
          <div *ngIf="f['body'].touched && f['body'].invalid" class="alert alert-danger">
              <div *ngIf="f['body'].errors && f['body'].errors['required']">Body is required.</div>
          </div>
      </div>

      <button class="btn btn-primary" type="submit" [disabled]="!form.valid">Submit</button>
  </form>
</div>
```

```
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.postService.create(this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('');
    })
  }
}
```
- Desarrollar el componente de creación de posts, utilizando un formulario reactivo para añadir datos al servidor.
- Desarrollar el componente de edición de posts, similar al de creación pero con la capacidad de editar posts existentes.
```
<div class="container">
  <h1>Update Post</h1>

  <a href="#" routerLink="/post/index" class="btn btn-primary">Back</a>

  <form [formGroup]="form" (ngSubmit)="submit()">

      <div class="form-group">
          <label for="title">Title:</label>
          <input
              formControlName="title"
              id="title"
              type="text"
              [(ngModel)]="post.title"
              class="form-control">
          <div *ngIf="f['title'].touched && f['title'].invalid" class="alert alert-danger">
              <div *ngIf="f['title'].errors && f['title'].errors['required']">Title is required.</div>
          </div>
      </div>

      <div class="form-group">
          <label for="body">Body</label>
          <textarea
              formControlName="body"
              id="body"
              type="text"
              [(ngModel)]="post.body"
              class="form-control">
          </textarea>
          <div *ngIf="f['body'].touched && f['body'].invalid" class="alert alert-danger">
              <div *ngIf="f['body'].errors && f['body'].errors['required']">Body is required.</div>
          </div>
      </div>

      <button class="btn btn-primary" type="submit" [disabled]="!form.valid">Update</button>
  </form>
</div>
```

```
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  id!: number;
  post!: Post;
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post)=>{
      this.post = data;
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }
  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('');
    })
  }

}
```
- Desarrollar el componente de visualización de post, que mostrará la información detallada de un post específico.

## Funcionalidades Adicionales
- Persistencia de Datos: Se utiliza JSON Server para proporcionar persistencia de datos, lo que permite crear, leer, actualizar y eliminar posts.
```
@Injectable({
  providedIn: 'root',
})
export class PostService {

  private apiURL = 'http://localhost:3000';

// Http Header Options

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

// Constructor

  constructor(private httpClient: HttpClient) { }

  // Metodos

 // GET
	getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/');
  } // usar adecuadamente las interfaces

```
- Filtrar Posts: Se ha añadido un botón de filtrar para permitir a los usuarios buscar posts más fácilmente en la lista.
HTML:
```
<div class="row mb-3">
    <div class="col-md-4">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search" #filter (keydown.enter)="filterPosts(filter.value)">
        <button class="btn btn-primary" type="button" (click)="filterPosts(filter.value)">Filter</button>
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" (click)="clearSearch()">Clear</button>
        </div>
      </div>
    </div>
  </div>
```
Metodos:
´´´
clearSearch() {
    this.filteredPosts = this.posts; // Al limpiar la búsqueda, mostramos todos los posts
  }

  filterPosts(searchTerm : string) {
    if (!searchTerm.trim()) {
      this.filteredPosts = this.posts; // Si el término de búsqueda está vacío, mostramos todos los posts
      return;
    }

    // Filtramos los posts según el término de búsqueda en id, title y body
    this.filteredPosts = this.posts.filter(post =>
      post.id.toString().includes(searchTerm.trim()) ||
      post.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }
´´´

## Tecnologías Utilizadas
- Angular:
    - HttpClient: Se utiliza para realizar solicitudes HTTP y recibir la información del servidor JSON.
    - RouterModule: Permite conectar los diferentes componentes de la aplicación mediante enrutamiento.
    - FormsModule: Se utiliza para trabajar con formularios en Angular, lo que permite la creación y actualización de posts de manera sencilla.
- Bootstrap:
    - Frontend, componentes y clases.
