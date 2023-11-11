# Task

While creating social networking web app there will be more than thousands of post. So while calling posts api with pagination it will not be good user experience if there will be click button for next page. So here is the solution of that problem

## solution

Here we are going to use **intersection observer api**
<br>
https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API  
Here we will calling post api having 10 items per page and **again calling same post api when the 20% of last post will be visible to the screen** 

**Explanation of code**
1. app.service.ts
   <br>
    In this service we have called post api in getPost method to get posts
2. app.component.html
    <br>
    Last and rest of posts are diffrenciate by condition and on last post **#theLastList** template reference variable is used.
3. app.component.ts
    <br>
  interSectionObserver is method where we have used intersection observer
    <br>
  In ngAfterViewInit when the ttheLastChild is changed and find last element it observe it.
