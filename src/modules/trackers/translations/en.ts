export default {
    title: 'Tracker',
    list_title: 'Tracker List',
    list_members: 'Member List',
    labels: {
        info: 'Information',
        title_name: 'Tracker Title',
        description: 'Description',
        created_at: 'Created At',
        members: 'Members'
    },
    form: {
        create: 'Create Tracker',
        create_short: 'Create',
        update: 'Update Tracker',
        update_short: 'Update',
        add_member: 'Add Member',
        add_member_short: 'Add',
        manage_members: 'Manage Members',
        manage_members_short: 'Save',
        update_member: 'Update Role',
        delete_member: 'Delete Member',
        field: {
            title: {
                label: 'Title',
                placeholder: ''
            },
            desc: {
                label: 'Description',
                placeholder: ''
            },
            role: {
                label: 'Role',
                placeholder: ''
            },
            user: {
                label: 'Channel Member',
                placeholder: ''
            }
        }
    },
    actions: {
        create: 'Create Tracker',
        delete: 'Delete Tracker',
        update: 'Update Tracker'
    },
    notify: {
        created: 'Tracker created successfully',
        updated: 'Tracker updated successfully',
        deleted: 'Tracker deleted successfully',
        added_member: 'Member added successfully',
        updated_member: 'Member role updated successfully',
        deleted_member: 'Member deleted successfully',
        not_created: 'Tracker creation failed',
        not_updated: 'Tracker update failed',
        not_deleted: 'Tracker deletion failed',
        not_added_member: 'Failed to add member',
        not_updated_member: 'Failed to update member role',
        not_deleted_member: 'Failed to delete member'
    }
}
