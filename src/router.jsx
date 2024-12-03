import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { Profile } from './pages/Profile.jsx'
import { Posts } from './pages/Posts.jsx'
import { PostsAll } from './pages/PostsAll.jsx'
import { PostsFavorite } from './pages/PostsFavorite.jsx'
import { PostsPopular } from './pages/PostsPopular.jsx'
import { Post } from './pages/Post.jsx'
import { CreatePost } from './pages/CreatePost.jsx'
import { SignIn } from './pages/SignIn.jsx'
import { SignUp } from './pages/SignUp.jsx'
import { SignUpSuccess } from './pages/SignUpSuccess.jsx'
import { SignUpConfirm } from './pages/SignUpConfirm.jsx'
import { Layout } from './components/Layout.jsx'
import { AuthActivation } from './pages/AuthActivation'
import { PostsMyList } from './pages/PostsMyList'
import { PostsSearchResult } from './pages/PostsSearchResult.jsx'

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/add-post',
                element: <CreatePost />,
            },
            {
                path: '/posts',
                element: <Posts />,
                children: [
                    {
                        path: 'all',
                        children: [
                            {
                                path: ':currentPage',
                                element: <PostsAll />,
                            },
                            {
                                path: 'search/:query/:currentPage',
                                element: <PostsSearchResult />,
                            }
                        ],
                    },
                    {
                        path: 'favorite',
                        element: <PostsFavorite />,
                    },
                    {
                        path: 'popular',
                        element: <PostsPopular />,
                    },
                    {
                        path: 'myposts/:currentPage',
                        element: <PostsMyList />,
                    },
                ]
            },
            {
                path: '/posts/:postId',
                element: <Post />,
            },
            {
                path: 'auth/sign-in',
                element: <SignIn />,
            },
            {
                path: 'auth/sign-up',
                element: <SignUp />,
            },
            {
                path: 'auth/activation/:uid/:token',
                element: <AuthActivation />,
            },
            {
                path: 'auth/sign-up-confirm',
                element: <SignUpConfirm />,
            },
            {
                path: 'auth/sign-up-success',
                element: <SignUpSuccess />,
            }
        ]
    }
])