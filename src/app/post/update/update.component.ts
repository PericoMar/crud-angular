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
