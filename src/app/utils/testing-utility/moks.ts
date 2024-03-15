
import { User } from "../../../models/user.model";
import { Post } from "../../../models/post.model";
import { Comment } from "../../../models/comment.model";

const users:User[] = [
  {id:1, name:'Ainco Aallino', email:'aink@exmail.com', gender:'female', status:'active'},
  {id:2, name:'Binco Ballino', email:'bink@exmail.com', gender:'male', status:'inactive'},
  {id:3, name:'Cinco Callino', email:'cink@exmail.com', gender:'male', status:'inactive'},
  {id:4, name:'Dinco Dallino', email:'dink@exmail.com', gender:'female', status:'active'},
  {id:5, name:'Einco Eallino', email:'eink@exmail.com', gender:'female', status:'active'},
  {id:6, name:'Finco Fallino', email:'fink@exmail.com', gender:'male', status:'inactive'},
  {id:7, name:'Ginco Gallino', email:'gink@exmail.com', gender:'male', status:'active'},
];

const posts:Post[] = [
  {id:1, user_id:2, title:'post title 1', body:'post body 1'},
  {id:2, user_id:3, title:'post title 2', body:'post body 2'},
  {id:3, user_id:5, title:'post title 3', body:'post body 3'},
  {id:4, user_id:2, title:'post title 4', body:'post body 4'},
  {id:5, user_id:4, title:'post title 5', body:'post body 5'},
  {id:5, user_id:1, title:'post title 5', body:'post body 5'},
  {id:5, user_id:6, title:'post title 5', body:'post body 5'},
  {id:5, user_id:7, title:'post title 5', body:'post body 5'},
];

const comments:Comment[] = [
  {id:1, post_id:2, name:'Ainco Aallino', email:'aink@exmail.com',body:'comment body 1'},
  {id:2, post_id:2, name:'Cinco Callino', email:'cink@exmail.com',body:'comment body 2'},
  {id:3, post_id:1, name:'Ainco Aallino', email:'aink@exmail.com',body:'comment body 3'},
  {id:4, post_id:4, name:'Finco Fallino', email:'fink@exmail.com',body:'comment body 4'},
  {id:5, post_id:3, name:'Ginco Gallino', email:'gink@exmail.com',body:'comment body 5'},
];

export
function getMockUser(userID:number = 1):User {
  const result = users.find(u=> u.id == userID);
  if(result) return result;
  return users[0];
}

export
function getMockUsers():User[] {
  return users;
}

export
function getMockUserPosts(id:number = 1):Post[] {
  return posts.filter(post=> post.user_id == id);
}

export
function getMockPosts():Post[] {
  return posts;
}

export
function getMockComments(id:number = 1):Comment[] {
  return comments.filter(c => c.post_id == id);
}
