import {Component} from 'react';

import './style.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage), //slice - fatiar
      allPosts: postsAndPhotos,    
    });
  }

  loadMorePosts = async() => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts); //... operador spread

    this.setState({ posts, page: nextPage });

    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage);
  }

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className="container">
        <Posts posts={posts} />
        <div className='button-container'>
          <Button 
            text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}