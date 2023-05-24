export default {
    bug: 'Bug report',
    id: 'ID',
    position: '№',
    created_at: 'Created at',
    person: 'Responsible',
    status: 'Status',
    priority: 'Priority',
    title: 'Title',
    user_actions: 'Actions',
    resolutions: 'Devices',
    locales: 'Locales',
    browsers: 'Browsers',
    menu: 'Menu',
    show_panel: 'Show full',
    author: 'Author',
    tooltip: {
        close: 'Close bug',
        reopen: 'Reopen',
        complete: 'Send to verify',
        verify: 'Set as verified',
        discuss: 'Discuss',
        return: 'Return bug',
        reproduce: 'Cannot reproduce',
        resolutions: {
            mobile: 'Mobiles',
            tablet: 'Tablets',
            laptop: 'Laptops',
            desktop: 'Desktops',
            all: 'All'
        },
        notify: 'Status has been updated successfully'
    },
    priority_type: {
        normal: 'Normal',
        critical: 'Critical',
        minor: 'Minor',
        major: 'Major'
    },
    status_type: {
        new: 'New',
        to_verify: 'To verify',
        cant_reproduce: 'Can\'t reproduce',
        closed: 'Closed',
        to_be_discussed: 'Discussed',
        verified: 'Sent to verify',
        returned: 'Returned'
    },
    actions: {
        create: 'Create bug-report',
        delete: 'Delete bug-report',
        edit: 'Update bug-report'
    },
    notify: {
        created: 'Bug-report has been successfully created',
        updated: 'Bug-report has been successfully updated',
        deleted: 'Bug-report has been successfully deleted'
    },
    form: {
        field_title: {
            label: 'Title',
            placeholder: ''
        },
        desc: {
            label: 'Description',
            placeholder: ''
        },
        priority: {
            label: 'Priority',
            placeholder: 'Choose priority'
        },
        status: {
            label: 'Status',
            placeholder: 'Choose status'
        },
        responsible: {
            label: 'Responsible',
            placeholder: 'Choose person'
        },
        locales: {
            label: 'Languages',
            placeholder: 'Choose languages'
        },
        browsers: {
            label: 'Browsers',
            placeholder: 'Choose browsers'
        },
        resolutions: {
            label: 'Resolutions',
            placeholder: 'Choose resolutions'
        }
    },
    history: {
        title: 'Changes history'
    }
}
