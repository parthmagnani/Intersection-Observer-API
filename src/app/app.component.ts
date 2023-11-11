import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'intersection-observer';

  @ViewChildren('theLastList', { read: ElementRef })
  ttheLastChild!: QueryList<ElementRef>

  posts: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages: number = 0;
  observer: any

  

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.loadPosts();
    this.interSectionObserver()
    // this.appService.getPhotos()
  }

  ngAfterViewInit() {
    this.ttheLastChild.changes.subscribe((res: any) => {
      console.log("res-->>", res)
      if(res.last){
        this.observer?.observe(res.last.nativeElement)
      }
    })

  }

  // api to get data
  loadPosts(): void {
    this.appService.getPosts(this.currentPage, this.itemsPerPage)
      .subscribe((response: any) => {
        response.data.map((res: any) => {
          this.posts.push(res)
        })
        console.log("this.posts-->>", this.posts)
        this.totalPages = response.totalPages;
      });
  }

  interSectionObserver() {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,               // when someone see 20% of content at that time we want to trigger api   
    };
    
    this.observer = new IntersectionObserver((entries) => {
      console.log("scroll more")

      if(entries[0].isIntersecting){
        this.currentPage++
        this.loadPosts()
      }
    }, options);
  }
}
