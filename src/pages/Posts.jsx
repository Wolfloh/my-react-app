import React, { useRef, useState } from "react";
import { MyButton } from "../components/UI/button/MyButton";
import { PostForm } from "../components/PostForm";
import { PostFilter } from "../components/PostFilter";
import { MyModal } from "../components/UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";
import { useEffect } from "react";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { Pagination } from "../components/UI/pagination/Pagination";
import '../styles/App.scss'
import { useObserver } from "../hooks/useObserver";
import { PostItems } from "../components/PostItems";
import { NumberOfPosts } from '../components/NumberOfPosts'
import { SetEndlessPosts } from '../components/UI/SetEndlessPosts/SetEndlessPosts'









export const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [observe, setObserve] = useState(true);
    const lastElement = useRef();
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        if (observe) {
            setPosts([...posts, ...response.data]);
        } else {
            setPosts(response.data);
        }
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit))
    });

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    useObserver(
        lastElement.current,
        () => setPage(page + 1),
        page < totalPages,
        isPostsLoading,
        posts.length,
        observe
    );

    useEffect(() => {
        fetchPosts();
    }, [page, limit])


    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    return (
        <div className="App">
            <MyButton onClick={() => setModal(true)}>
                Создать Пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm posts={posts} setPosts={setPosts} setModal={setModal} />
            </MyModal>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <SetEndlessPosts setObserve={setObserve} />
            <NumberOfPosts limit={limit} setLimit={setLimit} observe={observe} setPage={setPage} />
            <PostItems
                isPostsLoading={isPostsLoading}
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title={'Список постов'}
                error={postError}
            />
            <div ref={lastElement} />
            <Pagination totalPages={totalPages} page={page} setPage={setPage} observe={observe} />
        </div>
    );
}


