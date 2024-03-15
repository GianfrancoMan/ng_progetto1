# SmartCity

## Social media simulation using the Angular Framework and Gorest APIs ...
> ### Technology
> - Typescript [link](https://www.typescriptlang.org/it/tsconfig)
> - Angular 17 [link](https://angular.io/)
> - Angular Materials [link](https://material.angular.io/)

> ### To use the application locally:
>
> - Clone or download the repository
<<<<<<< HEAD
> - Go to the SmartCity folder and run `npm install` command to install the necessary npm packages.
=======
> - Go to the project folder and run `npm install` command to install the necessary npm packages.
>>>>>>> 2875e4d1289c138daf7156cac3c07c1bd62a7ae9
> - Run `ng serve` or `ng serve --open` to start the application
> - That's it, now you're ready to test the application locally and make your changes.

# Description
>
> The Smart City application aims to allow users to exchange ideas on how to improve the lives of people in urban centers, so that cities are increasingly centers for new ideas, for commerce, culture, science, productivity , social development.
>
> The scheme is typical of social media:
>  - A user can subscribe and unsubscribe
>  - See the list of registered users and their posts
>  - The user can publish his own status
>  - The user can comment on their own posts and those of other users
>
> This repository is the frontend part of the application and uses the rest api of the [Gorest](https://gorest.co.in/) platform to simulate interaction between users.  
> When registering, the user will be asked for an access code which he can obtain only after authenticating on the **Gorest** platform, this is necessary to be able to use the rest api made available by the platform.
>
> ![Subscription view](https://i.ibb.co/WsSztJ4/subscription.jpg)

> ## Community view
> The Community view displays the list of all registered users(10 per page).
> The user can search for other users based on text contained in their names or in their email.
> 
> ![Community view](https://i.ibb.co/CBHXM8k/community.jpg)
>
> Clicking on the **Profile** button will display the profile of the selected user, where their posts and personal information will be visible, if the selected profile is that of the logged in user, the latter will also be able to write his own post.  
>
> ![Details view](https://i.ibb.co/kBnn7vb/details.jpg)
> ![Details2 view](https://i.ibb.co/J2tW0xN/details2.jpg)
> ![Details3 view](https://i.ibb.co/N3wxdzH/details3.jpg)
> 
> ## Forum view  
> The Forum view displays posts from all users (10 per page).  
> the user can search posts based on the text contained in their titles, in this section the logged in user can write his posts.
> 
> ![Forum view](https://i.ibb.co/X8d7HYj/forum.jpg)
>
> ## Logged User profile view  
> The only difference with the unregistered user profile is that in this section the user can change their personal data and also unsubscribe.
> 
> ![profile view](https://i.ibb.co/12MGMtj/profile.jpg)
>
> ## Other features
> ### Comment on posts
> the user has the possibility to read the comments of all posts if there are any by clicking on the **comments** button...
>
> ![comment view](https://i.ibb.co/RP9jSx6/comment.jpg) ![comment2](https://i.ibb.co/VMKwKFv/comment1.jpg)  
> ...and can comment by clicking on the **reply** button
>
> ![comment2 view](https://i.ibb.co/2smQD0C/comment2.jpg)
> 
> ### Logout
> For testing reasons I set the Token expiration after one hour of use, you can change this expiration programmatically in ***login.components.ts*** and in ***subscribe.components.ts***  
> Obviously the user can log out manually by clicking on the **logout** button in the navigation bar.  
> ![logout](https://i.ibb.co/rb5jG4j/logout.jpg)
>
> ### Login
> After logging out, you are redirected to the login page where the access token is requested. If you did not save it when registering you can retrieve it from the appropriate link indicated on the page.
>
> ![login](https://i.ibb.co/gz4yzGW/login.jpg)
>
## More information about the application
> - The search, pagination and posts sections are reusable components, which change their state depending on what the parent component is.
> - Since there is no real backend for this application, user registration is handled in local storage, so if for some reason the registration data was lost, the user would be asked to register again, but since the user is already registered on the gorest platform, the access token remains the same and can be retrieved via the link indicated on the page.
