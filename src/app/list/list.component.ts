import { Component, OnInit } from '@angular/core';
import { PostService } from '../post/post.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports : [RouterModule, CommonModule, FormsModule],
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts: any[] = []; // Aquí almacenaremos la lista de posts
  filteredPosts: any[] = [];


  constructor(private postService: PostService) {
   }

  ngOnInit(): void {
    this.getAllPosts(); // Llama al método para obtener todos los posts al inicializar el componente
  }

  getAllPosts() {
    this.postService.getAll().subscribe({
      next : (data) => {
        this.posts = data; // Asigna los posts obtenidos del servicio a la variable posts
        this.filteredPosts = data;
      },
      error : (error) => {
        console.error('Error al obtener los posts:', error);
      }
    });
  }

  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.id !== id);
    })
  }

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
}
