export default {
    title: 'Comments',
    actions: {
        create: 'Leave a comment',
        delete: 'Delete comment',
        edit: 'Edit comment'
    },
    form: {
        create: 'Post',
        field: {
            content: {
                placeholder: '',
                label: 'Comment'
            }
        }
    },
    notify: {
        created: 'Comment added successfully',
        updated: 'Comment updated successfully',
        deleted: 'Comment deleted successfully'
    }
}
