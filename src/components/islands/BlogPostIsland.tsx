import PageIsland from './PageIsland'
import BlogPostPage from '../BlogPostPage'

export default function BlogPostIsland() {
  return (
    <PageIsland routePattern="/blog/:slug">
      <BlogPostPage />
    </PageIsland>
  )
}
