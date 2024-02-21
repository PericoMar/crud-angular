import { Component } from '@angular/core';

import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent {

  postId!: number;
  post!: Post;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['postId'];

    this.postService.find(this.postId).subscribe((data: Post)=>{
      this.post = data;
    });
  }

}
