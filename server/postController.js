module.exports = {
    addNewPost: async (req, res) => {
        const db = req.app.get('db')
        const { author_id, title, content } = req.body
        const newPost = await db.add_post([author_id, title, content])
        res.status(200).send(newPost)
        //* working but doest... update the author_id... not sure what i need to do
    },
    editPost: async (req, res) => {
        // not working not sure why
        const db = req.app.get('db')
        const { dota_post_id } = req.params
        const { title, content } = req.body
        await db.edit_post([title, content, dota_post_id])
        const editedPost = await db.get_all_posts()
        res.status(200).send(editedPost)
    },
    getPostsBasedOnMatch: async (req, res) => {
        const db = req.app.get('db')
        const posts = await db.get_posts_based_on_match()
        res.status(200).send(posts)
        //! needs work
    },
    getAllPosts: async (req, res) => {
        const db = req.app.get('db')
        const allposts = await db.get_all_posts()
        res.status(200).send(allposts)
        // Working
    },
    getOnePost: async (req, res) => {
        const db = req.app.get('db')
        const {dota_posts_id} = req.params
        const onePost = db.get_one_post([dota_posts_id])
        res.status(200).send(onePost)
        // doesnt work because adding a post doesnt update the author_id
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {dota_posts_id} = req.params
        const deletedPost = await db.delete_post([dota_posts_id])
        res.status(200).send(deletedPost)
        //working
    }
}