//API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading:{
        title:'Loading...',
        message: 'Data is being loaded, Please wait'
    },
    success:{
        title: 'Success',
        message: 'Data successfully loaded'
    },
    responseFailure: {
        title : 'Error',
        message: 'An error occured while fetching response from the server, Please try again'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while'
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect with the server, Please check Internet Connectivity'
    }
}

//API SERVICE CALL
//SAMPLE REQUEST
//NEED service call :{url:'/',method:'POST/Put/delete/get' params: true/false ,query: true/false}

export const SERVICE_URLS = {
    userSignup: {url:'/signup',method: 'POST'},
    userLogin: {url:'/login',method:'POST'},
    userLogout:{url:'/logout',method:'POST'},
    uploadFile: { url: 'file/upload', method: 'POST' },
    createPost: {url: 'create',method:'POST'},
    getAllPosts: {url: '/posts',method:'GET', params:true},
    getPostById: {url:'post',method:'GET',query:true},
    updatePost: {url:'update',method:'PUT',query:true},
    deletePost: {url:'delete',method:'DELETE',query:true},
    newComment: {url:'/comment/new',method:'POST'},
    getAllComments: {url: 'comments', method: 'GET', params:true},
    deleteComment:{url: 'comment/delete',method: 'DELETE',query:true}
}