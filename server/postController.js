module.exports = {
    addNewPost: async (req, res) => {
        const db = req.app.get('db')
        const { author_id, title, content } = req.body
        const newPost = await db.add_post([author_id, title, content])
        res.status(200).send(newPost)
        // working 
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
        const onePost = await db.get_one_post([dota_posts_id])
        // console.log('get one post working?')
        // console.log(onePost)
        res.status(200).send(onePost[0])
        // WORKING
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {dota_posts_id} = req.params
        const deletedPost = await db.delete_post([dota_posts_id])
        res.status(200).send(deletedPost)
        //working
    }
}