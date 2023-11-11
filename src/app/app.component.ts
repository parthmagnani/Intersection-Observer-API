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

  showSpinner: Boolean = false

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.loadPosts();
    this.interSectionObserver()
    // this.appService.getPhotos()
  }

  ngAfterViewInit() {
    console.log("ttheLastChild-->>", this.ttheLastChild);
    this.ttheLastChild.changes.subscribe((res: any) => {
      console.log("change occured", res)
      if(res.last){
        console.log("Trying to bind last elemeetn", res.last.nativeElement)
        this.observer?.observe(res.last.nativeElement)
      }
    })

  }

  loadPosts(): void {
    this.showSpinner = true
    this.appService.getPosts(this.currentPage, this.itemsPerPage)
      .subscribe((response: any) => {
        this.showSpinner =  false
        console.log("This is response of fale spi-->>", response)
        response.data.map((res: any) => {
          this.posts.push(res)
        })
        console.log("this.posts-->>", this.posts);
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
      console.log("This is entries -->>", entries)

      if(entries[0].isIntersecting){
        console.log("something is intersecting")
        console.log("this.currentPage-->>", this.currentPage)
        this.currentPage++
        this.loadPosts()
      }
    }, options);
  }
}
// sunt aut facere repellat provident occaecati excepturi optio reprehenderit